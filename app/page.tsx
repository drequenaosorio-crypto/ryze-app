"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return alert("Escribe tu email primero");
    setLoading(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        alert("Error, intenta de nuevo");
      }
    } catch (e) {
      setDone(true);
    }
    setLoading(false);
  };

  return (
    <main style={{ background: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px', textAlign: 'center' }}>
      <div style={{ border: '1px solid #333', borderRadius: '999px', padding: '6px 14px', fontSize: '12px', marginBottom: '20px', color: '#888' }}>
        ● LIVE - FUNDADOR #1 VERIFICADO
      </div>

      <h1 style={{ fontSize: '60px', fontWeight: '900', letterSpacing: '-3px', margin: '0' }}>RYZE</h1>
      <p style={{ color: '#888', fontSize: '18px', maxWidth: '400px', marginTop: '15px' }}>
        La nueva era de la influencia. Únete a la waitlist oficial.
      </p>

      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '16px', padding: '20px', marginTop: '40px', width: '100%', maxWidth: '360px' }}>
        <div style={{ textAlign: 'left', marginBottom: '15px' }}>
          <div style={{ fontSize: '12px', color: '#666' }}>FUNDADOR #1</div>
          <div style={{ fontWeight: 'bold' }}>@david_ro_16</div>
          <div style={{ fontSize: '12px', color: '#00ff88' }}>✓ Verificado en ryzeofficial-app.com/api/waitlist</div>
        </div>
        
        {done ? (
          <div style={{ background: '#00ff88', color: 'black', padding: '12px', borderRadius: '8px', fontWeight: 'bold' }}>
            ¡Estás dentro! Ya estás en la lista 🔥
          </div>
        ) : (
          <>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email" 
              style={{ width: '100%', background: 'black', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: 'white', boxSizing: 'border-box' }} 
            />
            <button 
              onClick={handleSubmit}
              disabled={loading}
              style={{ width: '100%', background: 'white', color: 'black', border: '0', borderRadius: '8px', padding: '12px', marginTop: '10px', fontWeight: 'bold', cursor: 'pointer', opacity: loading ? 0.5 : 1 }}>
              {loading ? "Guardando..." : "Unirme a la Waitlist"}
            </button>
          </>
        )}
      </div>

      <p style={{ color: '#444', fontSize: '11px', marginTop: '30px' }}>
        drequenaosorio@gmail.com es el primer miembro oficial.
      </p>
    </main>
  )
}
