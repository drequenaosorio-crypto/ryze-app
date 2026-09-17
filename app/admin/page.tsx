"use client"
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState("")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    const res = await fetch('/api/admin')
    const json = await res.json()
    setData(json)
  }

  useEffect(() => { if(auth) loadData() }, [auth])

  const handleLogin = () => {
    if(pass === "RYZE2025") setAuth(true)
    else alert("Clave incorrecta")
  }

  const handleClean = async () => {
    const confirm = prompt("⚠️ ESTO BORRARÁ TODOS LOS EMAILS PARA SIEMPRE\n\nEscribe BORRAR para confirmar:")
    if(confirm!== "BORRAR") return

    setLoading(true)
    const res = await fetch('/api/clean')
    const json = await res.json()
    alert(json.msg)
    await loadData()
    setLoading(false)
  }

  if(!auth) {
    return (
      <div style={{background:'red', minHeight:'100vh', padding:'40px', color:'yellow'}}>
        <h1>RYZE ADMIN</h1>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Clave" style={{padding:'10px'}}/>
        <button onClick={handleLogin} style={{padding:'10px', marginLeft:'10px'}}>Entrar</button>
      </div>
    )
  }

  return (
    <div style={{background:'red', minHeight:'100vh', padding:'40px', color:'white'}}>
      <h1 style={{color:'yellow'}}>RYZE ADMIN</h1>
      <h2>Total: {data?.total || 0} emails</h2>

      <div style={{display:'flex', gap:'15px', marginTop:'20px'}}>
        <button style={{background:'#a3ff00', color:'red', padding:'15px 25px', fontWeight:'bold', border:'none', borderRadius:'10px'}}>
          Descargar Excel ({data?.total || 0})
        </button>

        <button
          onClick={handleClean}
          disabled={loading}
          style={{background:'black', color:'red', padding:'15px 25px', fontWeight:'bold', border:'2px solid red', borderRadius:'10px', cursor:'pointer'}}
        >
          {loading? 'Borrando...' : '🗑️ BORRAR TODO'}
        </button>
      </div>

      <div style={{marginTop:'30px'}}>
        {data?.leaderboard?.map((u:any, i:number)=>(
          <div key={i} style={{background:'rgba(0,0,0,0.3)', padding:'10px', marginBottom:'5px'}}>
            {i+1}. {u.email} - {u.count} referidos
          </div>
        ))}
      </div>
    </div>
  )
}
