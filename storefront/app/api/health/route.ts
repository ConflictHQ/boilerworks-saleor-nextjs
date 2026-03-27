import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "boilerworks-saleor-storefront",
    timestamp: new Date().toISOString(),
  });
}
