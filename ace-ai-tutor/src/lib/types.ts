import type { ModuleId, PersonaType, PracticeMode } from "./constants";

// ── User ──────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  display_name: string;
  persona_type: PersonaType;
  military_branch: string | null;
  military_afsc: string | null;
  subscription_status: "free" | "active" | "cancelled" | "past_due";
  stripe_customer_id: string | null;
  created_at: string;
  last_active: string;
}

// ── Mastery ───────────────────────────────────────────
export interface MasteryScore {
  id: string;
  user_id: string;
  module_id: ModuleId;
  objective_id: string;
  score: number; // 0-100
  questions_attempted: number;
  questions_correct: number;
  last_practiced: string;
  next_review: string;
}

export interface ModuleMastery {
  module_id: ModuleId;
  module_name: string;
  mastery_percentage: number;
  objectives_assessed: number;
  objectives_total: number;
}

// ── Practice ──────────────────────────────────────────
export interface PracticeQuestion {
  id: string;
  module_id: ModuleId;
  objective_id: string;
  question_text: string;
  options: { label: string; text: string }[];
  correct_answer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface PracticeAttempt {
  id: string;
  user_id: string;
  question_id: string;
  module_id: ModuleId;
  objective_id: string;
  selected_answer: string;
  correct: boolean;
  time_spent_seconds: number;
  ai_explanation_shown: boolean;
  created_at: string;
}

// ── Conversations ─────────────────────────────────────
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  module_id: ModuleId | null;
  messages: ChatMessage[];
  summary: string | null;
  tokens_used: number;
  created_at: string;
  ended_at: string | null;
}

// ── Dashboard ─────────────────────────────────────────
export interface StudySession {
  id: string;
  date: string;
  module_name: string;
  questions_answered: number;
  correct: number;
  duration_minutes: number;
}

export interface DashboardData {
  readiness_score: number;
  study_streak: number;
  modules: ModuleMastery[];
  recent_sessions: StudySession[];
  recommended_module: ModuleId | null;
}

// ── Practice Engine ───────────────────────────────────
export interface PracticeSessionConfig {
  mode: PracticeMode;
  module_id: ModuleId | null; // null = all modules
  question_count: number;
}
