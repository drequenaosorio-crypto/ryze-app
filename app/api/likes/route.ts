import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()

export async function GET() {
  try {
    let likes = await redis.get('likes')
    if (!likes) {
      likes = 12501
      await redis.set('likes', likes)
    }
    return Response.json({ likes })
  } catch { 
    return Response.json({ likes: 12501 }) 
  }
}

export async function POST() {
  try {
    const likes = await redis.incr('likes')
    return Response.json({ likes })
  } catch {
    return Response.json({ likes: 12502 })
  }
}
