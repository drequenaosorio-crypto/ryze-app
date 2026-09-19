import { NextResponse } from 'next/server';
let waitlist: string[] = (globalThis as any)._waitlist || [];
(globalThis as any)._waitlist = waitlist;

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!waitlist.includes(email)) waitlist.push(email);
  return NextResponse.json({ success: true, count: waitlist.length });
}
export async function GET() {
  return NextResponse.json({ count: waitlist.length, emails: waitlist });
}
