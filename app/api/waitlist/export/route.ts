import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
const redis = Redis.fromEnv()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('key') !== 'RYZE2026') return new Response('No autorizado', {status:401})

  // Lee tanto set como lista por si acaso
  const setEmails = await redis.smembers('waitlist').catch(()=>[])
  const listEmails = await redis.lrange('waitlist', 0, -1).catch(()=>[])
  
  const all = [...(setEmails || []), ...(listEmails || [])]
  
  // Limpia duplicados y correos de prueba
  const unique = [...new Set(all)]
    .filter(e => e && !e.includes('ejemplo') && e.includes('@'))
    .map(e => e.trim().toLowerCase())

  const csv = "email\n" + unique.join("\n")
  
  return new Response(csv, { 
    headers: { 
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=ryze-waitlist.csv",
      "Cache-Control": "no-store, no-cache, must-revalidate"
    } 
  })
}
