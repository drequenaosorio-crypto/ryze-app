import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const list = (await kv.get<string[]>('waitlist')) || [];
    
    if (list.includes(email)) {
      return NextResponse.json({ success: true, count: list.length, message: 'Ya estás dentro' });
    }

    list.push(email);
    await kv.set('waitlist', list);

    return NextResponse.json({ success: true, count: list.length });
  } catch (e) {
    return NextResponse.json({ error: 'Error KV - Crea la DB en Vercel' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const list = (await kv.get<string[]>('waitlist')) || [];
    return NextResponse.json({ count: list.length, emails: list });
  } catch {
    return NextResponse.json({ count: 0, emails: [] });
  }
}
