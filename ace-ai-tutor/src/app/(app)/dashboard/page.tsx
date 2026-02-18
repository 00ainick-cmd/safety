"use client";

import Link from "next/link";
import { CAET_MODULES } from "@/lib/constants";

// Demo data — will be replaced by Supabase queries
const DEMO_MASTERY: Record<string, number> = {
  module_01: 82,
  module_02: 45,
  module_03: 67,
  module_04: 91,
  module_05: 33,
  module_06: 0,
  module_07: 58,
  module_08: 0,
  module_09: 12,
  module_10: 0,
  module_11: 0,
  module_12: 74,
};

function masteryColor(pct: number) {
  if (pct === 0) return "border-panel-light text-text-muted";
  if (pct < 50) return "border-red-500/60 text-red-400";
  if (pct < 80) return "border-amber/60 text-amber";
  return "border-lime/60 text-lime";
}

export default function DashboardPage() {
  const readiness = Math.round(
    Object.values(DEMO_MASTERY).reduce((a, b) => a + b, 0) / CAET_MODULES.length
  );
  const streak = 4; // demo

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* ── Top bar ──────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-text-muted text-sm mt-1">Welcome back. Here&apos;s your study overview.</p>
        </div>
        <div className="flex gap-4">
          {/* Readiness gauge */}
          <div className="bg-panel border border-panel-light rounded-xl px-5 py-3 text-center">
            <div className="text-xs text-text-muted uppercase tracking-wide">Readiness</div>
            <div className="text-2xl font-bold text-neon-cyan mt-1">{readiness}%</div>
          </div>
          {/* Streak */}
          <div className="bg-panel border border-panel-light rounded-xl px-5 py-3 text-center">
            <div className="text-xs text-text-muted uppercase tracking-wide">Streak</div>
            <div className="text-2xl font-bold text-amber mt-1">{streak} days</div>
          </div>
        </div>
      </div>

      {/* ── Module grid ──────────────────── */}
      <section>
        <h2 className="font-heading text-neon-cyan text-xs mb-4">MODULE MASTERY</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CAET_MODULES.map((mod) => {
            const pct = DEMO_MASTERY[mod.id] ?? 0;
            return (
              <Link
                key={mod.id}
                href={`/modules/${mod.id}`}
                className={`border-2 rounded-xl p-4 hover:bg-panel-light transition ${masteryColor(pct)}`}
              >
                <div className="text-xs text-text-muted">
                  {mod.id.replace("module_", "Module ")}
                </div>
                <div className="text-sm font-semibold text-text-light mt-1">{mod.shortName}</div>
                <div className="mt-3">
                  {/* Progress bar */}
                  <div className="h-2 bg-bg-midnight rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pct >= 80
                          ? "bg-lime"
                          : pct >= 50
                          ? "bg-amber"
                          : pct > 0
                          ? "bg-red-400"
                          : "bg-panel-light"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-right text-xs mt-1">
                    {pct > 0 ? `${pct}%` : "Not started"}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Recommended + Recent ──────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended next */}
        <div className="bg-panel border border-neon-cyan/30 rounded-xl p-6 lg:col-span-1">
          <h3 className="font-heading text-neon-cyan text-[10px] mb-3">RECOMMENDED NEXT</h3>
          <p className="text-text-light font-semibold">Module 5: Wiring &amp; Installation</p>
          <p className="text-text-muted text-sm mt-2">
            You&apos;re at 33% mastery. Focus on connector identification and wire termination to
            boost your score.
          </p>
          <Link
            href="/tutor?module=module_05"
            className="inline-block mt-4 bg-neon-cyan text-bg-navy font-semibold text-sm px-4 py-2 rounded-md hover:brightness-110 transition"
          >
            Start Studying
          </Link>
        </div>

        {/* Recent activity */}
        <div className="bg-panel border border-panel-light rounded-xl p-6 lg:col-span-2">
          <h3 className="font-heading text-neon-cyan text-[10px] mb-3">RECENT SESSIONS</h3>
          <div className="space-y-3">
            {[
              { mod: "Module 04: Soldering", q: 15, c: 14, dur: 22 },
              { mod: "Module 12: Safety/Reg.", q: 10, c: 7, dur: 18 },
              { mod: "Module 03: Elec. Fund.", q: 20, c: 13, dur: 35 },
              { mod: "Module 01: Aviation Fund.", q: 12, c: 10, dur: 15 },
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between border border-panel-light rounded-lg px-4 py-3 text-sm"
              >
                <span className="text-text-light font-medium">{s.mod}</span>
                <span className="text-text-muted">
                  {s.c}/{s.q} correct &middot; {s.dur} min
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
