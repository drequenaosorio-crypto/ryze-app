"use client"

import { useState, useRef } from 'react'

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

    const formData = new FormData()
    formData.append('file', file)
    formData.append('caption', caption)
    formData.append('handle', handle)

    // Use XHR to track progress
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/upload')
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100)
        setProgress(percent)
      }
    }
    xhr.onload = () => {
      setUploading(false)
      setProgress(100)
      if (xhr.status >= 200 && xhr.status < 300) {
        setFile(null)
        setPreview(null)
        setCaption('')
        setHandle('')
        if (onUploaded) onUploaded()
      } else {
        console.error('Upload failed', xhr.responseText)
      }
    }
    xhr.onerror = () => {
      setUploading(false)
      console.error('Upload error')
    }
    xhr.send(formData)
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
