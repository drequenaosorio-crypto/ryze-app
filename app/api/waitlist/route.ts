import { NextResponse } from 'next/server';

// Tu único registro limpio
const waitlist = [
  {
    email: "tu-email@ejemplo.com",
    ig: "@david_ro_16",
    date: new Date().toISOString()
  }
];

export async function GET() {
  return NextResponse.json(waitlist);
}

export async function POST(req: Request) {
  const body = await req.json();
  waitlist.push(body);
  return NextResponse.json({ ok: true });
}
