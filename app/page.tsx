"use client"
import { useRef, useState } from "react"

type Video = { id: number; url: string; likes: number; liked: boolean; saved: boolean; comments: string[] }

export default function Page() {
  const [started, setStarted] = useState(false)
  const [videos, setVideos] = useState<Video[]>([
    { id: 1, url: "/ryze-promo.mp4", likes: 1240, liked: false, saved: false, comments: ["🔥🔥", "Increíble!"] }
  ])
  const [showComments, setShowComments] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleLike = (id: number) => {
    setVideos(v => v.map(x => x.id === id? {...x, liked:!x.liked, likes: x.liked? x.likes - 1 : x.likes + 1 } : x))
  }
  const toggleSave = (id: number) => {
    setVideos(v => v.map(x => x.id === id? {...x, saved:!x.saved } : x))
  }
  const handleShare = async (videoUrl: string) => {
    if (navigator.share) {
      await navigator.share({ title: "RYZE", url: "https://ryzeofficial-app.com" })
    } else {
      await navigator.clipboard.writeText("https://ryzeofficial-app.com")
      alert("Link copiado para compartir en WhatsApp!")
      window.open(`https://wa.me/?text=${encodeURIComponent("Mira este video en RYZE https://ryzeofficial-app.com")}`, "_blank")
    }
  }
  const addComment = (id: number) => {
    if (!newComment.trim()) return
    setVideos(v => v.map(x => x.id === id? {...x, comments: [...x.comments, newComment] } : x))
    setNewComment("")
  }
  const handleUpload = (e: any) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setVideos(v => [{ id: Date.now(), url, likes: 0, liked: false, saved: false, comments: [] },...v])
    alert("¡Video subido! Ya está en tu feed")
  }

  if (!started) {
    return (
      <main style={{ position: "relative", width: "100vw", height: "100vh", background: "black", overflow: "hidden" }}>
        <video ref={videoRef} autoPlay muted={muted} loop playsInline style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}>
          <source src="/ryze-promo.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", bottom: 40, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 15, zIndex: 10 }}>
          <button onClick={() => { if (videoRef.current) { videoRef.current.muted =!videoRef.current.muted; setMuted(videoRef.current.muted) } }} style={{ background: "rgba(0,0,0,0.6)", color: "white", border: "1px solid white", borderRadius: 30, padding: "12px 25px" }}>
            {muted? "Tap for Sound 🔇" : "Sound On 🔊"}
          </button>
          <button onClick={() => setStarted(true)} style={{ background: "white", color: "black", borderRadius: 40, padding: "18px 0", width: "85%", maxWidth: 380, fontWeight: "bold", fontSize: 18 }}>Get Started</button>
          <a href="https://wa.me/18622799086?text=Hola%20RYZE%20quiero%20unirme" style={{ color: "white", fontSize: 13, textDecoration: "underline" }}>Contactar por WhatsApp</a>
        </div>
      </main>
    )
  }

  return (
    <div style={{ background: "black", height: "100vh", overflowY: "scroll", scrollSnapType: "y mandatory" }}>
      {videos.map((vid) => (
        <div key={vid.id} style={{ position: "relative", height: "100vh", width: "100vw", scrollSnapAlign: "start" }}>
          <video autoPlay loop playsInline muted={false} style={{ width: "100%", height: "100%", objectFit: "cover" }} src={vid.url} />

          {/* BOTONES DERECHA - LIKE, COMENTAR, GUARDAR, COMPARTIR */}
          <div style={{ position: "absolute", right: 15, bottom: 120, display: "flex", flexDirection: "column", gap: 25, alignItems: "center" }}>
            <button onClick={() => toggleLike(vid.id)} style={{ background: "none", border: "none", color: "white", fontSize: 28, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 32 }}>{vid.liked? "❤️" : "🤍"}</span>
              <span style={{ fontSize: 12, marginTop: 5 }}>{vid.likes}</span>
            </button>
            <button onClick={() => setShowComments(vid.id)} style={{ background: "none", border: "none", color: "white", fontSize: 28, display: "flex", flexDirection: "column", alignItems: "center" }}>
              💬<span style={{ fontSize: 12, marginTop: 5 }}>{vid.comments.length}</span>
            </button>
            <button onClick={() => toggleSave(vid.id)} style={{ background: "none", border: "none", color: "white", fontSize: 28 }}>
              {vid.saved? "🔖" : "📑"}
            </button>
            <button onClick={() => handleShare(vid.url)} style={{ background: "none", border: "none", color: "white", fontSize: 28 }}>↗️</button>
          </div>

          {/* INFO ABAJO */}
          <div style={{ position: "absolute", bottom: 20, left: 15, color: "white" }}>
            <p style={{ fontWeight: "bold" }}>@ryzeofficial</p>
            <p style={{ fontSize: 14, maxWidth: "70vw" }}>SALES • JOBS • MEET PEOPLE 🔥</p>
          </div>

          {/* INPUT SUBIR VIDEO */}
          <label style={{ position: "absolute", top: 20, right: 15, background: "white", color: "black", padding: "10px 15px", borderRadius: 20, fontWeight: "bold", fontSize: 14, cursor: "pointer" }}>
            + Subir
            <input type="file" accept="video/*" onChange={handleUpload} style={{ display: "none" }} />
          </label>

          {/* COMENTARIOS */}
          {showComments === vid.id && (
            <div style={{ position: "absolute", bottom: 0, width: "100%", background: "rgba(0,0,0,0.9)", padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: "50vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <strong style={{ color: "white" }}>Comentarios ({vid.comments.length})</strong>
                <button onClick={() => setShowComments(null)} style={{ color: "white", background: "none", border: "none" }}>✕</button>
              </div>
              {vid.comments.map((c, i) => <p key={i} style={{ color: "white", padding: "8px 0", borderBottom: "1px solid #333" }}>{c}</p>)}
              <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
                <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Añadir comentario..." style={{ flex: 1, padding: 10, borderRadius: 20, border: "none" }} />
                <button onClick={() => addComment(vid.id)} style={{ background: "white", color: "black", borderRadius: 20, padding: "10px 20px", fontWeight: "bold" }}>Enviar</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
          }
