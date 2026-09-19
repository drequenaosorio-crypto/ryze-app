'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
function Contenido(){
  const params = useSearchParams();
  const email = params.get('email')||'';
  const link = `https://ryzeofficial-app.com?ref=${email}`;
  const wa = `https://wa.me/?text=${encodeURIComponent('🔥 Ya estoy en RYZE, únete con mi link: '+link)}`;
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-black tracking-widest">RYZE</h1>
      <p className="mt-6 text-white/60">¡Ya estás dentro!</p>
      <div className="bg-white/10 p-4 rounded-xl mt-6 break-all w-full max-w-[400px] text-sm">{link}</div>
      <a href={wa} className="bg-[#25D366] text-black font-bold py-4 rounded-2xl mt-6 w-full max-w-[400px] block">Compartir en WhatsApp</a>
    </main>
  )
}
export default function Page(){return <Suspense><Contenido/></Suspense>}
