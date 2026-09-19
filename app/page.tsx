'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/join').then(r=>r.json()).then(d=>setCount(d.count||0)).catch(()=>{});
  }, []);

  const handleJoin = async () => {
    if(!email.includes('@')){ setMsg('Email inválido'); return; }
    setMsg('Guardando...');
    const res = await fetch('/api/join', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if(res.ok){
      setCount(data.count);
      setMsg(`¡Estás dentro! Eres #${data.count}`);
      setEmail('');
    } else {
      setMsg(data.error || 'Error conectando base de datos');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-black tracking-[0.2em] mb-8">RYZE</h1>
      <p className="text-xl mb-2">Únete a la lista de espera</p>
      <p className="text-white/50 text-sm mb-8">{count} personas ya se unieron</p>

      <div className="w-full max-w-sm flex flex-col gap-3">
        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Tu email"
          className="w-full bg-white text-black placeholder:text-gray-500 px-5 py-4 rounded-2xl outline-none text-[16px]"
        />
        <button onClick={handleJoin} className="w-full bg-white text-black font-black py-4 rounded-2xl active:scale-95 transition">
          Unirme
        </button>
        {msg && <p className="text-center mt-2 text-[#FFD700] font-bold text-sm">{msg}</p>}
      </div>

      <div className="mt-12 border border-yellow-500/50 rounded-[24px] p-6 w-full max-w-sm text-center">
        <p className="text-yellow-400 font-black text-sm leading-tight">🎁 TRAE A 5 Y RECLAMA AUTOMÁTICAMENTE TU REGALO</p>
        <p className="text-xs mt-3 text-white/80">¡TENEMOS GRANDES SORPRESAS POR LANZAMIENTO!</p>
      </div>
    </main>
  );
}
