import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  const { email, ig } = await req.json();
  const entry = { email, ig, date: new Date().toISOString() };
  await redis.lpush("waitlist", JSON.stringify(entry));
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const list = await redis.lrange("waitlist", 0, -1);
  return NextResponse.json(list.map((s: any) => JSON.parse(s as string)));
}

export async function DELETE() {
  await redis.del("waitlist");
  return NextResponse.json({ ok: true, message: "Borrado" });
}
