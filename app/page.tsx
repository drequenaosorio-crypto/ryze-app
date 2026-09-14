"use client"
import { useRef, useState } from "react"

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  const handleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
      videoRef.current.play()
    }
  }

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", background: "black", overflow: "hidden" }}>
      {/* VIDEO OFICIAL CON SONIDO */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src="/ryze-promo.mp4" type="video/mp4" />
      </video>

      {/* BOTONES */}
      <div style={{ position: "absolute", bottom: "40px", left: 0, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", zIndex: 10 }}>
        
        <button
          onClick={handleSound}
          style={{ background: "rgba(0,0,0,0.6)", color: "white", border: "1px solid rgba(255,255,255,0.6)", borderRadius: "30px", padding: "12px 25px", fontSize: "16px" }}
        >
          {isMuted ? "Tap for Sound 🔇" : "Sound On 🔊"}
        </button>

        <a
          href="https://wa.me/18622799086?text=Hola%20RYZE%20quiero%20unirme%20a%20la%20app"
          target="_blank"
          style={{ background: "white", color: "black", borderRadius: "40px", padding: "18px 0", width: "85%", maxWidth: "380px", fontWeight: "bold", fontSize: "18px", textAlign: "center", textDecoration: "none" }}
        >
          Get Started
        </a>

      </div>
    </main>
  )
}
