"use client"
import { useRef, useState } from "react"

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleSound = () => {
    if(videoRef.current){
      videoRef.current.muted = !videoRef.current.muted
      setMuted(videoRef.current.muted)
    }
  }

  return (
    <div style={{position:"relative", height:"100vh", background:"black", overflow:"hidden"}}>
      <video ref={videoRef} autoPlay muted loop playsInline style={{position:"absolute", width:"100%", height:"100%", objectFit:"cover"}}>
        <source src="/ryze-promo.mp4" type="video/mp4" />
      </video>
      
      <div style={{position:"relative", zIndex:2, height:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"50px 20px"}}>
        <div style={{marginTop:"10%"}}></div>
        
        <div style={{width:"100%", display:"flex", flexDirection:"column", alignItems:"center", gap:"15px"}}>
          <button onClick={toggleSound} style={{border:"1px solid rgba(255,255,255,0.5)", borderRadius:"30px", padding:"12px 25px", background:"rgba(0,0,0,0.6)", color:"white", backdropFilter:"blur(10px)"}}>
            {muted ? "Tap for Sound 🔇" : "Sound On 🔊"}
          </button>
          
          <a href="https://wa.me/18622799086?text=Hola%20RYZE%20quiero%20unirme" 
             style={{background:"white", color:"black", borderRadius:"40px", padding:"18px 0", width:"90%", maxWidth:"380px", fontWeight:"bold", fontSize:"18px", textAlign:"center", textDecoration:"none", display:"block"}}>
            Get Started
          </a>
        </div>
      </div>
    </div>
  )
}
