"use client"
import { useRef, useState } from "react"
export default function Page(){
const v=useRef<HTMLVideoElement>(null)
const [m,setM]=useState(true)
const sound=()=>{if(v.current){v.current.muted=!v.current.muted;setM(v.current.muted);v.current.play()}}
return(
<main style={{position:"relative",width:"100vw",height:"100vh",background:"black",overflow:"hidden"}}>
<video ref={v} autoPlay muted loop playsInline style={{position:"absolute",width:"100%",height:"100%",objectFit:"cover"}}><source src="/ryze-promo.mp4" type="video/mp4"/></video>
<div style={{position:"absolute",bottom:40,width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:15,zIndex:10}}>
<button onClick={sound} style={{background:"rgba(0,0,0,0.6)",color:"white",border:"1px solid rgba(255,255,255,0.6)",borderRadius:"30px",padding:"12px 25px",fontSize:"16px"}}>{m?"Tap for Sound 🔇":"Sound On 🔊"}</button>
<a href="https://wa.me/18622799086?text=Hola%20RYZE%20quiero%20unirme%20a%20la%20app" target="_blank" style={{background:"white",color:"black",borderRadius:"40px",padding:"18px 0",width:"85%",maxWidth:"380px",fontWeight:"bold",fontSize:"18px",textAlign:"center",textDecoration:"none"}}>Get Started</a>
</div>
</main>
)
}
