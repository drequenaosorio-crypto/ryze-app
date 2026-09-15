import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"

const redis = Redis.fromEnv()

export async function POST(req: Request) {
  try {
    const { instagram, email } = await req.json()
    if (!instagram && !email) {
      return NextResponse.json({ error: "falta IG" }, { status: 400 })
    }
    const data = { 
      instagram: instagram || "", 
      email: email || "", 
      date: new Date().toISOString() 
    }
    await redis.lpush("waitlist", JSON.stringify(data))
    return NextResponse.json({ success: true, data })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const list = await redis.lrange("waitlist", 0, 100)
    const parsed = list.map((item: any) => {
      try { return typeof item === 'string' ? JSON.parse(item) : item } 
      catch { return item }
    })
    return NextResponse.json(parsed)
  } catch (e: any) {
    return NextResponse.json({ error: e.message, envs: !!process.env.UPSTASH_REDIS_REST_URL }, { status: 500 })
  }
}
