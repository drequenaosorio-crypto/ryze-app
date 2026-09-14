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
      const p = v.play();
      if (p) {
        p.catch(() => {
          v.muted = true;
          v.play();
          setMuted(true);
        });
      }
    }
  }, []);

  const toggleAudio = () => {
    const v = videoRef.current;
    if (!v) return;
    const newMuted = !v.muted;
    v.muted = newMuted;
    if (!newMuted) {
      v.volume = 1;
      v.play();
    }
    setMuted(newMuted);
  };

  const handleLike = () =>
