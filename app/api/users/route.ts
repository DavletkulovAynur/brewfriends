import { NextResponse } from "next/server";
import { userService } from "@/server/services/user.service";

export async function GET() {
  const users = await userService.list();
  return NextResponse.json(users);
}
