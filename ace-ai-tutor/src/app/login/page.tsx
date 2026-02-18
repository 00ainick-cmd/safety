"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup" | "magic">("login");
  const [loading, setLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (mode === "magic") {
      // TODO: Supabase magic link
      setMagicSent(true);
      setLoading(false);
      return;
    }

    // TODO: Supabase email/password auth
    // For now, just redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full space-y-8">
        <div className="text-center">
          <Link
            href="/"
            className="font-heading text-neon-cyan text-xs tracking-wider animate-[title-glow_2s_ease-in-out_infinite]"
          >
            ACE AI TUTOR
          </Link>
          <h1 className="text-xl font-bold mt-6">
            {mode === "signup" ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-text-muted text-sm mt-2">
            {mode === "signup"
              ? "Sign up to save your progress and unlock all features."
              : "Log in to continue studying."}
          </p>
        </div>

        {magicSent ? (
          <div className="bg-panel border border-neon-cyan/30 rounded-xl p-6 text-center">
            <div className="text-neon-cyan font-semibold mb-2">Check your email</div>
            <p className="text-text-muted text-sm">
              We sent a sign-in link to <strong className="text-text-light">{email}</strong>.
              Click the link to log in — no password needed.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-text-muted block mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-panel border border-panel-light rounded-lg px-3 py-2 text-sm text-text-light outline-none focus:border-neon-cyan transition"
                placeholder="you@example.com"
              />
            </div>

            {mode !== "magic" && (
              <div>
                <label className="text-sm text-text-muted block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-panel border border-panel-light rounded-lg px-3 py-2 text-sm text-text-light outline-none focus:border-neon-cyan transition"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neon-cyan text-bg-navy font-semibold py-2 rounded-lg disabled:opacity-60 hover:brightness-110 transition"
            >
              {loading
                ? "..."
                : mode === "magic"
                ? "Send Magic Link"
                : mode === "signup"
                ? "Create Account"
                : "Log In"}
            </button>
          </form>
        )}

        <div className="text-center space-y-2 text-sm">
          {mode === "login" && (
            <>
              <button
                onClick={() => setMode("magic")}
                className="text-neon-cyan hover:underline block mx-auto"
              >
                Sign in with magic link instead
              </button>
              <div className="text-text-muted">
                No account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-neon-cyan hover:underline"
                >
                  Sign up
                </button>
              </div>
            </>
          )}
          {mode === "signup" && (
            <div className="text-text-muted">
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-neon-cyan hover:underline"
              >
                Log in
              </button>
            </div>
          )}
          {mode === "magic" && (
            <button
              onClick={() => {
                setMode("login");
                setMagicSent(false);
              }}
              className="text-text-muted hover:text-text-light"
            >
              Back to password login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
