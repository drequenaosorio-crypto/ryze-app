import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) return new Response('Email invalido', {status:400})
  
  const cleanEmail = email.trim().toLowerCase()
  // Guarda como SET - nunca permite duplicados
  await redis.sadd('waitlist', cleanEmail)
  
  return Response.json({ ok: true })
}
