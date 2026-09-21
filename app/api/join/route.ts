import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const { email } = await req.json()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { error } = await supabase.from('leads').insert([{ email }])
  if (error) return Response.json({ error: error.message }, { status: 400 })
  return Response.json({ ok: true })
}
