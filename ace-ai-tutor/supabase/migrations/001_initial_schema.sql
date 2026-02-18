-- ACE AI Tutor — Initial Database Schema
-- Run this migration in your Supabase SQL Editor or via CLI

-- Enable pgvector for RAG embeddings
create extension if not exists vector;

-- ── Users ─────────────────────────────────────────────────
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  display_name text not null default '',
  persona_type text not null default 'other'
    check (persona_type in ('military', 'student', 'technician', 'other')),
  military_branch text,
  military_afsc text,
  subscription_status text not null default 'free'
    check (subscription_status in ('free', 'active', 'cancelled', 'past_due')),
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  last_active timestamptz not null default now()
);

-- ── Mastery Scores ────────────────────────────────────────
create table if not exists public.mastery_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  module_id text not null,
  objective_id text not null,
  score integer not null default 0 check (score >= 0 and score <= 100),
  questions_attempted integer not null default 0,
  questions_correct integer not null default 0,
  last_practiced timestamptz not null default now(),
  next_review timestamptz not null default now(),
  unique (user_id, module_id, objective_id)
);

-- ── Practice Attempts ─────────────────────────────────────
create table if not exists public.practice_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  question_id text not null,
  module_id text not null,
  objective_id text not null,
  selected_answer text not null,
  correct boolean not null,
  time_spent_seconds integer not null default 0,
  ai_explanation_shown boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── Conversations ─────────────────────────────────────────
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  module_id text,
  messages jsonb not null default '[]'::jsonb,
  summary text,
  tokens_used integer not null default 0,
  created_at timestamptz not null default now(),
  ended_at timestamptz
);

-- ── Content Chunks (for RAG) ──────────────────────────────
create table if not exists public.content_chunks (
  id uuid primary key default gen_random_uuid(),
  source_document text not null,
  module_id text not null,
  chunk_text text not null,
  embedding vector(1536),
  metadata jsonb not null default '{}'::jsonb
);

-- ── Indexes ───────────────────────────────────────────────
create index if not exists idx_mastery_user on public.mastery_scores(user_id);
create index if not exists idx_mastery_module on public.mastery_scores(module_id);
create index if not exists idx_practice_user on public.practice_attempts(user_id);
create index if not exists idx_practice_created on public.practice_attempts(created_at desc);
create index if not exists idx_conversations_user on public.conversations(user_id);
create index if not exists idx_content_module on public.content_chunks(module_id);

-- Vector similarity search index
create index if not exists idx_content_embedding
  on public.content_chunks
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- ── Row Level Security ────────────────────────────────────
alter table public.users enable row level security;
alter table public.mastery_scores enable row level security;
alter table public.practice_attempts enable row level security;
alter table public.conversations enable row level security;

-- Users can only read/update their own row
create policy "Users read own data" on public.users
  for select using (auth.uid() = id);
create policy "Users update own data" on public.users
  for update using (auth.uid() = id);

-- Mastery: users see only their own scores
create policy "Users read own mastery" on public.mastery_scores
  for select using (auth.uid() = user_id);
create policy "Users insert own mastery" on public.mastery_scores
  for insert with check (auth.uid() = user_id);
create policy "Users update own mastery" on public.mastery_scores
  for update using (auth.uid() = user_id);

-- Practice: users see only their own attempts
create policy "Users read own attempts" on public.practice_attempts
  for select using (auth.uid() = user_id);
create policy "Users insert own attempts" on public.practice_attempts
  for insert with check (auth.uid() = user_id);

-- Conversations: users see only their own
create policy "Users read own conversations" on public.conversations
  for select using (auth.uid() = user_id);
create policy "Users insert own conversations" on public.conversations
  for insert with check (auth.uid() = user_id);
create policy "Users update own conversations" on public.conversations
  for update using (auth.uid() = user_id);

-- Content chunks: readable by all authenticated users
create policy "Authenticated users read content" on public.content_chunks
  for select using (auth.role() = 'authenticated');

-- ── Helper function: vector similarity search ─────────────
create or replace function match_content_chunks(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 5,
  filter_module text default null
)
returns table (
  id uuid,
  source_document text,
  module_id text,
  chunk_text text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    cc.id,
    cc.source_document,
    cc.module_id,
    cc.chunk_text,
    cc.metadata,
    1 - (cc.embedding <=> query_embedding) as similarity
  from public.content_chunks cc
  where
    (filter_module is null or cc.module_id = filter_module)
    and 1 - (cc.embedding <=> query_embedding) > match_threshold
  order by cc.embedding <=> query_embedding
  limit match_count;
end;
$$;
