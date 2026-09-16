import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()

export async function GET() {
  const count = await redis.scard('waitlist')
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
