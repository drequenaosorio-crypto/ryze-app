import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()
const ADMIN_KEY = 'RYZE2026'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')
  
  const count = await redis.scard('waitlist')

  // Si no pone la clave, solo ve el número, no los emails
  if (key !== ADMIN_KEY) {
    return NextResponse.json({ count })
  }

  // Si pone la clave correcta, ve todo
  const emails = await redis.smembers('waitlist')
  return NextResponse.json({ count, emails })
}

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }
  await redis.sadd('waitlist', email.toLowerCase().trim())
  return NextResponse.json({ success: true })
}
