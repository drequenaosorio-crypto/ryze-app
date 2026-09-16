import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!email) {
      return NextResponse.json({ error: "Falta email" }, { status: 400 });
    }

    // Si no hay Upstash configurado, igual responde OK para no bloquear
    if (url && token) {
      const payload = JSON.stringify({ email, date: new Date().toISOString() });
      await fetch(`${url}/lpush/waitlist/${encodeURIComponent(payload)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    return NextResponse.json({ success: true, email });
  } catch (e) {
    return NextResponse.json({ success: true });
  }
}

export async function GET() {
  return NextResponse.json({ status: "RYZE API OK" });
}
