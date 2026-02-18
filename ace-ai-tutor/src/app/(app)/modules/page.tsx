import Link from "next/link";
import { CAET_MODULES } from "@/lib/constants";

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

export default function ModulesPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Modules</h1>
        <p className="text-text-muted text-sm mt-1">
          All 12 CAET certification modules with your mastery progress.
        </p>
      </div>

      <div className="space-y-4">
        {CAET_MODULES.map((mod) => {
          const pct = DEMO_MASTERY[mod.id] ?? 0;
          return (
            <Link
              key={mod.id}
              href={`/modules/${mod.id}`}
              className="block bg-panel border border-panel-light rounded-xl p-5 hover:border-border-glow transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="text-xs text-text-muted">
                    {mod.id.replace("module_", "Module ")}
                  </div>
                  <div className="text-lg font-semibold text-text-light mt-1">{mod.name}</div>
                  <div className="text-sm text-text-muted mt-1">
                    {mod.objectives} learning objectives
                  </div>
                </div>
                <div className="w-full sm:w-48">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-muted">Mastery</span>
                    <span
                      className={`font-semibold ${
                        pct >= 80
                          ? "text-lime"
                          : pct >= 50
                          ? "text-amber"
                          : pct > 0
                          ? "text-red-400"
                          : "text-text-muted"
                      }`}
                    >
                      {pct > 0 ? `${pct}%` : "Not started"}
                    </span>
                  </div>
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
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
