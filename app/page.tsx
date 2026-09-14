"use client";
import { useState, useRef } from "react";

export default function Page() {
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(12500);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted =!videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked? likes - 1 : likes + 1);
  };

  const handleShare = async () => {
    const url = "https://www.ryzeofficial-app.com";
    if (navigator.share) {
      await navigator.share({ title: "RYZE", text: "Mira esto en Ryze", url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("¡Link copiado! " + url);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <main className="min-h-screen bg-black flex justify-center items-center">
      <div className="relative w-full max-w-[400px] h-[100dvh] bg-black overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          loop
          playsInline
          onClick={toggleAudio}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/ryze-promo.mp4" type="video/mp4" />
        </video>

        {muted && (
          <button onClick={toggleAudio} className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
            🔊 Toca para audio
          </button>
        )}

        {/* BOTONES FUNCIONALES */}
        <div className="absolute right-2 bottom-28 flex flex-col items-center gap-5">
          <button onClick={handleLike} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full backdrop-blur flex items-center justify-center ${liked? 'bg-red-500' : 'bg-white/15'}`}>
              <svg className={`w-7 h-7 ${liked? 'fill-white text-white' : 'text-white'}`} fill={liked? "white" : "none"} stroke="white" viewBox="0 0 24 24"><path strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <span className="text-white text-xs mt-1 font-bold">{(likes/1000).toFixed(1)}k</span>
          </button>

          <button onClick={() => setShowComments(true)} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21
