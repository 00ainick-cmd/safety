"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CAET_MODULES, PERSONA_TYPES } from "@/lib/constants";

type Step = "persona" | "modules" | "diagnostic";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("persona");
  const [persona, setPersona] = useState<string | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [skipDiagnostic, setSkipDiagnostic] = useState(false);

  function toggleModule(id: string) {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  function handleFinish() {
    // TODO: POST to /api/onboarding then redirect
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full space-y-8">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2">
          {(["persona", "modules", "diagnostic"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s
                    ? "bg-neon-cyan text-bg-navy"
                    : i < ["persona", "modules", "diagnostic"].indexOf(step)
                    ? "bg-lime text-bg-navy"
                    : "bg-panel-light text-text-muted"
                }`}
              >
                {i + 1}
              </div>
              {i < 2 && <div className="w-8 h-0.5 bg-panel-light" />}
            </div>
          ))}
        </div>

        {/* ── Step 1: Persona ──────────── */}
        {step === "persona" && (
          <div className="space-y-6 text-center">
            <div>
              <h1 className="text-xl font-bold">What&apos;s your background?</h1>
              <p className="text-text-muted text-sm mt-2">
                This helps ACE tailor the experience to your level.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PERSONA_TYPES.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPersona(p.value)}
                  className={`border rounded-xl p-4 text-left transition ${
                    persona === p.value
                      ? "border-neon-cyan bg-neon-cyan/10"
                      : "border-panel-light hover:border-border-glow"
                  }`}
                >
                  <div className="font-semibold text-text-light text-sm">{p.label}</div>
                  <div className="text-xs text-text-muted mt-1">{p.description}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => persona && setStep("modules")}
              disabled={!persona}
              className="bg-neon-cyan text-bg-navy font-semibold px-6 py-2 rounded-lg disabled:opacity-40 hover:brightness-110 transition"
            >
              Continue
            </button>
          </div>
        )}

        {/* ── Step 2: Module selection ──── */}
        {step === "modules" && (
          <div className="space-y-6 text-center">
            <div>
              <h1 className="text-xl font-bold">Which modules are you studying?</h1>
              <p className="text-text-muted text-sm mt-2">
                Select all that apply. You can change this later.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CAET_MODULES.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  className={`border rounded-lg p-3 text-left text-sm transition ${
                    selectedModules.includes(mod.id)
                      ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                      : "border-panel-light text-text-muted hover:border-border-glow"
                  }`}
                >
                  <div className="font-medium">{mod.shortName}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setStep("persona")}
                className="text-text-muted hover:text-text-light text-sm px-4 py-2 transition"
              >
                Back
              </button>
              <button
                onClick={() =>
                  selectedModules.length > 0 ? setStep("diagnostic") : undefined
                }
                disabled={selectedModules.length === 0}
                className="bg-neon-cyan text-bg-navy font-semibold px-6 py-2 rounded-lg disabled:opacity-40 hover:brightness-110 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Diagnostic offer ──── */}
        {step === "diagnostic" && (
          <div className="space-y-6 text-center">
            <div>
              <h1 className="text-xl font-bold">Want to take a quick assessment?</h1>
              <p className="text-text-muted text-sm mt-2 max-w-md mx-auto">
                A 10-question diagnostic helps ACE calibrate your starting level so you
                don&apos;t waste time on material you already know.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleFinish}
                className="w-full bg-neon-cyan text-bg-navy font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition"
              >
                Take the Diagnostic (5 min)
              </button>
              <button
                onClick={() => {
                  setSkipDiagnostic(true);
                  handleFinish();
                }}
                className="w-full border border-panel-light text-text-muted px-6 py-3 rounded-lg hover:border-border-glow transition"
              >
                Skip — I&apos;ll just start studying
              </button>
            </div>
            <button
              onClick={() => setStep("modules")}
              className="text-text-muted hover:text-text-light text-sm px-4 py-2 transition"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
