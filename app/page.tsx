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
          <p style={{ fontWeight: 'bold', color: '#FFD700' }}>🎁 TRAE A 5 Y RECLAMA AUTOMÁTICAMENTE TU REGALO</p>
          <p style={{ fontSize: 13, marginTop: 5 }}>¡TENEMOS GRANDES SORPRESAS POR LANZAMIENTO!</p>
          <p style={{ marginTop: 15, fontSize: 14, opacity: 0.8 }}>Tu link único:</p>
          <div style={{ background: '#000', padding: 10, borderRadius: 8, marginTop: 8, wordBreak: 'break-all', fontSize: 12, border: '1px dashed #555' }}>{myLink}</div>
          <p style={{ fontSize: 12, marginTop: 10, opacity: 0.7 }}>Cuando 5 amigos se unan con tu link, ganas tu regalo.</p>
          <button onClick={() => navigator.clipboard.writeText(myLink)} style={{ marginTop: 15, padding: '10px 20px', background: '#fff', color: '#000', borderRadius: 8, fontWeight: 'bold', width: '100%' }}>Copiar mi link</button>
        </div>
        <button onClick={() => setDone(false)} style={{ fontSize: 12, opacity: 0.5, marginTop: 10 }}>Volver</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', flexDirection: 'column', gap: 20, padding: 20 }}>
      <h1 style={{ fontSize: 40, fontWeight: 'bold' }}>RYZE</h1>
      <p>Únete a la lista de espera</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" style={{ padding: 12, borderRadius: 8, color: '#000', minWidth: 250 }} />
        <button onClick={handleSubmit} disabled={loading} style={{ padding:
