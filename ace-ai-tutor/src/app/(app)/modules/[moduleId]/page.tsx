import Link from "next/link";
import { CAET_MODULES } from "@/lib/constants";

// Demo objectives for any module — will be replaced with real content
const DEMO_OBJECTIVES = [
  { id: "1", name: "Fundamental Principles", mastery: 85 },
  { id: "2", name: "Component Identification", mastery: 62 },
  { id: "3", name: "System Architecture", mastery: 45 },
  { id: "4", name: "Troubleshooting Procedures", mastery: 0 },
  { id: "5", name: "Installation Standards", mastery: 78 },
  { id: "6", name: "Safety & Compliance", mastery: 30 },
];

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const mod = CAET_MODULES.find((m) => m.id === moduleId);

  if (!mod) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold text-red-400">Module not found</h1>
        <Link href="/modules" className="text-neon-cyan hover:underline mt-4 inline-block">
          Back to modules
        </Link>
      </div>
    );
  }

  const avgMastery = Math.round(
    DEMO_OBJECTIVES.reduce((a, b) => a + b.mastery, 0) / DEMO_OBJECTIVES.length
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* ── Header ────────────────────── */}
      <div>
        <Link href="/modules" className="text-sm text-text-muted hover:text-neon-cyan transition">
          &larr; All Modules
        </Link>
        <h1 className="text-2xl font-bold mt-3">{mod.name}</h1>
        <div className="text-text-muted text-sm mt-1">
          {mod.id.replace("module_", "Module ")} &middot; {mod.objectives} learning objectives
        </div>
      </div>

      {/* ── Overview stats ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-panel border border-panel-light rounded-xl p-5 text-center">
          <div className="text-xs text-text-muted uppercase">Module Mastery</div>
          <div
            className={`text-3xl font-bold mt-2 ${
              avgMastery >= 80
                ? "text-lime"
                : avgMastery >= 50
                ? "text-amber"
                : avgMastery > 0
                ? "text-red-400"
                : "text-text-muted"
            }`}
          >
            {avgMastery}%
          </div>
        </div>
        <div className="bg-panel border border-panel-light rounded-xl p-5 text-center">
          <div className="text-xs text-text-muted uppercase">Objectives Assessed</div>
          <div className="text-3xl font-bold text-neon-cyan mt-2">
            {DEMO_OBJECTIVES.filter((o) => o.mastery > 0).length}/{DEMO_OBJECTIVES.length}
          </div>
        </div>
        <div className="bg-panel border border-panel-light rounded-xl p-5 text-center">
          <div className="text-xs text-text-muted uppercase">Questions Attempted</div>
          <div className="text-3xl font-bold text-magenta mt-2">47</div>
        </div>
      </div>

      {/* ── Action buttons ─────────────── */}
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/tutor?module=${mod.id}`}
          className="bg-neon-cyan text-bg-navy font-semibold text-sm px-5 py-2 rounded-lg hover:brightness-110 transition"
        >
          Study This Module
        </Link>
        <Link
          href={`/practice?module=${mod.id}`}
          className="border border-border-glow text-neon-cyan font-semibold text-sm px-5 py-2 rounded-lg hover:bg-neon-cyan/10 transition"
        >
          Practice Questions
        </Link>
        <button className="border border-panel-light text-text-muted text-sm px-5 py-2 rounded-lg hover:border-border-glow transition">
          Take Module Quiz
        </button>
      </div>

      {/* ── Objectives ─────────────────── */}
      <section>
        <h2 className="font-heading text-neon-cyan text-xs mb-4">LEARNING OBJECTIVES</h2>
        <div className="space-y-3">
          {DEMO_OBJECTIVES.map((obj) => (
            <div
              key={obj.id}
              className="bg-panel border border-panel-light rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <div className="text-text-light font-medium text-sm">
                  {mod.id.replace("module_", "")}.{obj.id} — {obj.name}
                </div>
                <div className="text-xs text-text-muted mt-1">
                  {obj.mastery > 0 ? `${obj.mastery}% mastery` : "Not yet assessed"}
                </div>
              </div>
              <div className="w-24">
                <div className="h-2 bg-bg-midnight rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      obj.mastery >= 80
                        ? "bg-lime"
                        : obj.mastery >= 50
                        ? "bg-amber"
                        : obj.mastery > 0
                        ? "bg-red-400"
                        : "bg-panel-light"
                    }`}
                    style={{ width: `${obj.mastery}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
