"use client";
import { useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const handleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
      videoRef.current.play();
      setMuted(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-0">
      <div className="relative w-full h-[100dvh] md:h-auto md:max-w-[430px] md:aspect-[9/16] md:rounded-[40px] overflow-hidden bg-black shadow-2xl">
        <video
          ref={videoRef}
          src="/ryze-promo.mp4"
          autoPlay
          loop
          muted={muted}
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Botón de audio */}
        {muted && (
          <button
            onClick={handleSound}
            className="absolute top-6 right-6 z-20 bg-white text-black px-5 py-2.5 rounded-full text-sm font-black shadow-lg active:scale-95"
          >
            🔊 Tap for Sound
          </button>
        )}

        {!muted && (
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = true;
                setMuted(true);
              }
            }}
            className="absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold border border-white/20"
          >
            🔊
          </button>
        )}

        {/* Gradiente y textos */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 z-10">
          <h1 className="text-white text-[48px] font-black leading-none tracking-tighter">RYZE</h1>
          <p className="text-white/70 mt-2 text-[15px] font-medium">
            Entertainment. Sales. Jobs. Meet People.
          </p>
          <button className="mt-6 w-full bg-white text-black h-[54px] rounded-full font-black text-[16px]">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}
