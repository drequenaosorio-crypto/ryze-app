import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export async function GET() {
  try {
    const redis = Redis.fromEnv()

    // 1. BORRAR DE REDIS (que es donde está tu admin real)
    const all = await redis.smembers('waitlist') as string[]
    for (const email of all) {
      await redis.del(`waitlist:referrals:${email}`)
    }
    await redis.del('waitlist')

    // 2. BORRAR DE KV TAMBIEN por si acaso
    try {
      const binding = (globalThis as any).RYZE_WAITLIST
      if (binding) {
        const list = await binding.list()
        for (const key of list.keys) {
          await binding.delete(key.name)
        }
      }
    } catch {}

    return NextResponse.json({ ok: true, msg: `Lista borrada - ${all.length} emails eliminados de Redis` })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
