import { NextResponse } from 'next/server';

const waitlist = [
  {
    email: "drequenaosorio@gmail.com",
    ig: "@david_ro_16",
    date: new Date().toISOString()
  }
];

export async function GET() {
  return NextResponse.json(waitlist);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ ok: true, received: body });
}
