"use client"
import { useState } from "react"
import { Heart, MessageCircle, Bookmark, Share2, Music2, Plus, Check } from "lucide-react"
export function FeedItem({ pitch }: { pitch: any }) {
  const [isLiked, setIsLiked] = useState(false)
  const [conectado, setConectado] = useState(false)
  const [likesCount, setLikesCount] = useState<number>(pitch.likes || 0)

  async function toggleLike(e: React.MouseEvent) {
    e.stopPropagation()
    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitchId: pitch.id, userId: 'anonymous' })
      })
      const data = await res.json()
      if (res.ok) {
        setIsLiked(data.liked)
        setLikesCount(data.likes)
      }
    } catch (err) {
      // silent fail - server logs will capture errors
    }
  }

  return (
    <section className="relative h-screen w-full snap-start overflow-hidden bg-black">
      <div className="absolute inset-0 bg-zinc-900">
        {pitch.video_url && <video src={pitch.video_url} loop autoPlay muted playsInline className="h-full w-full object-cover" />}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute right-2 top-20 flex flex-col items-center">
        <div className="relative size-12 rounded-full bg-zinc-800 flex items-center justify-center text-white">{pitch.handle?.[1] || "R"}</div>
        <button onClick={(e)=>{e.stopPropagation(); setConectado(!conectado)}} className="pointer-events-auto relative z-20 -mt-2 flex size-5 items-center justify-center rounded-full bg-[#8A2BE2]">{conectado? <Check className="size-3 text-white"/> : <Plus className="size-3 text-white"/>}</button>
      </div>
      <div className="absolute bottom-24 right-2 flex flex-col items-center gap-6">
        <button onClick={toggleLike} className="pointer-events-auto relative z-20 flex flex-col items-center gap-1"><Heart className={isLiked? "size-8 fill-[#8A2BE2] text-[#8A2BE2]" : "size-8 text-white"} /><span className="text-xs text-white">{likesCount}</span></button>
        <button onClick={(e)=>e.stopPropagation()} className="pointer-events-auto relative z-20"><MessageCircle className="size-8 text-white" /></button>
        <button onClick={(e)=>e.stopPropagation()} className="pointer-events-auto relative z-20"><Bookmark className="size-8 text-white" /></button>
        <button onClick={(e)=>e.stopPropagation()} className="pointer-events-auto relative z-20"><Share2 className="size-8 text-white" /></button>
      </div>
      <div className="absolute bottom-4 left-0 right-20 px-4 pointer-events-none">
        <p className="text-white font-bold">{pitch.handle}</p><p className="text-white/90 text-sm">{pitch.caption}</p>
        <p className="text-[#FFD700] text-sm">{pitch.tags?.join(" ")}</p>
        <div className="flex gap-2 text-xs text-white/80 mt-2"><Music2 className="size-3.5" /><span>{pitch.audio || "Audio original"}</span></div>
      </div>
    </section>
  )
}
