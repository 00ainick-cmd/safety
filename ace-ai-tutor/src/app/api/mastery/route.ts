import { NextRequest } from "next/server";
import { CAET_MODULES } from "@/lib/constants";

export async function GET(req: NextRequest) {
  // TODO: Pull real mastery data from Supabase for the authenticated user

  // Demo mastery data
  const modules = CAET_MODULES.map((mod) => ({
    module_id: mod.id,
    module_name: mod.name,
    mastery_percentage: Math.floor(Math.random() * 100),
    objectives_assessed: Math.floor(Math.random() * mod.objectives),
    objectives_total: mod.objectives,
  }));

  const readiness = Math.round(
    modules.reduce((sum, m) => sum + m.mastery_percentage, 0) / modules.length
  );

  return Response.json({
    readiness_score: readiness,
    study_streak: 4,
    modules,
  });
}
