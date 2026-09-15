// @ts-nocheck
"use client";
import { useRef, useState, useEffect } from "react";

export default function Page() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(12501);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    { user: "ana.r", text: "🔥🔥🔥 Ryze es otro nivel" },
    { user: "carlos_23", text: "¿Cuando sale la app?" },
    { user: "maria_v", text: "Necesito ese audio 😍" },
  ]);
  const [newComment, setNewComment] = useState("");

  // carga los comentarios guardados
  useEffect(() => {
    fetch("/api/comments")
     .then(r => r.json())
     .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setComments(data);
        }
      })
     .catch(() => {});
  }, []);

  // NUEVO: carga los likes guardados
  useEffect(() => {
    fetch("/api/likes")
     .then(r => r.json())
     .then(data => {
        if (data.likes) setLikes(data.likes);
      })
     .catch(() => {});
  }, []);

  function toggleAudio() {
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) { v.muted = false; v.volume = 1; v.play(); setMuted(false); }
    else { v.muted = true; setMuted(true); }
  }

  // NUEVO: likes que se guardan para siempre
  async function toggleLike() {
    if (liked) {
      setLikes(l => l - 1);
      setLiked(false);
      try {
        await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "unlike" }),
        });
      } catch {}
    } else {
      setLikes(l => l + 1);
      setLiked(true);
      try {
        await fetch("/api/likes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify
