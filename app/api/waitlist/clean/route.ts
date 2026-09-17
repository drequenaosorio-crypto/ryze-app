import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('key') !== 'RYZE2026') return new Response('No autorizado', {status:401})
  
  // Borra todo y deja solo los 2 reales únicos
  await redis.del('waitlist')
  await redis.sadd('waitlist', 'drequenaosorio@gmail.com')
  await redis.sadd('waitlist', 'davidrequenaosorio5@gmail.com')
  
  return new Response('Limpieza final hecha - 2 emails únicos')
}
