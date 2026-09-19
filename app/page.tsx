'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/join').then(r=>r.json()).then(d=>setCount(d.count||0));
  }, []);

  const handleJoin = async () => {
    if(!email.includes('@')){ setMsg('Escribe un email válido'); return; }
    setMsg('Uniendo...');
    const res = await fetch('/api/join', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if(res.ok){
      setCount(data.count);
      setMsg(`¡Listo! Eres #${data.count}`);
      setEmail('');
    } else {
      setMsg(data.error || 'Error');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center pt-32 px-4">
      <h1 className="text-6xl font-black tracking-widest mb-10">RYZE</h1>

      <p className="text-xl mb-2">Únete a la lista de espera</p>
      <p className="text-white/50 text-sm mb-6">{count} personas ya se unieron</p>

      <div className="flex gap-3 w-full max-w-[350px]">
        {/* ARREGLADO: text-black para que se vea lo que escribes */}
        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Tu email"
          className="flex-1 bg-white text-black placeholder:text-gray-500 px-5 py-4 rounded-xl outline-none border-2 border-white"
        />
        <button onClick={handleJoin} className="bg-white text-black font-bold px-6 rounded-xl">
          Unirme
        </button>
      </div>

      {msg && <p className="mt-4 text-[#FFD700] font-bold">{msg}</p>}

      <div className="mt-10 border border-yellow-500 rounded-3xl p-6 w-full max-w-[350px] text-center">
        <p className="text-yellow-400 font-black leading-tight">🎁 TRAE A 5 Y RECLAMA AUTOMÁTICAMENTE TU REGALO</p>
        <p className="text-sm mt-3 text-white/90">¡TENEMOS GRANDES SORPRESAS POR LANZAMIENTO!</p>
      </div>
    </main>
  );
}
