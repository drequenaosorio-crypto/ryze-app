import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()
export async function GET() {
  try {
    const c = await redis.get('ryze_comments')
    return Response.json(c || [])
  } catch { return Response.json([]) }
}
export async function POST(req: Request) {
  const { text } = await req.json()
  if (!text?.trim()) return Response.json({error: 'vacio'}, {status: 400})
  const comments = (await redis.get<any[]>('ryze_comments')) || []
  const newOne = { user: "ryze_fan", text: text.trim(), id: Date.now() }
  await redis.set('ryze_comments', [...comments, newOne].slice(-100))
  return Response.json(newOne)
}
