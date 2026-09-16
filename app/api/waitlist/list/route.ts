import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  const res = await fetch(`${url}/lrange/waitlist/0/-1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  const emails = (data.result || []).map((e: string) => {
    try { return JSON.parse(e); } catch { return { email: e, date: "" }; }
  }).reverse();

  return NextResponse.json({ emails });
}
