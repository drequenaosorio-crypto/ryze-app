"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [myLink, setMyLink] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("ref");
    if (r) setRefCode(r);
  }, []);

  const handleSubmit = async () => {
    if (!email) return alert("Escribe tu email");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ref: refCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setMyLink(`https://ryzeofficial-app.com?ref=${email}`);
        setDone(true);
        setEmail("");
      } else {
        alert(data.error || "Error");
      }
    } catch {
      alert("Error de conexión");
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div style={{ padding: 40, textAlign: 'center', minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
        <h1>✅ ¡Estás en la lista RYZE!</h1>
        
        <div style={{ background: '#111', padding: 20, borderRadius: 12, border: '1px solid #333', maxWidth: 400, width: '100%' }}>
          <p style={{ fontWeight: 'bold', color: '#FF
