import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'
const redis = Redis.fromEnv()
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('key') !== 'RYZE2026') return new Response('No autorizado', {status:401})
  const emails = await redis.smembers('waitlist')
  const csv = "email\n" + emails.join("\n")
  return new Response(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": "attachment; filename=ryze-waitlist.csv" } })
}
