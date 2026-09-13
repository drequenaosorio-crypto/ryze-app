import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { pitchId, userId } = body
    if (!pitchId) return NextResponse.json({ error: 'Missing pitchId' }, { status: 400 })

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return NextResponse.json({ error: 'Missing Supabase env vars' }, { status: 500 })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

    // check existing like
    const { data: existingLikes, error: selectError } = await supabase.from('likes').select('*').eq('pitch_id', pitchId).eq('user_id', userId || 'anonymous')
    if (selectError) {
      return NextResponse.json({ error: selectError.message }, { status: 500 })
    }

    let liked = false
    let newLikesCount = 0

    if (existingLikes && existingLikes.length > 0) {
      // remove like
      const likeId = existingLikes[0].id
      const { error: delErr } = await supabase.from('likes').delete().eq('id', likeId)
      if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 })

      // decrement pitches.likes
      const { data: pitchData, error: pErr } = await supabase.from('pitches').select('likes').eq('id', pitchId).single()
      if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 })
      newLikesCount = Math.max(0, (pitchData.likes || 0) - 1)
      const { error: updateErr } = await supabase.from('pitches').update({ likes: newLikesCount }).eq('id', pitchId)
      if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 })
      liked = false
    } else {
      // add like
      const { error: insErr } = await supabase.from('likes').insert({ pitch_id: pitchId, user_id: userId || 'anonymous' })
      if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 })

      const { data: pitchData, error: pErr } = await supabase.from('pitches').select('likes').eq('id', pitchId).single()
      if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 })
      newLikesCount = (pitchData.likes || 0) + 1
      const { error: updateErr } = await supabase.from('pitches').update({ likes: newLikesCount }).eq('id', pitchId)
      if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 })
      liked = true
    }

    return NextResponse.json({ liked, likes: newLikesCount })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
