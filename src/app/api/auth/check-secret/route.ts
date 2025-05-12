import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: "MISSING_SECRET" }, { status: 500 });
  }

  return NextResponse.json({ status: "ok" });
}
