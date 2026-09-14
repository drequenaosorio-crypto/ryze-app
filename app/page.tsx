"use client";

export default function Page() {
  return (
    <main className="min-h-screen bg-black flex justify-center items-center">
      <div className="relative w-full max-w-[400px] h-[100dvh] bg-black rounded-[32px] overflow-hidden border border-white/10">

        {/* VIDEO AUTOMATICO - busca /ryze-promo.mp4 en public */}
        <video
          src="/ryze-promo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLVideoElement;
            target.style.display = 'none';
          }}
        />

        {/* Fondo si el video no carga */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black -z-10" />

        {/* Texto que sale en tu video real */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
          <div className="mt-20">
            <h2 className="text-white/20 text-xs tracking-[0.3em] text-center">ENTERTAINMENT</h2>
          </div>
        </div>

        {/* 5 ICONOS COMO EN TU FOTO */}
        <div className="absolute bottom-6 left-3 right-3 flex justify-between">
          <div className="w-[58px] h-[58px] bg-[#2a2a2a] rounded-full flex items-center justify-center text-2xl">☕</div>
          <div className="w-[58px] h-[58px] bg-[#2a2a2a
