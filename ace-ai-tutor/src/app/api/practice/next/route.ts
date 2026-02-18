import { NextRequest } from "next/server";

// Placeholder question bank — will be loaded from JSON files / database
const QUESTION_BANK = [
  {
    id: "q_02_01",
    module_id: "module_02",
    objective_id: "2.1",
    question_text: "What is the primary purpose of a static inverter in an aircraft electrical system?",
    options: [
      { label: "A", text: "Convert AC power to DC power" },
      { label: "B", text: "Convert DC power to AC power" },
      { label: "C", text: "Regulate voltage output from the generator" },
      { label: "D", text: "Provide emergency battery backup" },
    ],
    correct_answer: "B",
    explanation: "A static inverter converts DC power from the aircraft battery or DC bus to AC power needed by certain instruments and avionics. Unlike a rotary inverter, it has no moving parts, making it more reliable and lighter. Reference: AC 43.13-1B, Chapter 11.",
    difficulty: "medium",
  },
  {
    id: "q_03_01",
    module_id: "module_03",
    objective_id: "3.2",
    question_text: "According to Ohm's Law, if a circuit has 28V applied across a 4-ohm resistor, what is the current flow?",
    options: [
      { label: "A", text: "7 amps" },
      { label: "B", text: "112 amps" },
      { label: "C", text: "0.14 amps" },
      { label: "D", text: "32 amps" },
    ],
    correct_answer: "A",
    explanation: "Ohm's Law: I = V/R. So I = 28V / 4Ω = 7 amps. In a standard 28V DC aircraft system, this is a common calculation you'll use when sizing wire and selecting circuit protection.",
    difficulty: "easy",
  },
  {
    id: "q_05_01",
    module_id: "module_05",
    objective_id: "5.1",
    question_text: "What type of coaxial cable is commonly specified for avionics antenna installations in general aviation?",
    options: [
      { label: "A", text: "RG-58" },
      { label: "B", text: "RG-400" },
      { label: "C", text: "RG-6" },
      { label: "D", text: "RG-11" },
    ],
    correct_answer: "B",
    explanation: "RG-400 (also known as M17/128) is the standard coaxial cable for avionics RF connections. It has a silver-plated copper conductor, PTFE dielectric, and double silver-plated copper braid shield. RG-58 is sometimes found in older installations but RG-400 is the current standard. RG-6 and RG-11 are residential cable types, not used in aviation.",
    difficulty: "medium",
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { moduleId, mode = "test" } = body;

    // TODO: Implement spaced repetition algorithm
    // For now, return a random question from the bank, optionally filtered by module
    let questions = QUESTION_BANK;
    if (moduleId && moduleId !== "all") {
      questions = questions.filter((q) => q.module_id === moduleId);
    }

    if (questions.length === 0) {
      return Response.json({ error: "No questions available for this module" }, { status: 404 });
    }

    const question = questions[Math.floor(Math.random() * questions.length)];

    // In jeopardy mode, swap question/answer presentation
    if (mode === "jeopardy") {
      return Response.json({
        ...question,
        jeopardy_clue: question.explanation,
        question_text: `What is: "${question.question_text}"`,
      });
    }

    return Response.json(question);
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
