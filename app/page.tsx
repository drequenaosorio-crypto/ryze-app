"use client"
import { useRef, useState } from "react"

export default function Page() {
  const [started, setStarted] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likes, setLikes] = useState(1240)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<string[]>(["🔥🔥🔥","Me encanta RYZE!"])
  const [newComment, setNewComment] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  // Verifica que el video exista
  const videoUrl = "/ryze-promo.mp4"

  const handleLike = () => { setLiked(!liked); setLikes(liked? likes-1 : likes+1) }
  const handleSave = () => setSaved(!saved)
  const handleShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent("Mira RYZE - SALES JOBS MEET PEOPLE https://ryzeofficial-app.com")}`,"_blank")
  }
  const handleUpload = (e: any) => {
    const file = e.target.files?.[0]
    if(file){ alert("Video seleccionado: "+file.name+" - Ya puedes subirlo a Supabase en el siguiente paso") }
  }

  if(!started){
    return(
      <main style={{position:"relative",width:"100vw",height:"100vh",background:"black",overflow:"hidden"}}>
        <video ref={videoRef} autoPlay muted={muted} loop playsInline preload="auto" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover"}}>
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div style={{position:"absolute",bottom:40,left:0,width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:15,zIndex:10}}>
          <button onClick={()=>{ if(videoRef.current){ videoRef.current.muted=!videoRef.current.muted; setMuted(videoRef.current.muted); videoRef.current.play() } }} style={{background:"rgba(0,0,0,0.6)",color:"white",border:"1px solid white",borderRadius:30,padding:"12px 25px"}}>{muted?"Tap for Sound 🔇":"Sound On 🔊"}</button>
          <button onClick={()=>setStarted(true)} style={{background:"white",color:"black",borderRadius:40,padding:"18px 0",width:"85%",maxWidth:380,fontWeight:"bold",fontSize:18}}>Get Started</button>
        </div>
      </main>
    )
  }

  return(
    <div style={{position:"relative",width:"100vw",height:"100vh",background:"black",overflow:"hidden"}}>
      <video autoPlay loop playsInline style={{width:"100%",height:"100%",objectFit:"cover"}} src={videoUrl} />

      {/* BOTONES DERECHA - ESTO ES LO QUE TE FALTA */}
      <div style={{position:"absolute",right:12,bottom:100,display:"flex",flexDirection:"column",gap:22,zIndex:20}}>
        <button onClick={handleLike} style={{background:"rgba(0,0,0,0.4)",borderRadius:50,width:55,height:55,border:"none",fontSize:26,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <span>{liked?"❤️":"🤍"}</span>
          <span style={{fontSize:11,color:"white"}}>{likes}</span>
        </button>
        <button onClick={()=>setShowComments(true)} style={{background:"rgba(0,0,0,0.4)",borderRadius:50,width:55,height:55,border:"none",fontSize:26,color:"white"}}>💬<div style={{fontSize:11}}>{comments.length}</div></button>
        <button onClick={handleSave} style={{background:"rgba(0,0,0,0.4)",borderRadius:50,width:55,height:55,border:"none",fontSize:26}}>{saved?"🔖":"📑"}</button>
        <button onClick={handleShare} style={{background:"rgba(0,0,0,0.4)",borderRadius:50,width:55,height:55,border:"none",fontSize:26,color:"white"}}>↗️</button>
        <label style={{background:"white",borderRadius:50,width:55,height:55,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,cursor:"pointer"}}>+
          <input type="file" accept="video/*" onChange={handleUpload} style={{display:"none"}} />
        </label>
      </div>

      <div style={{position:"absolute",left:15,bottom:25,color:"white",zIndex:20}}>
        <p style={{fontWeight:"bold"}}>@ryzeofficial</p>
        <p style={{fontSize:13}}>SALES • JOBS • MEET PEOPLE</p>
      </div>

      {showComments && (
        <div style={{position:"absolute",bottom:0,width:"100%",background:"rgba(15,15,15,0.95)",borderTopLeftRadius:20,borderTopRightRadius:20,padding:20,zIndex:30}}>
          <div style={{display:"flex",justifyContent:"space-between",color:"white",marginBottom:10}}><b>Comentarios</b><button onClick={()=>setShowComments(false)} style={{background:"none",border:"none",color:"white"}}>✕</button></div>
          {comments.map((c,i)=><p key={i} style={{color:"white",padding:"8px 0",borderBottom:"1px solid #222"}}>{c}</p>)}
          <div style={{display:"flex",gap:10,marginTop:12}}><input value={newComment} onChange={e=>setNewComment(e.target.value)} placeholder="Comenta..." style={{flex:1,padding:12,borderRadius:20,border:"none"}}/><button onClick={()=>{ if(newComment.trim()){ setComments([...comments,newComment]); setNewComment("") } }} style={{background:"white",color:"black",borderRadius:20,padding:"10px 18px",fontWeight:"bold"}}>Enviar</button></div>
        </div>
      )}
    </div>
  )
}
