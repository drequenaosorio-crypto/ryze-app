"use client"
import { useEffect, useRef } from "react"

const pitches = [
  { user: "drequenaosorio", caption: "Mi primer pitch 🔥", likes: 124, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { user: "ryze_official", caption: "Freestyle de la noche 🗽", likes: 89, video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
]

export default function Home() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const v = e.target as HTMLVideoElement
        if (e.isIntersecting) v.play().catch(()=>{})
        else v.pause()
      })
    }, { threshold: 0.6 })
    videoRefs.current.forEach(v => v && obs.observe(v))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="h-screen bg-black text-white overflow-y-scroll snap-y snap-mandatory">
      <div className="sticky top-0 z-20 bg-black p-4 flex justify-between items-center border-b border-zinc-800">
        <h1 className="text-2xl font-black">RYZE</h1>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>

      {pitches.map((p, i) => (
        <div key={i} className="relative h-[calc(100vh-65px)] snap-start overflow-hidden">
          <video
            ref={el => { videoRefs.current[i] = el }}
            src={p.video}
            loop
            muted
            playsInline
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          <div className="absolute bottom-0 w-full p-4 flex justify-between items-end">
            <div>
              <p className="font-bold">@{p.user}</p>
              <p className="mt-1 text-sm">{p.caption}</p>
              <p className="mt-2 text-xs opacity-70">♪ Original Sound</p>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <div className="flex flex-col items-center"><div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl">♡</div><span className="text-xs mt-1">{p.likes}</span></div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">💬</div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">🔖</div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">↗</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
