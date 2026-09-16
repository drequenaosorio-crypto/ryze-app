"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return alert("Escribe tu email");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
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
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h1>✅ ¡Estás en la lista RYZE!</h1>
        <p>Te avisaremos pronto.</p>
        <button onClick={() => setDone(false)}>Volver</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', flexDirection: 'column', gap: 20, padding: 20 }}>
      <h1 style={{ fontSize: 40, fontWeight: 'bold' }}>RYZE</h1>
      <p>Únete a la lista de espera</p>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          style={{ padding: 12, borderRadius: 8, color: '#000', minWidth: 250 }}
        />
        <button onClick={handleSubmit} disabled={loading} style={{ padding: '12px 20px', background: '#fff', color: '#000', borderRadius: 8, fontWeight: 'bold' }}>
          {loading ? "..." : "Unirme"}
        </button>
      </div>
      <a href="/api/waitlist" style={{ fontSize: 12, opacity: 0.5, marginTop: 20 }}>Ver lista guardada</a>
    </div>
  );
}
