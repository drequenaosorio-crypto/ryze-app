'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/join').then(r=>r.json()).then(d=>setCount(d.count||0));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-black tracking-[0.2em] mb-8">RYZE</h1>
      <p className="text-white/40 text-sm mb-6">{count} personas ya se unieron</p>

      <div className="flex w-full max-w-[360px] gap-2">
        <input
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="Tu email"
          className="flex-1 bg-white text-black rounded-2xl px-5 py-4 outline-none"
        />
        <button
          onClick={async()=>{
            if(!email.includes('@')) return;
            await fetch('/api/join',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});
            window.location.href=`/gracias?email=${encodeURIComponent(email)}`;
          }}
          className="bg-white text-black font-bold rounded-2xl px-6 py-4"
        >
          Unirme
        </button>
      </div>
    </main>
  );
}
