import { NextResponse } from "next/server";
import { eventService } from "@/server/services/event.service";

export async function GET() {
  const events = await eventService.list();
  return NextResponse.json(events);
}
