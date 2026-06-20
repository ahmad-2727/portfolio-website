import { NextResponse } from "next/server";
import { signAdminToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request) {
  const { username, password } = await request.json();

  const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || "changeme123";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = signAdminToken();
    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  return NextResponse.json(
    { error: "Ghalat username ya password." },
    { status: 401 }
  );
}
