"use client";
import { useRef, useState } from "react";

export default function Page() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(12500);

  function toggleAudio() {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      v.muted = false;
      v.volume = 1;
      v.play();
      setMuted(false);
    } else {
      v.muted = true;
      setMuted(true);
    }
  }

  function toggleLike() {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  }

  return (
    <main className="min-h-screen bg-black flex justify-center">
      <div className="relative w-full max-w-[400px] h-[100dvh] bg-black overflow-hidden">
        <video ref={videoRef} autoPlay loop playsInline onClick={toggleAudio} className="absolute inset-0 w-full h-full object-cover">
          <source src="/ryze-promo.mp4" type="video/mp4" />
        </video>

        <button onClick={toggleAudio} className="absolute top-4 right-4 bg-black/70 text-white text-xs px-4 py-2 rounded-full">
          {muted? "SILENCIADO" : "CON AUDIO"}
        </button>

        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-6 z-10">
          <button onClick={toggleLike} className="flex flex-col items-center">
            <div className={liked? "w-12 h-12 rounded-full bg-red-500 flex items-center justify-center" : "w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"}>
              <span className="text-xl">{liked? "❤️" : "🤍"}</span>
            </div>
            <span className="text-white text-xs font-bold mt-1">{likes/1000}k</span>
          </button>

          <button onClick={() => alert("Comentarios pronto")} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-xl">💬</span>
            </div>
            <span className="text-white text-xs mt-1">348</span>
          </button>

          <button onClick={() => setSaved(!saved)} className="flex flex-col items-center">
            <div className={saved? "w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center" : "w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"}>
              <span className="text-xl">{saved? "🔖" : "📑"}</span>
            </div>
            <span className="text-white text-xs mt-1">{saved? "Guardado" : "Guardar"}</span>
          </button>

          <button onClick={() => { navigator.clipboard.writeText("https://www.ryzeofficial-app.com"); alert("Link copiado"); }} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-xl">↗️</span>
            </div>
            <span className="text-white text-xs mt-1">Compartir</span>
          </button>

          <button onClick={() => alert("Usar este audio")} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
              <span className="text-white text-sm">♫</span>
            </div>
            <span className="text-white text-[10px] mt-1">Usar audio</span>
          </button>
        </div>

        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
          <p className="text-white font-bold text-sm">@ryzeofficial</p>
          <p className="text-white/80 text-xs mt-1">Bienvenido a Ryze</p>
          <h1 className="text-white text-center text-xl font-bold tracking-[0.6em] mt-4">RYZE</h1>
        </div>
      </div>
    </main>
  );
              }
