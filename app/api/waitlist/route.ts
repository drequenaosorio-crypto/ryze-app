import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()
const ADMIN_KEY = 'RYZE2026'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')
  const count = await redis.scard('waitlist')
  if (key !== ADMIN_KEY) return NextResponse.json({ count })
  const emails = await redis.smembers('waitlist')
  return NextResponse.json({ count, emails })
}

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }
  const cleanEmail = email.toLowerCase().trim()
  await redis.sadd('waitlist', cleanEmail)
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL,
        to: cleanEmail,
        subject: 'Bienvenido a RYZE - Estás dentro',
        html: `<div style="font-family:Arial;background:#000;color:#fff;padding:40px;text-align:center"><h1 style="color:#a3ff12;font-size:40px">RYZE</h1><h2>Estás en la lista.</h2><p>Gracias por unirte. Serás el primero en saber cuando lancemos.</p><p style="color:#888;font-size:12px;margin-top:30px">ryzeofficial-app.com</p></div>`
      })
    })
  } catch (e) { console.log(e) }
  return NextResponse.json({ success: true })
}
