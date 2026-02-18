// Auto-generated types for Supabase — regenerate with `supabase gen types`
// For now, manually defined to match the schema in supabase/migrations/

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          persona_type: "military" | "student" | "technician" | "other";
          military_branch: string | null;
          military_afsc: string | null;
          subscription_status: "free" | "active" | "cancelled" | "past_due";
          stripe_customer_id: string | null;
          created_at: string;
          last_active: string;
        };
        Insert: {
          id?: string;
          email: string;
          display_name: string;
          persona_type?: "military" | "student" | "technician" | "other";
          military_branch?: string | null;
          military_afsc?: string | null;
          subscription_status?: "free" | "active" | "cancelled" | "past_due";
          stripe_customer_id?: string | null;
          created_at?: string;
          last_active?: string;
        };
        Update: Partial<Database["public"]["Tables"]["users"]["Insert"]>;
      };
      mastery_scores: {
        Row: {
          id: string;
          user_id: string;
          module_id: string;
          objective_id: string;
          score: number;
          questions_attempted: number;
          questions_correct: number;
          last_practiced: string;
          next_review: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          module_id: string;
          objective_id: string;
          score?: number;
          questions_attempted?: number;
          questions_correct?: number;
          last_practiced?: string;
          next_review?: string;
        };
        Update: Partial<Database["public"]["Tables"]["mastery_scores"]["Insert"]>;
      };
      practice_attempts: {
        Row: {
          id: string;
          user_id: string;
          question_id: string;
          module_id: string;
          objective_id: string;
          selected_answer: string;
          correct: boolean;
          time_spent_seconds: number;
          ai_explanation_shown: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          question_id: string;
          module_id: string;
          objective_id: string;
          selected_answer: string;
          correct: boolean;
          time_spent_seconds?: number;
          ai_explanation_shown?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["practice_attempts"]["Insert"]>;
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          module_id: string | null;
          messages: Array<{ role: string; content: string; timestamp: string }>;
          summary: string | null;
          tokens_used: number;
          created_at: string;
          ended_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          module_id?: string | null;
          messages?: Array<{ role: string; content: string; timestamp: string }>;
          summary?: string | null;
          tokens_used?: number;
          created_at?: string;
          ended_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["conversations"]["Insert"]>;
      };
      content_chunks: {
        Row: {
          id: string;
          source_document: string;
          module_id: string;
          chunk_text: string;
          embedding: number[];
          metadata: Record<string, unknown>;
        };
        Insert: {
          id?: string;
          source_document: string;
          module_id: string;
          chunk_text: string;
          embedding: number[];
          metadata?: Record<string, unknown>;
        };
        Update: Partial<Database["public"]["Tables"]["content_chunks"]["Insert"]>;
      };
    };
  };
};
