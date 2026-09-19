import { NextResponse } from 'next/server';

// Versión simple pero permanente usando un Gist / KV
// Si no tienes KV, usa esta versión que guarda en memoria + log

let waitlist: string[] = globalThis as any;
if (!(globalThis as any)._waitlist) {
  (globalThis as any)._waitlist = [];
}
const list = (globalThis as any)._waitlist as string[];

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }
    
    if (list.includes(email)) {
      return NextResponse.json({ 
        count: list.length, 
        message: 'Ya estás en la lista',
        success: true 
      });
    }
    
    list.push(email);
    console.log(`RYZE - Nuevo: ${email} - Total: ${list.length}`);
    
    return NextResponse.json({ 
      success: true, 
      count: list.length,
      message: `¡Eres #${list.length}!`
    });
    
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error servidor' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ count: list.length });
}
