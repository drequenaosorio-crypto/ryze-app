"use client"
import { useEffect, useRef } from "react"

const pitches = [
  { user: "drequenaosorio", caption: "Mi primer pitch 🔥", likes: 124, video: "https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-1564/1080p.mp4" },
  { user: "ryze_official", caption: "Flow en la noche", likes: 89, video: "https://cdn.coverr.co/videos/coverr-a-man-walking-in-the-city-at-night-1570/1080p.mp4" },
]

export default function Home() {
  const refs = useRef<(HTMLVideoElement | null)[]>([])
  useEffect(() => {
    const obs = new IntersectionObserver((e) => {
      e.forEach(entry => {
        const v = entry.target as HTMLVideoElement
        if(entry.isIntersecting) v.play().catch(()=>{})
        else v.pause()
      })
    }, { threshold: 0.7 })
    refs.current.forEach(v => v && obs.observe(v))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="h-screen bg-black text-white overflow-y-scroll snap-y snap-mandatory">
      <div className="sticky top-0 z-20 bg-black/90 p-4 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter">RYZE</h1>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>
      {pitches.map((p,i) => (
        <div key={i} className="relative h-[calc(100vh-64px)] snap-start">
          <video ref={el => { refs.current[i] = el }} src={p.video} loop muted playsInline autoPlay className="w-full h-full object-cover" />
          <div className="absolute bottom-0 w-full p-4 flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent">
            <div><p className="font-bold">@{p.user}</p><p className="text-sm">{p.caption}</p></div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">♡ {p.likes}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
