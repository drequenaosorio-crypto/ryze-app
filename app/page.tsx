"use client";
import { useState, useRef } from "react";

export default function Page() {
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(12500);
  const videoRef = useRef(null);

  function toggleAudio() {
    const v = videoRef.current;
    if (v) {
      v.muted =!v.muted;
      setMuted(v.muted);
    }
  }

  function handleLike() {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  }

  async function handleShare() {
    const url = "https://www.ryzeofficial-app.com";
    try {
      if (navigator.share) {
        await navigator.share({ title: "RYZE", text: "Mira esto en Ryze", url: url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copiado: " + url);
      }
    } catch (e) {}
  }

  return (
    <main className="min-h-screen bg-black flex justify-center items-center">
      <div className="relative w-full max-w-[400px] h-[100dvh] bg-black overflow-hidden">
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

        {muted && (
          <button onClick={toggleAudio} className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
            Toca para audio
          </button>
        )}

        <div className="absolute right-2 bottom-28 flex flex-col items-center gap-5">
          <button onClick={handleLike} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${liked? 'bg-red-500' : 'bg-white/15'}`}>
              <span className="text-xl text-white">{liked? '❤️' : '🤍'}</span>
            </div>
            <span className="text-white text-xs mt-1 font-bold">{(likes/1000).toFixed(1)}k</span>
          </button>

          <button onClick={() => setShowComments(true)} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
              <span className="text-xl">💬</span>
            </div>
            <span className="text-white text-xs mt-1">348</span>
          </button>

          <button onClick={() => setSaved(!saved)} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${saved? 'bg-yellow-400' : 'bg-white/15'}`}>
              <span className="text-xl">{saved? '🔖' : '📑'}</span>
            </div>
            <span className="text-white text-xs mt-1">{saved? 'Guardado' : 'Guardar'}</span>
          </button>

          <button onClick={handleShare} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
              <span className="text-xl">↗️</span>
            </div>
            <span className="text-white text-xs mt-1">Compartir</span>
          </button>

          <button onClick={() => alert('Audio original de RYZE guardado')} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
              <span className="text-white">♫</span>
            </div>
            <span className="text-white text-[10px] mt-1">Usar audio</span>
          </button>
        </div>

        {showComments && (
          <div className="absolute inset-0 bg-black/60 z-20 flex items-end">
            <div className="w-full bg-zinc-900 rounded-t-[24px] p-4 h-[55%]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white font-bold">348 comentarios</h3>
                <button onClick={() => setShowComments(false)} className="text-white text-xl">X</button>
              </div>
              <p className="text-sm text-white/80">@carlaemprende - 3 errores que cometi...</p>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
          <p className="text-white font-bold">@ryzeofficial</p>
          <h1 className="text-white text-center text-xl font-bold tracking-[0.5em] mt-3">RYZE</h1>
        </div>
      </div>
    </main>
  );
}
