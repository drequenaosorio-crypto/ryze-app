"use client";
import { useRef, useState } from "react";

export default function Home() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-full h-[100dvh] md:max-w-[430px] md:aspect-[9/16] md:rounded-[32px] overflow-hidden bg-black">
        <video
          ref={ref}
          src="/VID-20260913-WA6680.mp4"
          autoPlay
          loop
          muted={muted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <button
          onClick={() => {
            if (ref.current) {
              ref.current.muted = false;
              ref.current.play();
              setMuted(false);
            }
          }}
          className="absolute top-6 right-6 z-20 bg-white text-black px-4 py-2 rounded-full text-sm font-bold"
        >
          🔊 Tap for Sound
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-white text-5xl font-black">RYZE</h1>
          <p className="text-white/60 mt-2">Entertainment. Sales. Jobs. Meet People.</p>
          <button className="mt-6 w-full bg-white text-black h-14 rounded-full font-bold">Get Started</button>
        </div>
      </div>
    </main>
  );
}
