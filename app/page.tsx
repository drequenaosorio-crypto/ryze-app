"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import dynamic from 'next/dynamic'

const UploadPitch = dynamic(() => import('../components/ryze/upload-pitch'), { ssr: false })
import { FeedItem } from '../components/ryze/feed-item'

export default function Page() {
  const [pitches, setPitches] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPitches()
  }, [])

  async function fetchPitches() {
    setLoading(true)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    if (!supabaseUrl || !supabaseKey) {
      setLoading(false)
      return
    }
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase.from('pitches').select('*').order('created_at', { ascending: false })
    if (!error && data) setPitches(data)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="p-4 border-b border-white/10 flex items-center justify-between">
        <h1 className="text-xl font-bold">Ryze</h1>
      </header>
      <section className="p-4">
        <UploadPitch onUploaded={fetchPitches} />
      </section>

      <section className="snap-y snap-mandatory overflow-y-scroll h-[70vh]">
        {loading && <p className="p-4">Cargando pitches...</p>}
        {!loading && pitches.length === 0 && <p className="p-4">No hay pitches aún.</p>}
        {pitches.map((p) => (
          <FeedItem key={p.id} pitch={p} />
        ))}
      </section>
    </main>
  )
}
