'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function GraciasContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const link = `https://ryzeofficial-app.com?ref=${encodeURIComponent(email)}`;
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-black tracking-widest mb-4">RYZE</h1>
      <h2 className="text-2xl font-bold text-yellow-400 mb-2">¡Ya estás dentro!</h2>
      <p className="text-white/60 mb-8">Ahora trae a 5 y reclama tu regalo</p>
      <div className="w-full max-w-sm bg-white/10 border border-yellow-500/50 rounded-2xl p-6">
        <p className="text-sm text-white/50 mb-2">TU LINK PERSONAL</p>
        <p className="bg-black p-3 rounded-xl text-sm break-all mb-4">{link}</p>
        <a href={`https://wa.me/?text=${encodeURIComponent(`Únete a RYZE con mi link: ${link}`)}`} className="block w-full bg-[#25D366] text-black font-black py-4 rounded-2xl text-center">Compartir por WhatsApp</a>
      </div>
      <a href="/" className="mt-8 text-white/40 text-sm">Volver al inicio</a>
    </main>
  );
}

export default function Gracias() {
  return <Suspense fallback={<div className="min-h-screen bg-black"></div>}><GraciasContent /></Suspense>;
}
