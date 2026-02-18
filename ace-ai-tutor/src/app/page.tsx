import Link from "next/link";
import { CAET_MODULES, SUBSCRIPTION_PRICE_MONTHLY } from "@/lib/constants";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* ── Nav ─────────────────────────────────── */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-panel-light">
        <span className="font-heading text-neon-cyan text-xs tracking-wider animate-[title-glow_2s_ease-in-out_infinite]">
          ACE AI TUTOR
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm text-text-muted hover:text-text-light transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/onboarding"
            className="text-sm bg-neon-cyan text-bg-navy font-semibold px-4 py-2 rounded-md hover:brightness-110 transition"
          >
            Start Studying Free
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <h1 className="font-heading text-neon-cyan text-lg sm:text-2xl md:text-3xl leading-relaxed animate-[title-glow_2s_ease-in-out_infinite]">
          YOUR AI STUDY PARTNER
        </h1>
        <h2 className="font-heading text-amber text-xs sm:text-sm mt-4 tracking-wide">
          FOR CAET CERTIFICATION
        </h2>
        <p className="text-text-muted max-w-2xl mt-8 text-lg leading-relaxed">
          Master avionics concepts through conversational tutoring, adaptive
          practice, and scenario-based learning. Powered by AI that understands
          your curriculum at the level of your certification.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            href="/onboarding"
            className="bg-neon-cyan text-bg-navy font-bold px-8 py-3 rounded-md text-lg hover:brightness-110 transition"
          >
            Start Studying Free
          </Link>
          <a
            href="#features"
            className="border border-border-glow text-neon-cyan font-semibold px-8 py-3 rounded-md text-lg hover:bg-neon-cyan/10 transition"
          >
            See How It Works
          </a>
        </div>
        <p className="text-text-muted text-sm mt-4">
          No account required to try. Start learning in seconds.
        </p>
      </section>

      {/* ── Social proof bar ────────────────────── */}
      <section className="border-y border-panel-light py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center px-6">
          <div>
            <div className="text-3xl font-bold text-neon-cyan">85%+</div>
            <div className="text-text-muted text-sm mt-1">Target pass rate for tutor users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-lime">12</div>
            <div className="text-text-muted text-sm mt-1">CAET modules covered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-magenta">24/7</div>
            <div className="text-text-muted text-sm mt-1">AI tutor availability</div>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────── */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-heading text-neon-cyan text-sm text-center mb-12">
          BUILT FOR AVIONICS TECHS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon="💬"
            title="Conversational AI Tutor"
            description="Ask questions, get expert explanations. The AI teaches using Merrill's First Principles — activate, demonstrate, apply, integrate."
          />
          <FeatureCard
            icon="🎯"
            title="Adaptive Practice Engine"
            description="Spaced repetition sequences questions based on your performance. Flashcard, Jeopardy, and Practice Test modes."
          />
          <FeatureCard
            icon="📊"
            title="Progress Dashboard"
            description="Per-module mastery tracking, weak area identification, study streaks, and an overall exam readiness score."
          />
          <FeatureCard
            icon="🎖️"
            title="Military Transition Ready"
            description="Recognizes your military avionics experience and focuses on the gaps between military and GA/Part 91 systems."
          />
          <FeatureCard
            icon="📖"
            title="Cites Real References"
            description="Every explanation references AC 43.13-1B, AEA publications, and manufacturer documentation. Not vague hand-waving."
          />
          <FeatureCard
            icon="🔒"
            title="Teaches, Never Cheats"
            description="The AI teaches concepts without giving away exam answers. You learn the material, not the test."
          />
        </div>
      </section>

      {/* ── Modules ─────────────────────────────── */}
      <section className="bg-panel py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-neon-cyan text-sm text-center mb-12">
            12 CAET MODULES COVERED
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CAET_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="border border-border-glow rounded-lg p-4 text-center hover:bg-neon-cyan/5 transition"
              >
                <div className="text-xs text-text-muted mb-1">
                  {mod.id.replace("module_", "Module ")}
                </div>
                <div className="text-sm font-semibold text-text-light">
                  {mod.shortName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="font-heading text-neon-cyan text-sm mb-12">PRICING</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="border border-panel-light rounded-xl p-8">
            <h3 className="text-lg font-bold text-text-light">Free</h3>
            <div className="text-3xl font-bold text-text-muted mt-2">$0</div>
            <ul className="text-text-muted text-sm mt-6 space-y-2 text-left">
              <li>5 AI conversations/day</li>
              <li>1 module of practice questions</li>
              <li>Basic progress tracking</li>
            </ul>
          </div>
          <div className="border-2 border-neon-cyan rounded-xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-cyan text-bg-navy text-xs font-bold px-3 py-1 rounded-full">
              RECOMMENDED
            </div>
            <h3 className="text-lg font-bold text-text-light">Pro</h3>
            <div className="text-3xl font-bold text-neon-cyan mt-2">
              ${SUBSCRIPTION_PRICE_MONTHLY}
              <span className="text-sm text-text-muted font-normal">/mo</span>
            </div>
            <ul className="text-text-muted text-sm mt-6 space-y-2 text-left">
              <li>Unlimited AI conversations</li>
              <li>All 12 modules unlocked</li>
              <li>Full mastery & readiness tracking</li>
              <li>Scenario-based learning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────── */}
      <footer className="border-t border-panel-light py-8 text-center text-text-muted text-sm px-6">
        <span className="font-heading text-neon-cyan text-[10px]">ACE AI TUTOR</span>
        <span className="mx-3">|</span>
        A product of ACE — Avionics Certification &amp; Education
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-panel-light rounded-xl p-6 hover:border-border-glow transition">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-base font-bold text-text-light mb-2">{title}</h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}
