"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-[400px] aspect-[9/16] bg-zinc-900 rounded-[32px] overflow-hidden shadow-2xl border border-zinc-800">

        {/* VIDEO HD - TU VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          src="/20260531_133116.mp4"
        />

        {/* Degradado para que se lea el texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* TEXTO ENCIMA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-4xl font-black leading-none tracking-tight">
            RYZE
          </h1>
          <p className="text-sm text-white/70 mt-2">
            Swipe. Match. Rise.
          </p>
          <button className="mt-4 w-full bg-white text-black font-bold py-3 rounded-full">
            Get Started
          </button>
        </div>

      </div>
    </main>
  );
}
