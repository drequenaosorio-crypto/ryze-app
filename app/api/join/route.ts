import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email ||!email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }
    const clean = email.toLowerCase().trim();
    const key = 'ryze-waitlist-final';
    let list: string[] = (await kv.get(key)) || [];

    if (!list.includes(clean)) {
      list.push(clean);
      await kv.set(key, list);
    }
    return NextResponse.json({ success: true, count: list.length });
  } catch (e: any) {
    return NextResponse.json({ error: 'KV no conectado en Vercel: ' + e.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const list: string[] = (await kv.get('ryze-waitlist-final')) || [];
    return NextResponse.json({ count: list.length, emails: list });
  } catch {
    return NextResponse.json({ count: 0, emails: [] });
  }
}
