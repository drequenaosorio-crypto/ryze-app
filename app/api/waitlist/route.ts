import { NextResponse } from 'next/server';

// Esta es la base de datos temporal (mientras conectamos la real)
let waitlist: any[] = [
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
  try {
    const body = await req.json();
    const { email, ig } = body;

    if (!email) {
      return NextResponse.json({ error: "Falta email" }, { status: 400 });
    }

    // Evitar duplicados
    const exists = waitlist.find((w) => w.email === email);
    if (exists) {
      return NextResponse.json({ ok: true, message: "Ya estás en lista", waitlist });
    }

    const newUser = {
      email,
      ig: ig || "",
      date: new Date().toISOString()
    };

    waitlist.push(newUser);

    return NextResponse.json({ ok: true, added: newUser, total: waitlist.length });
  } catch (e) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
