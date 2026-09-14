"use client"
import { useState } from "react"
import { Heart, MessageCircle, Bookmark, Share2, Music2 } from "lucide-react"

const pitches = [
  { id: 1, user: "drequenaosorio", song: "Mi primer pitch 🔥", likes: 124, audio: "Original Sound" },
  { id: 2, user: "ryze_user", song: "Beat que rompe", likes: 89, audio: "Trap Beat" },
  { id: 3, user: "producer_x", song: "Nuevo drop", likes: 210, audio: "Reggaeton Type" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-[430px] p-4 flex justify-between items-center border-b border-zinc-800 sticky top-0 bg-black z-10">
        <h1 className="text-2xl font-black tracking-tighter">RYZE</h1>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>

      {/* Feed */}
      <div className="w-full max-w-[430px]">
        {pitches.map((pitch) => (
          <div key={pitch.id} className="w-full h-[85vh] relative border-b border-zinc-800 flex flex-col justify-end p-4 bg-zinc-900 mb-1">
            {/* Contenido del pitch */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-black opacity-50"></div>

            <div className="relative z-10 flex justify-between items-end">
              <div>
                <p className="font-bold">@{pitch.user}</p>
                <p className="text-sm mt-1">{pitch.song}</p>
                <div className="flex items-center gap-2 mt-3 text-sm">
                  <Music2 size={14} />
                  <span>{pitch.audio}</span>
                </div>
              </div>

              {/* Botones derecha */}
              <div className="flex flex-col gap-6 items-center">
                <button className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center"><Heart /></div>
                  <span className="text-xs">{pitch.likes}</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center"><MessageCircle /></div>
                  <span className="text-xs">12</span>
                </button>
                <button className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center"><Bookmark /></button>
                <button className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center"><Share2 /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
