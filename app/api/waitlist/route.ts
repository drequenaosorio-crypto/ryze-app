import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()

export async function POST(req: Request) {
  try {
    const { email, instagram } = await req.json()
    if (!email &&!instagram) {
      return Response.json({ error: 'Falta dato' }, { status: 400 })
    }
    const entry = {
      email: email || '',
      instagram: instagram || '',
      date: new Date().toISOString()
    }
    await redis.lpush('waitlist', JSON.stringify(entry))
    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const list = await redis.lrange('waitlist', 0, 100)
    return Response.json(list.map((l: any) => JSON.parse(l)))
  } catch {
    return Response.json([])
  }
}
