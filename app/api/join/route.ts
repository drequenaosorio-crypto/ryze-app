import { NextResponse } from 'next/server';

let waitlist: string[] = []; // En Vercel usa KV, por ahora en memoria

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }
    if (waitlist.includes(email)) {
      return NextResponse.json({ count: waitlist.length, message: 'Ya estás en la lista' });
    }
    waitlist.push(email);
    console.log('Nuevo:', email, 'Total:', waitlist.length);
    return NextResponse.json({ success: true, count: waitlist.length });
  } catch (e) {
    return NextResponse.json({ error: 'Error servidor' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ count: waitlist.length });
}
