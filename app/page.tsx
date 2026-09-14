"use client";
import { useState, useRef, useEffect } from "react";

export default function Page() {
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(12500);
  const videoRef = useRef<any>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      v.volume = 1;
      v.play().catch(() => {
        v.muted = true;
        v.play();
        setMuted(true);
      });
    }
  }, []);

  function toggleAudio() {
    const v = videoRef.current;
    if (v) {
      v.muted =!v.muted;
      if (!v.muted) {
        v.volume = 1;
        v.play();
      }
      setMuted(v.muted);
    }
  }

  function handleLike() {
    if (liked) setLikes(likes - 1);
    else setLikes(likes + 1);
    setLiked(!liked);
  }

  async function handleShare() {
    const url = "https://www.ryzeofficial-app.com";
    try {
      if ((navigator as any).share) {
        await (navigator as any).share({ title: "RYZE", url: url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copiado");
      }
    } catch (e) {}
  }

  return (
    <main className="min-h-screen bg-black flex justify-center items-center">
      <div className="relative w-full max-w-[400px] h-[100dvh] bg-black overflow-hidden">
        <video ref={videoRef} autoPlay loop playsInline className="absolute inset-0 w-full h-full object-cover" onClick={toggleAudio}>
          <source src="/ryze-promo.mp4" type="video/mp4" />
        </video>

        <button onClick={toggleAudio} className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
          {muted? "🔇" : "🔊"}
        </button>

        {muted && (
          <button onClick={toggleAudio} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 text-black px-6 py-3 rounded-full font-bold">
            Toca para audio
          </button>
        )}

        <div className="absolute right-2 bottom-28 flex flex-col items-center gap-5">
          <button onClick={handleLike} className
