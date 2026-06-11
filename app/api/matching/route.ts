import { NextResponse } from "next/server";
import { matchService } from "@/server/services/match.service";

export async function GET() {
  const matches = await matchService.findMatches();
  return NextResponse.json(matches);
}
