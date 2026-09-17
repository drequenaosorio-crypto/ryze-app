import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()

export async function GET() {
  try {
    // 1. Agarrar todos los emails
    const all = await redis.smembers('waitlist') as string[]
    
    // 2. Borrar cada lista de referidos
    for (const email of all) {
      await redis.del(`waitlist:referrals:${email}`)
      await redis.del(`waitlist:email:${email}`) // por si guardas datos extra
    }

    // 3. Borrar la lista principal
    await redis.del('waitlist')

    // 4. Borrar leaderboard si existe
    await redis.del('waitlist:leaderboard')

    return Response.json({ ok: true, msg: `Lista borrada - ${all.length} emails eliminados` })
  } catch (e: any) {
    return Response.json({ ok: false, error: e.message }, { status: 500 })
  }
}
