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
  const [comments, setComments] = useState([{ user: "ana.r", text: "🔥🔥🔥 Ryze es otro nivel" }]);
  const [newComment, setNewComment] = useState("");

  // NUEVO PARA WAITLIST
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitEmail, setWaitEmail] = useState("");
  const [waitIg, setWaitIg] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    fetch("/api/comments").then(r=>r.json()).then(d=>{ if(Array.isArray(d)&&d.length>0) setComments(d) }).catch(()=>{});
    fetch("/api/likes").then(r=>r.json()).then(d=>{ if(d.likes) setLikes(d.likes) }).catch(()=>{});
  }, []);

  function toggleAudio(){ const v=videoRef.current as any; if(!v) return; if(v.muted){ v.muted=false; v.volume=1; v.play(); setMuted(false);} else { v.muted=true; setMuted(true);} }

  async function toggleLike(){
    if(liked){ setLikes(l=>l-1); setLiked(false); await fetch("/api/likes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"unlike"})});}
    else { setLikes(l=>l+1); setLiked(true); await fetch("/api/likes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"like"})});}
  }

  async function handleWaitlist(){
    if(!waitEmail &&!waitIg) return;
    await fetch("/api/waitlist",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:waitEmail, instagram:waitIg})});
    setJoined(true);
    setTimeout(()=>{ setShowWaitlist(false); setJoined(false); setWaitEmail(""); setWaitIg(""); }, 2000);
  }

  function handleShare(){ if(navigator.share){ navigator.share({title:"RYZE",url:"https://www.ryzeofficial-app.com"});} else { navigator.clipboard.writeText("https://www.ryzeofficial-app.com"); alert("Link copiado ✅"); } }
  async function addComment(){ if(!newComment.trim()) return; const t=newComment; setNewComment(""); try{ const res=await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t})}); const s=await res.json(); setComments(p=>[...p,s]); }catch(e){} }

  return (
    <main className="min-h-screen bg-black flex justify-center">
      <div className="relative w-full max-w-[400px] h-[100dvh] bg-black overflow-hidden">
        <video ref={videoRef} autoPlay loop playsInline onClick={toggleAudio} className="absolute inset-0 w-full h-full object-cover"><source src="/ryze-promo.mp4" type="video/mp4" /></video>
        <button onClick={toggleAudio} className="absolute top-4 right-4 bg-black/70 text-white text-xs px-4 py-2 rounded-full z-20">{muted? "🔇 SILENCIADO" : "🔊 CON AUDIO"}</button>

        <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 z-10">
          <button onClick={toggleLike} className="flex flex-col items-center"><div className={liked? "w-12 h-12 rounded-full bg-red-500 flex items-center justify-center" : "w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"}><span className="text-xl">{liked? "❤️" : "🤍"}</span></div><span className="text-white text-xs font-bold mt-1">{likes>=1000?(likes/1000).toFixed(3)+'k':likes}</span></button>
          <button onClick={()=>setShowComments(true)} className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"><span className="text-xl">💬</span></div><span className="text-white text-xs mt-1">{comments.length}</span></button>
          <button onClick={()=>setShowWaitlist(true)} className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"><span className="text-xl">🔖</span></div><span className="text-white text-xs mt-1">Guardar</span></button>
          <button onClick={handleShare} className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center"><span className="text-xl">↗️</span></div><span className="text-white text-xs mt-1">Compartir</span></button>
          <button onClick={()=>setShowWaitlist(true)} className="flex flex-col items-center"><div className="w-12 h-12 rounded-full bg-white border-2 border-white flex items-center justify-center"><span className="text-black text-sm">♫</span></div><span className="text-white text-[10px] mt-1">Usar audio</span></button>
        </div>

        {/* BOTON CENTRAL DE LANZAMIENTO */}
        <button onClick={()=>setShowWaitlist(true)} className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 bg-white text-black font-black text-sm px-8 py-3 rounded-full tracking-widest">
          ÚNETE A RYZE
        </button>

        {showComments && (<div className="absolute inset-0 z-30 flex flex-col justify-end"><div onClick={()=>setShowComments(false)} className="absolute inset-0 bg-black/50"></div><div className="relative bg-[#121212] rounded-t-[20px] h-[60%] flex flex-col p-4"><div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-4"></div><p className="text-white text-center font-bold mb-4">{comments.length} comentarios</p><div className="flex-1 overflow-y-auto space-y-3">{comments.map((c:any,i:number)=>(<div key={i} className="flex gap-2"><span className="text-white font-bold text-sm">@{c.user}</span><span className="text-white/80 text-sm">{c.text}</span></div>))}</div><div className="flex gap-2 mt-3"><input value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder="Añade un comentario..." className="flex-1 bg-white/10 text-white rounded-full px-4 py-2 text-sm outline-none" onKeyDown={e=>e.key==='Enter'&&addComment()} /><button onClick={addComment} className="text-[#fe2c55] font-bold text-sm">Enviar</button></div></div></div>)}

        {/* POPUP WAITLIST */}
        {showWaitlist && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-6">
            <div onClick={()=>setShowWaitlist(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            <div className="relative bg-[#1a1a1a] rounded-[20px] w-full p-6 text-center">
              {!joined? (
                <>
                  <h2 className="text-white font-black text-2xl tracking-widest">RYZE</h2>
                  <p className="text-white/60 text-sm mt-2">Sé el primero en entrar. Deja tu IG o email y te avisamos.</p>
                  <input value={waitIg} onChange={e=>setWaitIg(e.target.value)} placeholder="@tu instagram" className="w-full bg-white/10 text-white rounded-full px-4 py-3 text-sm outline-none mt-5" />
                  <input value={waitEmail} onChange={e=>setWaitEmail(e.target.value)} placeholder="tu email (opcional)" className="w-full bg-white/10 text-white rounded-full px-4 py-3 text-sm outline-none mt-3" />
                  <button onClick={handleWaitlist} className="w-full bg-white text-black font-black py-3 rounded-full mt-5">QUIERO ENTRAR 🚀</button>
                  <button onClick={()=>setShowWaitlist(false)} className="text-white/40 text-xs mt-3">Ahora no</button>
                </>
              ) : (
                <>
                  <div className="text-5xl">🔥</div>
                  <h2 className="text-white font-black text-xl mt-3">¡Estás dentro!</h2>
                  <p className="text-white/60 text-sm mt-1">Te avisamos en cuanto RYZE esté listo.</p>
                </>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none"><p className="text-white font-bold text-sm">@ryzeofficial</p><h1 className="text-white text-center text-xl font-bold tracking-[0.6em] mt-3 opacity-30">RYZE</h1></div>
      </div>
    </main>
  );
}
