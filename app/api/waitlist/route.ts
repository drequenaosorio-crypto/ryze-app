import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()

export async function POST(req: Request) {
  const { email, ref } = await req.json()
  if (!email || !email.includes('@')) return new Response('Email invalido', {status:400})
  
  const cleanEmail = email.trim().toLowerCase()
  const cleanRef = ref ? ref.trim().toLowerCase() : null

  // 1. Guarda email en lista principal (sin duplicados)
  await redis.sadd('waitlist', cleanEmail)
  
  // 2. Si viene con referido y no es el mismo email
  if (cleanRef && cleanRef !== cleanEmail && cleanRef.includes('@')) {
    // Guarda quién lo refirió
    await redis.set(`waitlist:ref_by:${cleanEmail}`, cleanRef)
    // Guarda en la lista de referidos del invitador
    await redis.sadd(`waitlist:referrals:${cleanRef}`, cleanEmail)
  }
  
  return Response.json({ ok: true })
}

// GET para que puedas ver cuantos lleva cada uno
export async function GET() {
  const all = await redis.smembers('waitlist')
  return Response.json({ total: all.length, emails: all })
}
