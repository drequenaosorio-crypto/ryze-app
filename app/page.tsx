'use client';
import { useState } from 'react';

export default function Home(){
  const [email, setEmail] = useState('');
  const [count, setCount] = useState(2);

  const unirme = async () => {
    if(!email.includes('@')) return alert('Pon un email válido');
    try{ await fetch('/api/join',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email})}); }catch(e){}
    // ESTA LINEA ES LA QUE TE FALTABA - TE LLEVA A LA PAGINA DE TU LINK
    window.location.href = `/gracias?email=${encodeURIComponent(email)}`;
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-7xl font-black tracking-widest mb-8">RYZE</h1>
      <p className="text-xl mb-2">Únete a la lista de espera</p>
      <p className="text-white/40 text-sm mb-8">{count} personas ya se unieron</p>
      <div className="flex gap-2 w-full max-w-[400px]">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Tu email" className="flex-1 bg-white text-black rounded-2xl px-6 py-4 outline-none" />
        <button onClick={unirme} className="bg-white text-black font-bold rounded-2xl px-8 py-4">Unirme</button>
      </div>
      <div className="mt-16 border border-yellow-500/50 rounded-[24px] p-6 w-full max-w-[400px] text-center">
        <p className="text-yellow-400 font-black">🎁 TRAE A 5 Y RECLAMA AUTOMÁTICAMENTE TU REGALO</p>
        <p className="text-white/70 text-sm mt-3">¡TENEMOS GRANDES SORPRESAS POR LANZAMIENTO!</p>
      </div>
    </main>
  )
}
