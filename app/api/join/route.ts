import { NextResponse } from 'next/server';

let waitlist: string[] = (globalThis as any)._waitlist || [];
(globalThis as any)._waitlist = waitlist;

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email ||!email.includes('@')) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
  }
  if (waitlist.includes(email)) {
    return NextResponse.json({ success: true, count: waitlist.length, message: 'Ya estás dentro' });
  }
  waitlist.push(email);
  return NextResponse.json({ success: true, count: waitlist.length });
}

export async function GET() {
  return NextResponse.json({ count: waitlist.length });
}
