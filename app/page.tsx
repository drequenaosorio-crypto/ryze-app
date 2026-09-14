"use client";

export default function Page() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">

      {/* VIDEO RYZE */}
      <div className="relative w-full max-w-[380px] aspect-[9/16] rounded-[32px] overflow-hidden bg-black border border-white/10">
        <video
          src="/ryze-promo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        {/* 5 ICONOS FLOTANTES COMO RYZE */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-around px-6">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-xl">☕</div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-xl">🍄</div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-xl">⚡</div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-xl">🧠</div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-xl">💤</div>
        </div>
      </div>

      <h1 className="text-white text-2xl font-bold mt-6">RYZE</h1>
      <p className="text-white/60 text-sm">Tu video ya está activo</p>
    </main>
  );
}
