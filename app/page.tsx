'use client'
import { useState } from 'react'

export default function Page() {
  const [muted, setMuted] = useState(true)

  return (
    <main className="relative w-full h-[100dvh] bg-black overflow-hidden">
      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted={muted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/ryze-video.mp4"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full py-10 text-white text-center">

        <div className="mt-10">
          <h1 className="text-5xl font-black tracking-widest">RYZE</h1>
          <p className="mt-2 text-lg tracking-[0.3em]">SALES • JOBS • MEET PEOPLE</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setMuted(!muted)}
            className="text-sm border border-white/50 px-4 py-1 rounded-full backdrop-blur"
          >
            Tap for Sound {muted? '🔇' : '🔊'}
          </button>

          <button
            onClick={() => window.open('https://wa.me/18622799086?text=Hi%20RYZE%20-%20I%20want%20to%20join%20RYZE', '_blank')}
            className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition"
          >
            Get Started
          </button>

          <p className="text-xs opacity-70">ryzeofficial-app.com</p>
        </div>
      </div>
    </main>
  )
}
