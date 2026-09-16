export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return (
    <div style={{padding:'40px', background:'black', color:'white', minHeight:'100vh', fontFamily:'sans-serif'}}>
      <h1 style={{fontSize:'24px', fontWeight:'bold'}}>✅ RYZE - ADMIN FUNCIONANDO</h1>
      <p style={{marginTop:'20px', color:'#aaa'}}>Tu web ya no se cae. Ahora solo falta conectar la base de datos.</p>
      <div style={{marginTop:'30px', padding:'20px', border:'1px solid #333', borderRadius:'10px'}}>
        <p><b>Paso final:</b> Ve a Vercel → Settings → Environment Variables y agrega:</p>
        <code style={{display:'block', marginTop:'10px', background:'#111', padding:'10px'}}>
          UPSTASH_REDIS_REST_URL<br/>
          UPSTASH_REDIS_REST_TOKEN
        </code>
      </div>
    </div>
  )
}
