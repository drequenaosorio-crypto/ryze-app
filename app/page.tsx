// @ts-nocheck
"use client";
import { useRef, useState, useEffect } from "react";

export default function Page() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(12501);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    { user: "ana.r", text: "🔥🔥🔥 Ryze es otro nivel" },
    { user: "carlos_23", text: "¿Cuando sale la app?" },
    { user: "maria_v", text: "Necesito ese audio 😍" },
  ]);
  const [newComment, setNewComment] = useState("");

  // ESTO ES NUEVO: carga los comentarios guardados
  useEffect(() => {
    fetch("/api/comments")
     .then(r => r.json())
     .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setComments(data);
        }
      })
     .catch(() => {});
  }, []);

  function toggleAudio() {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) { v.muted = false; v.volume = 1; v.play(); setMuted(false); }
    else { v.muted = true; setMuted(true); }
  }
  function toggleLike() {
    if (liked) { setLikes(likes - 1); setLiked(false); }
    else { setLikes(likes + 1); setLiked(true); }
  }
  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: "RYZE", url: "https://www.ryzeofficial-app.com" });
    } else {
      navigator.clipboard.writeText("https://www.ryzeofficial-app.com");
      alert("Link copiado ✅");
    }
  }

  // ESTO ES NUEVO: ahora guarda en la base de datos
  async function addComment() {
    if (!newComment.trim()) return;
    const texto = newComment;
    setNewComment("");

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: texto }),
      });
      const saved = await res.json();
      setComments((prev) => [...prev, saved]);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="min-h-screen bg-black flex justify-center">
      <div className="relative w-full max-w-[400px] h-[100dvh] bg-black overflow-hidden">
        <video ref={videoRef} autoPlay loop playsInline onClick={toggleAudio} className="absolute inset-0 w-full h-full object-cover">
          <source src="/ryze-promo.mp4" type="video/mp4" />
        </video>

        <button onClick={toggleAudio} className="absolute top-4 right-4 bg-black/70 text-white text-xs px-4 py-2 rounded-full z-20">
          {muted? "🔇 SILENCIADO" : "🔊 CON AUDIO"}
        </button>

        <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 z-10">
          <button onClick={toggleLike} className="flex flex-col items-center">
            <div className={liked? "w-12 h-12 rounded-full bg-red-500 flex items-center justify-center" : "w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"}> <span className="text-xl">{liked? "❤️" : "🤍"}</span> </div>
            <span className="text-white text-xs font-bold mt-1">{(likes/1000).toFixed(3)}k</span>
          </button>
          <button onClick={() => setShowComments(true)} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"><span className="text-xl">💬</span></div>
            <span className="text-white text-xs mt-1">{comments.length}</span>
          </button>
          <button onClick={() => setSaved(!saved)} className="flex flex-col items-center">
            <div className={saved? "w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center" : "w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"}><span className="text-xl">{saved? "🔖" : "📑"}</span></div>
            <span className="text-white text-xs mt-1">{saved? "Guardado" : "Guardar"}</span>
          </button>
          <button onClick={handleShare} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"><span className="text-xl">↗️</span></div>
            <span className="text-white text-xs mt-1">Compartir</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white flex items-center justify-center"><span className="text-white text-sm">♫</span></div>
            <span className="text-white text-[10px] mt-1">Usar audio</span>
          </button>
        </div>

        {showComments && (
          <div className="absolute inset-0 z-30 flex-col justify-end">
            <div onClick={() => setShowComments(false)} className="absolute inset-0 bg-black/50"></div>
            <div className="relative bg-[#121212] rounded-t-[20px] h-[60%] flex flex-col p-4">
              <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-4"></div>
              <p className="text-white text-center font-bold mb-4">{comments.length} comentarios</p>
              <div className="flex-1 overflow-y-auto space-y-3">
                {comments.map((c,i) => (
                  <div key={i} className="flex gap-2"><span className="text-white font-bold text-sm">@{c.user}</span><span className="text-white/80 text-sm">{c.text}</span></div>
                ))}
              </div>
              <div className="flex gap-2 mt-3">
                <input value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder="Añade un comentario..." className="flex-1 bg-white/10 text-white rounded-full px-4 py-2 text-sm outline-none" onKeyDown={e=> e.key === 'Enter' && addComment()} />
                <button onClick={addComment} className="text-[#fe2c55] font-bold text-sm">Enviar</button>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none">
          <p className="text-white font-bold text-sm">@ryzeofficial</p>
          <h1 className="text-white text-center text-xl font-bold tracking-[0.6em] mt-3">RYZE</h1>
        </div>
      </div>
    </main>
  );
}
