export const CAET_MODULES = [
  { id: "module_01", name: "Aviation Fundamentals", shortName: "Aviation Fund.", objectives: 8 },
  { id: "module_02", name: "Electrical Theory", shortName: "Electrical", objectives: 10 },
  { id: "module_03", name: "Electrical Fundamentals", shortName: "Elec. Fund.", objectives: 12 },
  { id: "module_04", name: "Soldering & Termination", shortName: "Soldering", objectives: 6 },
  { id: "module_05", name: "Wiring & Installation", shortName: "Wiring", objectives: 9 },
  { id: "module_06", name: "Navigation Systems", shortName: "Navigation", objectives: 11 },
  { id: "module_07", name: "Communication Systems", shortName: "Comm Systems", objectives: 10 },
  { id: "module_08", name: "Audio & Intercom Systems", shortName: "Audio/Intercom", objectives: 7 },
  { id: "module_09", name: "Display & Integration", shortName: "Display/Integ.", objectives: 8 },
  { id: "module_10", name: "Autopilot & Flight Control", shortName: "Autopilot/FC", objectives: 9 },
  { id: "module_11", name: "Weather & Surveillance", shortName: "Wx/Surveil.", objectives: 8 },
  { id: "module_12", name: "Safety & Regulatory", shortName: "Safety/Reg.", objectives: 7 },
] as const;

export type ModuleId = typeof CAET_MODULES[number]["id"];

export const PERSONA_TYPES = [
  { value: "military", label: "Military Avionics", description: "Active duty or transitioning military avionics technician" },
  { value: "student", label: "A&P Student", description: "Currently enrolled in an A&P or avionics program" },
  { value: "technician", label: "Working Technician", description: "Currently working in aviation maintenance" },
  { value: "other", label: "Other", description: "Career changer or self-study" },
] as const;

export type PersonaType = typeof PERSONA_TYPES[number]["value"];

export const PRACTICE_MODES = ["flashcard", "jeopardy", "test"] as const;
export type PracticeMode = typeof PRACTICE_MODES[number];

export const FREE_TIER_DAILY_CONVERSATIONS = 5;
export const FREE_TIER_MODULE_LIMIT = 1;
export const SUBSCRIPTION_PRICE_MONTHLY = 19.99;
