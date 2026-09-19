import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  const list = (await kv.get<string[]>('waitlist')) || [];
  return NextResponse.json({ count: list.length, emails: list });
}

export async function DELETE() {
  await kv.set('waitlist', []);
  return NextResponse.json({ success: true });
}
