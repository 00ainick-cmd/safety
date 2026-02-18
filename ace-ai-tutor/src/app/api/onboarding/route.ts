import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { personaType, selectedModules, diagnosticResults } = body;

    if (!personaType || !selectedModules || selectedModules.length === 0) {
      return Response.json(
        { error: "personaType and selectedModules are required" },
        { status: 400 }
      );
    }

    // TODO: Save to Supabase users table and create initial mastery records
    // 1. Update user profile with persona_type
    // 2. Create mastery_scores rows for each selected module's objectives
    // 3. If diagnosticResults provided, seed initial mastery scores

    return Response.json({
      success: true,
      message: "Onboarding complete",
      user: {
        persona_type: personaType,
        selected_modules: selectedModules,
        has_diagnostic: !!diagnosticResults,
      },
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
