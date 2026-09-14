"use client";
import { useRef, useState } from "react";

export default function Page() {
  const videoRef = useRef<any>(null);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(12500);

  function toggleAudio() {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      v.muted = false;
      v.volume = 1;
      v.play();
      setMuted(false);
    } else {
      v.muted = true;
      setMuted(true);
    }
  }

  function toggleLike() {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  }

  return (
    <main className="min-h-screen bg-black flex justify-center">
      <div className="relative w-full max-w-[400px] h-[100dvh] bg-black overflow-hidden">
