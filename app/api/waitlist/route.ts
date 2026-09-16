import { NextResponse } from 'next/server';

const waitlist = [
  { email: "drequenaosorio@gmail.com", ig: "@david_ro_16" }
];

export async function GET() {
  return NextResponse.json(waitlist);
}

export async function POST(req: Request) {
  const data = await req.json();
  return NextResponse.json({ ok: true, data });
}
