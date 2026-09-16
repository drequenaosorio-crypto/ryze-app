import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalido" }, { status: 400 });
    }
    await redis.sadd("waitlist", email);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: true });
  }
}

export async function GET() {
  try {
    const emails = await redis.smembers("waitlist");
    return NextResponse.json({ count: emails.length, emails });
  } catch (e) {
    return NextResponse.json({ count: 0, emails: [] });
  }
}
