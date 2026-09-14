"use client";

export default function Page() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-0">
      <div className="relative w-full max-w-[430px] h-[100dvh] bg-black overflow-hidden">
        <video
          src="/ryze-promo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Glow RYZE */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-8 left-0 right-0 text-center">
          <h1 className="text-white font-black tracking-[0.3em] text-2xl drop-shadow-[0_0_15px_rgba(100,150,255,0.8)]">RYZE</h1>
        </div>
      </div>
    </main>
  );
}
