"use client";

import { useState } from "react";
import { CAET_MODULES } from "@/lib/constants";
import type { PracticeMode } from "@/lib/constants";

const DEMO_QUESTION = {
  id: "q_demo_01",
  question_text:
    "What is the primary purpose of a static inverter in an aircraft electrical system?",
  options: [
    { label: "A", text: "Convert AC power to DC power" },
    { label: "B", text: "Convert DC power to AC power" },
    { label: "C", text: "Regulate voltage output from the generator" },
    { label: "D", text: "Provide emergency battery backup" },
  ],
  correct_answer: "B",
  explanation:
    "A static inverter converts DC power from the aircraft battery or DC bus to AC power needed by certain instruments and avionics. Unlike a rotary inverter, it has no moving parts, making it more reliable and lighter. Reference: AC 43.13-1B, Chapter 11.",
};

export default function PracticePage() {
  const [mode, setMode] = useState<PracticeMode>("test");
  const [selectedModule, setSelectedModule] = useState<string>("all");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  function handleSubmit() {
    if (!selectedAnswer) return;
    setSubmitted(true);
  }

  function handleNext() {
    setSelectedAnswer(null);
    setSubmitted(false);
    setShowExplanation(false);
    setQuestionIndex((i) => i + 1);
  }

  const isCorrect = selectedAnswer === DEMO_QUESTION.correct_answer;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* ── Header ────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Practice</h1>
          <p className="text-text-muted text-sm mt-1">
            Adaptive questions based on your mastery level.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-text-muted">Question {questionIndex + 1}</span>
          {/* Progress bar */}
          <div className="w-32 h-2 bg-bg-midnight rounded-full overflow-hidden">
            <div
              className="h-full bg-neon-cyan rounded-full transition-all"
              style={{ width: `${((questionIndex + 1) / 20) * 100}%` }}
            />
          </div>
          <span className="text-text-muted">/ 20</span>
        </div>
      </div>

      {/* ── Mode + Module selectors ────── */}
      <div className="flex flex-wrap gap-3">
        {(["flashcard", "jeopardy", "test"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`text-sm px-4 py-2 rounded-full border transition capitalize ${
              mode === m
                ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10"
                : "border-panel-light text-text-muted hover:border-border-glow"
            }`}
          >
            {m === "test" ? "Practice Test" : m}
          </button>
        ))}
        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="text-sm bg-panel border border-panel-light text-text-muted rounded-lg px-3 py-2 outline-none"
        >
          <option value="all">All Modules</option>
          {CAET_MODULES.map((mod) => (
            <option key={mod.id} value={mod.id}>
              {mod.id.replace("module_", "Module ")} — {mod.shortName}
            </option>
          ))}
        </select>
      </div>

      {/* ── Question card ─────────────── */}
      {mode === "test" && (
        <div className="bg-panel border border-panel-light rounded-xl p-6 space-y-6">
          <div>
            <div className="text-xs text-text-muted mb-2">Module 02 &middot; Objective 2.3</div>
            <p className="text-text-light text-lg leading-relaxed">
              {DEMO_QUESTION.question_text}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {DEMO_QUESTION.options.map((opt) => {
              let optClass =
                "border border-panel-light hover:border-border-glow text-text-light";

              if (submitted) {
                if (opt.label === DEMO_QUESTION.correct_answer) {
                  optClass = "border-2 border-lime bg-lime/10 text-lime";
                } else if (opt.label === selectedAnswer && !isCorrect) {
                  optClass = "border-2 border-red-400 bg-red-400/10 text-red-400";
                } else {
                  optClass = "border border-panel-light text-text-muted opacity-50";
                }
              } else if (opt.label === selectedAnswer) {
                optClass = "border-2 border-neon-cyan bg-neon-cyan/10 text-neon-cyan";
              }

              return (
                <button
                  key={opt.label}
                  onClick={() => !submitted && setSelectedAnswer(opt.label)}
                  disabled={submitted}
                  className={`w-full text-left px-4 py-3 rounded-lg transition flex gap-3 items-start ${optClass}`}
                >
                  <span className="font-bold min-w-[24px]">{opt.label}.</span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Submit / Next */}
          <div className="flex items-center gap-4">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="bg-neon-cyan text-bg-navy font-semibold px-6 py-2 rounded-lg disabled:opacity-40 hover:brightness-110 transition"
              >
                Submit Answer
              </button>
            ) : (
              <>
                <div className={`font-bold ${isCorrect ? "text-lime" : "text-red-400"}`}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </div>
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="text-sm text-neon-cyan hover:underline"
                >
                  {showExplanation ? "Hide" : "Show"} explanation
                </button>
                <button
                  onClick={handleNext}
                  className="ml-auto bg-neon-cyan text-bg-navy font-semibold px-6 py-2 rounded-lg hover:brightness-110 transition"
                >
                  Next Question
                </button>
              </>
            )}
          </div>

          {/* AI Explanation */}
          {submitted && showExplanation && (
            <div className="bg-bg-midnight border border-neon-cyan/20 rounded-lg p-4">
              <div className="text-neon-cyan font-semibold text-xs mb-2">ACE EXPLAINS</div>
              <p className="text-text-light text-sm leading-relaxed">
                {DEMO_QUESTION.explanation}
              </p>
              <button className="text-xs text-neon-cyan hover:underline mt-3">
                Ask the tutor about this
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Flashcard mode placeholder ── */}
      {mode === "flashcard" && (
        <div className="bg-panel border border-panel-light rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🃏</div>
          <h3 className="text-lg font-bold text-text-light">Flashcard Mode</h3>
          <p className="text-text-muted text-sm mt-2 max-w-md mx-auto">
            Tap to flip cards and rate your confidence. Uses spaced repetition to
            bring back cards you struggled with at optimal intervals.
          </p>
          <p className="text-neon-cyan text-sm mt-4">Coming soon with question bank integration</p>
        </div>
      )}

      {/* ── Jeopardy mode placeholder ── */}
      {mode === "jeopardy" && (
        <div className="bg-panel border border-panel-light rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-lg font-bold text-text-light">Jeopardy Mode</h3>
          <p className="text-text-muted text-sm mt-2 max-w-md mx-auto">
            See the answer first, then identify the correct question. A fun way to
            reinforce concepts and test your recall from a different angle.
          </p>
          <p className="text-neon-cyan text-sm mt-4">Coming soon with question bank integration</p>
        </div>
      )}
    </div>
  );
}
