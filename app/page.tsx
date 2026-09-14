'use client'

export default function Page() {
  return (
    <main style={{background:'black', height:'100vh', width:'100vw', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', padding:'60px 20px', textAlign:'center'}}>
      
      <div>
        <h1 style={{color:'white', fontSize:'55px', fontWeight:'900', letterSpacing:'8px', margin:0}}>RYZE</h1>
        <p style={{color:'white', letterSpacing:'6px', fontSize:'18px', marginTop:'10px'}}>SALES • JOBS • MEET PEOPLE</p>
      </div>

      <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'15px'}}>
        <div style={{color:'white', border:'1px solid white', borderRadius:'20px', padding:'6px 18px', fontSize:'14px'}}>
          Tap for Sound 🔊
        </div>

        <a 
          href="https://wa.me/18622799086?text=Hi%20RYZE%20I%20want%20to%20join"
          target="_blank"
          style={{background:'white', color:'black', padding:'18px 60px', borderRadius:'30px', fontWeight:'bold', fontSize:'18px', textDecoration:'none'}}
        >
          Get Started
        </a>

        <p style={{color:'gray', fontSize:'12px'}}>ryzeofficial-app.com</p>
      </div>

    </main>
  )
}
