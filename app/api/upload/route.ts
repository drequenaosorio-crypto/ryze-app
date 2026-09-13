import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) {
      return NextResponse.json({ error: 'Missing Supabase env vars' }, { status: 500 })
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const caption = formData.get('caption')?.toString() || ''
    const handle = formData.get('handle')?.toString() || 'Anonymous'

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const fileName = `${Date.now()}_${file.name}`

    const { error: uploadError } = await supabase.storage.from('pitches').upload(fileName, buffer, {
      contentType: file.type,
    })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data: publicData } = supabase.storage.from('pitches').getPublicUrl(fileName)
    const publicUrl = (publicData as any)?.publicUrl || (publicData as any)?.public_url || ''

    const { error: insertError } = await supabase.from('pitches').insert({ video_url: publicUrl, caption, handle })
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
