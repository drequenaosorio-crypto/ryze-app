import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('key') !== 'RYZE2026') return new Response('No autorizado', {status:401})
  await redis.srem('waitlist', 'ejemplo.2@gmail.com')
  // elimina duplicado, Redis ya no permite duplicados, así que con esto queda limpio
  return new Response('Limpieza hecha')
}
