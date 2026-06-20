import { NextResponse } from "next/server";
import { addMessage } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email aur message zaroori hain." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Sahi email address darj karein." },
        { status: 400 }
      );
    }

    const entry = await addMessage({
      name: name.trim(),
      email: email.trim(),
      subject: (subject || "General Inquiry").trim(),
      message: message.trim(),
    });

    return NextResponse.json({ success: true, id: entry.id }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Kuch ghalat hua. Dobara koshish karein." },
      { status: 500 }
    );
  }
}
