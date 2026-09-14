"use client";
import { useState, useRef, useEffect } from "react";

export default function Page() {
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(12500);
  const videoRef = useRef(null) as any;

  useEffect(() => {
    const v = videoRef.current as any;
    if (v) {
      v.muted = false;
      v.volume = 1;
      v.play().then(() => {
        setMuted(false);
      }).catch(() => {
        v.muted = true;
        v.play();
        setMuted(true);
      });
    }
  }, []);

  function toggleAudio() {
    const v = videoRef.current as any;
    if (v) {
      v.muted = !v.muted;
      if (!v.muted) {
        v.volume = 1;
        v.play();
      }
      setMuted(v.muted);
    }
  }

  function handleLike() {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  }

  async function handleShare() {
    const url = "https://www.ryzeofficial-app.com";
    try {
      if (navigator.share) {
        await navigator.share({ title: "RYZE", text: "Mira esto en Ryze", url: url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copiado: " + url);
      }
    } catch (e) {}
  }

  return (
    <main className="min-h-screen bg-black flex justify-center items-center">
      <div className="
