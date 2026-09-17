import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('key') !== 'RYZE2026') return new Response('No autorizado', {status:401})
  await redis.del('waitlist')
  await redis.sadd('waitlist', 'drequenaosorio@gmail.com', 'davidrequenaosorio5@gmail.com')
  const final = await redis.smembers('waitlist')
  return new Response('LIMPIO: ' + final.join(', '))
}
