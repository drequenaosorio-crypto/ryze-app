import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export async function GET() {
  try {
    const redis = Redis.fromEnv()
    const all = await redis.smembers('waitlist') as string[]

    // Borrar todo lo de cada usuario
    for (const email of all) {
      await redis.del(`waitlist:referrals:${email}`)
      await redis.del(`waitlist:ref_by:${email}`)
    }

    // Borrar la lista principal
    await redis.del('waitlist')

    return NextResponse.json({ 
      ok: true, 
      msg: `Lista borrada - ${all.length} emails eliminados`,
      deleted: all 
    })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
