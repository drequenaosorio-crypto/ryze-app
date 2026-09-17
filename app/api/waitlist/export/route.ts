import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('key') !== 'RYZE2026') return new Response('No autorizado', {status:401})
  
  // Fuerza borrado de lista vieja y deja solo set
  const setEmails = await redis.smembers('waitlist')
  const unique = [...new Set(setEmails)].filter(e => e && !e.includes('ejemplo'))

  return new Response("email\n" + unique.join("\n"), { 
    headers: { 
      "Content-Type": "text/csv",
      "Cache-Control": "no-store"
    } 
  })
}
