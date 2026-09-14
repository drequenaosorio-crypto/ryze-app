"use client";
import { useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted =!videoRef.current.muted;
      setMuted(videoRef.current.muted);
      videoRef.current.play();
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-full h-[100vh] md:max-w-[430px] md:aspect-[9/16] md:rounded-[36px] overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/VID-20260913-WA3041.mp4"
        />
        <button
          onClick={toggleSound}
          className="absolute top-6 right-6 z-10 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold border border-white/20"
        >
          {muted? "🔇 Sound OFF" : "🔊 Sound ON"}
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-8 pb-12">
          <h1 className="text-white text-[44px] font-black leading-none">RYZE</h1>
          <p className="text-white/60 mt-2">Swipe. Match. Rise.</p>
          <button className="mt-6 w-full bg-white text-black h-[56px] rounded-full font-bold text-[17px]">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}
