"use client";
import { useState, useRef } from "react";

export default function Page() {
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted =!videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <main className="min-h-screen bg-black flex justify-center items-center">
      <div className="relative w-full max-w-[400px] h-[100dvh] bg-black overflow-hidden">
        {/* VIDEO */}
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          loop
          playsInline
          onClick={toggleAudio}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/ryze-promo.mp4" type="video/mp4" />
        </video>

        {/* Toca para audio */}
        {muted && (
          <button onClick={toggleAudio} className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
            <span>🔊</span> Toca para activar audio
          </button>
        )}

        {/* BOTONES DERECHA - 5 ICONOS */}
        <div className="absolute right-2 bottom-24 flex flex-col items-center gap-6">
          {/* LIKE */}
          <button onClick={() => setLiked(!liked)} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center ${liked? 'bg-red-500/20' : ''}`}>
              <svg className={`w-7 h-7 ${liked? 'fill-red-500 text-red-500' : 'text-white'}`} fill={liked? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-white text-xs mt-1 font-semibold">12.5k</span>
          </button>

          {/* COMENTAR */}
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-white text-xs mt-1 font-semibold">348</span>
          </button>

          {/* GUARDAR */}
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <span className="text-white text-xs mt-1 font-semibold">Guardar</span>
          </button>

          {/* COMPARTIR */}
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <span className="text-white text-xs mt-1 font-semibold">Compartir</span>
          </button>

          {/* USAR AUDIO */}
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-2 border-white">
              <svg className="w-6 h-6 text-white animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l4-2v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3.895 3 2zm7-10c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3.895 3 2z" />
              </svg>
            </div>
            <span className="text-white text-[10px] mt-1 font-semibold">Usa audio</span>
          </button>
        </div>

        {/* BOTTOM INFO */}
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
          <p className="text-white font-semibold">@ryzeofficial</p>
          <p className="text-white/80 text-sm mt-1">La red donde tu reputación vale más que tu currículum 🚀 #Ryze</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-white/60 text-xs">♫</span>
            <p className="text-white text-xs">Audio original - Ryze Official</p>
          </div>
          <h1 className="text-white text-center text-xl font-bold tracking-[0.5em] mt-4">RYZE</h1>
        </div>
      </div>
    </main>
  );
}
