import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()

export async function GET() {
  const all = await redis.smembers('waitlist') as string[]
  const leaderboard = []

  for (const email of all) {
    const refs = await redis.smembers(`waitlist:referrals:${email}`) as string[]
    leaderboard.push({ email, count: refs.length, referrals: refs })
  }

  leaderboard.sort((a,b) => b.count - a.count)

  return Response.json({ total: all.length, leaderboard })
}
