import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = Redis.fromEnv()

const FOUNDER = {
  email: 'drequenaosorio@gmail.com',
  ig: 'david_ro_16',
  id: 1
}

export async function GET() {
  const list = (await redis.lrange('waitlist', 0, -1)) || []
  const all = [FOUNDER, ...list.map((e:any) => JSON.parse(e))]
  return NextResponse.json({ ok: true, total: all.length, founders: all })
}

export async function POST(req: Request) {
  const { email, ig } = await req.json()
  if (!email) return NextResponse.json({ ok: false }, { status: 400 })
  
  // evita duplicados
  const list = (await redis.lrange('waitlist', 0, -1)) || []
  const exists = list.some((e:any) => JSON.parse(e).email === email)
  if (exists) return NextResponse.json({ ok: true, already: true })

  await redis.rpush('waitlist', JSON.stringify({ email, ig, date: new Date().toISOString() }))
  return NextResponse.json({ ok: true })
}
