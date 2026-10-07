import { NextResponse } from "next/server";
import { matchService } from "@/server/matching/match.service";

export async function GET() {
  const matches = await matchService.findMatches();
  return NextResponse.json(matches);
}
