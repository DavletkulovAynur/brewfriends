import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { profileService } from "@/server/services/profile.service";

export async function GET() {
  const session = await getSession();
  const people = await profileService.listVisibleStories(session?.userId);
  return NextResponse.json({ people });
}