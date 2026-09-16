import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export default async function AdminPage() {
  const list = (await redis.lrange('waitlist', 0, -1)) || []
  
  const founders = [
    { email: 'drequenaosorio@gmail.com', ig: 'david_ro_16' },
    ...list.map((e:any) => JSON.parse(e))
  ]

  return (
    <main style={{ background: 'black', color: 'white', minHeight: '100vh', padding: '30px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '30px', fontWeight: '900' }}>Panel Admin - {founders.length} miembros</h1>
      <p style={{ color: '#888' }}>Solo tú puedes ver esto: ryzeofficial-app.com/admin</p>
      
      <div style={{ marginTop: '30px', background: '#111', border: '1px solid #222', borderRadius: '12px', overflow: 'hidden' }}>
        {founders.map((f:any, i:number) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #222' }}>
            <span>#{i+1} {f.email}</span>
            <span style={{ color: '#888' }}>@{f.ig || 'sin-ig'}</span>
          </div>
        ))}
      </div>
    </main>
  )
}
