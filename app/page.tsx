"use client"
import { useRef, useEffect } from "react"
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react"

export default function Page() {
  const refs = useRef<(HTMLVideoElement | null)[]>([])
  useEffect(() => {
    const obs = new IntersectionObserver((e) => {
      e.forEach((en) => {
        const v = en.target as HTMLVideoElement
        if (en.isIntersecting) v.play().catch(()=>{})
        else v.pause()
      })
    }, { threshold: 0.6 })
    refs.current.forEach(v => v && obs.observe(v))
    return () => obs.disconnect()
  }, [])

  const videos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  ]

  return (
    <div className="h-screen w-screen bg-black overflow-y-scroll snap-y snap-mandatory">
      <div className="sticky top-0 z-10 bg-black p-4 flex justify-between border-b border-zinc-900 w-full max-w-[430px] mx-auto">
        <p className="text-white font-black text-xl">RYZE</p>
        <div className="w-7 h-7 bg-white rounded-full" />
      </div>
      {videos.map((src, i) => (
        <div key={i} className="h-[calc(100vh-56px)] w-full max-w-[430px] mx-auto relative snap-start">
          <video ref={el => { refs.current[i] = el }} src={src} loop muted playsInline className="w-full h-full object-cover" />
          <div className="absolute bottom-0 w-full p-4 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
            <div>
              <p className="text-white font-bold">@drequenaosorio</p>
              <p className="text-white text-sm">Mi primer pitch 🔥</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-center"><div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center"><Heart className="text-white" /></div><p className="text-white text-xs mt-1">124</p></div>
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center"><MessageCircle className="text-white" /></div>
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center"><Bookmark className="text-white" /></div>
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center"><Share2 className="text-white" /></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
