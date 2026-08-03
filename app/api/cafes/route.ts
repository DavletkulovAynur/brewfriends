import { NextResponse } from "next/server";
import { cafeService } from "@/server/services/cafe.service";

export async function GET() {
  const cafes = await cafeService.list();
  return NextResponse.json({
    cafes: cafes.map((cafe) => ({
      id: cafe.id,
      name: cafe.name,
      distance: cafe.address,
    })),
  });
}
