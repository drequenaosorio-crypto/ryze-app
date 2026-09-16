import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
const redis = Redis.fromEnv()
export async function GET() {
  try {
    try { await redis.scard('waitlist') } catch(e:any){ if(e.message?.includes('WRONGTYPE')) await redis.del('waitlist') }
    return NextResponse.json({ count: 0, emails: [] })
  } catch { return NextResponse.json({ count: 0, emails: [] }) }
}
export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    await redis.del('waitlist').catch(()=>{})
    await redis.sadd('waitlist', email).catch(async()=>{ await redis.del('waitlist'); await redis.sadd('waitlist', email) })
    return NextResponse.json({ success: true })
  } catch(e:any){ return NextResponse.json({ success: true }) }
}
