"use client"

import { useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function UploadPitch({ onUploaded }: { onUploaded?: () => void }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [handle, setHandle] = useState('')
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null
    setFile(f)
    if (f) setPreview(URL.createObjectURL(f))
  }

  async function upload() {
    if (!file) return
    setUploading(true)
    setProgress(0)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    if (!supabaseUrl || !supabaseKey) {
      setUploading(false)
      return
    }

    const fileName = `${Date.now()}_${file.name}`
    const uploadUrl = `${supabaseUrl.replace(/\/+$/, '')}/storage/v1/object/pitches/${fileName}`

    // Upload directly with XMLHttpRequest to track progress
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', uploadUrl)
    xhr.setRequestHeader('Authorization', `Bearer ${supabaseKey}`)
    xhr.setRequestHeader('Content-Type', file.type)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100)
        setProgress(percent)
      }
    }

    xhr.onload = async () => {
      setUploading(false)
      setProgress(100)
      if (xhr.status >= 200 && xhr.status < 300) {
        const publicUrl = `${supabaseUrl.replace(/\/+$/, '')}/storage/v1/object/public/pitches/${fileName}`
        // Insert record into DB using supabase-js client (anon key)
        try {
          const supabase = createClient(supabaseUrl, supabaseKey)
          const { error } = await supabase.from('pitches').insert({ video_url: publicUrl, caption, handle })
          if (!error) {
            setFile(null)
            setPreview(null)
            setCaption('')
            setHandle('')
            if (onUploaded) onUploaded()
          }
        } catch (err) {
          // silent
        }
      } else {
        // silent
      }
    }

    xhr.onerror = () => {
      setUploading(false)
      // silent
    }

    xhr.send(file)
  }

  return (
    <div className="p-4 bg-white/5 rounded-md">
      <h3 className="text-white font-semibold mb-2">Subir Pitch</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <input ref={inputRef} type="file" accept="video/*" onChange={handleFileChange} className="text-sm text-white" />
          {preview && (
            <video src={preview} controls className="mt-2 w-full h-auto rounded-md" />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <input placeholder="Handle" value={handle} onChange={(e)=>setHandle(e.target.value)} className="p-2 rounded bg-white/5 text-white" />
          <textarea placeholder="Caption" value={caption} onChange={(e)=>setCaption(e.target.value)} className="p-2 rounded bg-white/5 text-white" />
          <div className="flex items-center gap-2">
            <button disabled={!file || uploading} onClick={upload} className="px-4 py-2 rounded bg-[#8A2BE2] text-white">{uploading ? `Subiendo ${progress}%` : 'Subir'}</button>
            <button onClick={() => { setFile(null); setPreview(null); inputRef.current && (inputRef.current.value = '') }} className="px-3 py-2 rounded bg-zinc-700 text-white">Limpiar</button>
          </div>
          {uploading && (
            <div className="w-full bg-white/10 h-2 rounded mt-2 overflow-hidden">
              <div style={{ width: `${progress}%` }} className="h-full bg-[#8A2BE2] transition-all" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
