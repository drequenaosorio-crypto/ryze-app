"use client"
import { useState } from 'react'

export default function Admin() {
  const [key, setKey] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    const res = await fetch(`/api/waitlist?key=${key}`)
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  const downloadCSV = () => {
    if (!data?.emails) return
    const csv = "email\n" + data.emails.join("\n")
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ryze-waitlist-${data.count}.csv`
    a.click()
  }

  return (
    <div style={{background:'#000', color:'#fff', minHeight:'100vh', padding:'40px', fontFamily:'Arial'}}>
      <h1 style={{color:'#a3ff12'}}>RYZE ADMIN</h1>
      <p>Total: {data?.count ?? 0} emails</p>
      
      {!data?.emails ? (
        <div style={{marginTop:20}}>
          <input 
            type="password" 
            placeholder="Clave admin" 
            value={key} 
            onChange={e=>setKey(e.target.value)}
            style={{padding:'12px', background:'#222', color:'#fff', border:'1px solid #444', borderRadius:'8px'}}
          />
          <button onClick={load} style={{marginLeft:10, padding:'12px 20px', background:'#a3ff12', color:'#000', border:'none', borderRadius:'8px', fontWeight:'bold'}}>
            {loading ? 'Cargando...' : 'Ver lista'}
          </button>
        </div>
      ) : (
        <>
          <button onClick={downloadCSV} style={{margin:'20px 0', padding:'12px 20px', background:'#a3ff12', color:'#000', border:'none', borderRadius:'8px', fontWeight:'bold', cursor:'pointer'}}>
            Descargar Excel ({data.count})
          </button>
          <div style={{background:'#111', padding:'20px', borderRadius:'10px', maxHeight:'60vh', overflow:'auto'}}>
            {data.emails.map((email:string) => (
              <div key={email} style={{padding:'8px 0', borderBottom:'1px solid #222'}}>{email}</div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
