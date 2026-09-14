"use client"
import { useRef, useState } from "react"

export default function Page() {
  const [started, setStarted] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(1247)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(["🔥 Este app está dura", "RYZE SALES JOBS MEET PEOPLE"])
  const [newComment, setNewComment] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleLike = () => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1) }

  return (
    <>
      {!started ? (
        // LANDING - ANTES DE ENTRAR
        <main style={{ position: "relative", width: "100vw", height: "100vh", background: "black", overflow: "hidden" }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={muted}
            playsInline
            preload="auto"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", background: "black" }}
            onError={() => alert("ERROR: No se encontró /ryze-promo.mp4 en tu carpeta public. Renombra tu video a ryze-promo.mp4")}
          >
            <source src="/ryze-promo.mp4" type="video/mp4" />
          </video>

          <div style={{ position: "absolute", bottom: 30, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 15, zIndex: 10 }}>
            <button
              onClick={() => { if (videoRef.current) { videoRef.current.muted = !videoRef.current.muted; setMuted(videoRef.current.muted); videoRef.current.play() } }}
              style={{ background: "rgba(0,0,0,0.6)", color: "white", border: "1px solid rgba(255,255,255,0.7)", borderRadius: 30, padding: "12px 28px", fontSize: 16 }}
            >
              {muted ? "Tap for Sound 🔇" : "Sound On 🔊"}
            </button>
            <button onClick={() => setStarted(true)} style={{ background: "white", color: "black", border: "none", borderRadius: 40, padding: "18px 0", width: "85%", maxWidth: 380, fontWeight: "bold", fontSize: 18 }}>
              Get Started
            </button>
          </div>
        </main>
      ) : (
        // FEED TIPO TIKTOK CON LOS 5 ICONOS
        <div style={{ position: "relative", width: "100vw", height: "100vh", background: "black", overflow: "hidden" }}>
          <video autoPlay loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} src="/ryze-promo.mp4" />

          {/* 5 ICONOS A LA DERECHA */}
          <div style={{ position: "absolute", right: 10, bottom: 110, display: "flex", flexDirection: "column", gap: 20, alignItems: "center", zIndex: 20 }}>

            {/* 1 - LIKE */}
            <button onClick={toggleLike} style={{ background: "transparent", border: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{liked ? "❤️" : "🤍"}</div>
              <span style={{ color: "white", fontSize: 12, fontWeight: "bold", marginTop: 4 }}>{likes}</span>
            </button>

            {/* 2 - COMENTARIO */}
            <button onClick={() => setShowComments(true)} style={{ background: "transparent", border: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>💬</div>
              <span style={{ color: "white", fontSize: 12, fontWeight: "bold", marginTop: 4 }}>{comments.length}</span>
            </button>

            {/* 3 - GUARDAR */}
            <button onClick={() => setSaved(!saved)} style={{ background: "transparent", border: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{saved ? "🔖" : "📑"}</div>
              <span style={{ color: "white", fontSize: 12, fontWeight: "bold", marginTop: 4 }}>Guardar</span>
            </button>

            {/* 4 - COMPARTIR */}
            <button onClick={() => window.open(`https://wa.me/?text=Mira este video en RYZE https://ryzeofficial-app.com`, "_blank")} style={{ background: "transparent", border: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>↗️</div>
              <span style={{ color: "white", fontSize: 12, fontWeight: "bold", marginTop: 4 }}>Compartir</span>
            </button>

            {/* 5 - MUSICA */}
            <button style={{ background: "transparent", border: "none", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, animation: "spin 3s linear infinite" }}>💿</div>
            </button>
          </div>

          {/* INFO DE MUSICA ABAJO */}
          <div style={{ position: "absolute", bottom: 25, left: 15, right: 80, color: "white", zIndex: 10 }}>
            <p style={{ fontWeight: "bold", margin: 0, fontSize: 15 }}>@ryzeofficial</p>
            <p style={{ margin: "5px 0", fontSize: 13, opacity: 0.9 }}>SALES • JOBS • MEET PEOPLE 🚀</p>
            <p style={{ margin: 0, fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>🎵 <marquee style={{ maxWidth: 180 }}>Sonido original - RYZE Official • SALES JOBS MEET PEOPLE</marquee></p>
          </div>

          {/* COMENTARIOS */}
          {showComments && (
            <div style={{ position: "absolute", bottom: 0, width: "100%", background: "#121212", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, zIndex: 30, maxHeight: "60vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "white", marginBottom: 15 }}><b>{comments.length} comentarios</b><button onClick={() => setShowComments(false)} style={{ background: "none", border: "none", color: "white", fontSize: 20 }}>✕</button></div>
              {comments.map((c, i) => <p key={i} style={{ color: "white", padding: "10px 0", borderBottom: "1px solid #333", margin: 0 }}>{c}</p>)}
              <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
                <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Añade un comentario..." style={{ flex: 1, padding: 12, borderRadius: 25, border: "none", background: "#333", color: "white" }} />
                <button onClick={() => { if (newComment.trim()) { setComments([...comments, newComment]); setNewComment("") } }} style={{ background: "white", color: "black", border: "none", borderRadius: 25, padding: "10px 18px", fontWeight: "bold" }}>Enviar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
