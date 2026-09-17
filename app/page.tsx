"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const DICT: any = {
  es: { t: "Únete a la lista de espera", ph: "tu@email.com", btn: "Unirme", p1: "🎁 TRAE A 5 Y RECLAMA AUTOMÁTICAMENTE TU REGALO", p2: "¡TENEMOS GRANDES SORPRESAS POR LANZAMIENTO!", ok: "¡Estás dentro!" },
  en: { t: "Join the waitlist", ph: "your@email.com", btn: "Join", p1: "🎁 BRING 5 AND AUTOMATICALLY CLAIM YOUR GIFT", p2: "WE HAVE BIG SURPRISES FOR LAUNCH!", ok: "You're in!" },
  pt: { t: "Entre para a lista de espera", ph: "seu@email.com", btn: "Entrar", p1: "🎁 TRAGA 5 E RESGATE SEU PRESENTE", p2: "TEMOS SURPRESAS!", ok: "Você está dentro!" },
  fr: { t: "Rejoignez la liste", ph: "votre@email.com", btn: "Rejoindre", p1: "🎁 APPORTEZ 5 ET RÉCLAMEZ VOTRE CADEAU", p2: "GRANDES SURPRISES!", ok: "Vous êtes dedans!" },
};

function Form() {
  const [lang, setLang] = useState("es");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const ref = params.get("ref");

  useEffect(() => {
    const l = navigator.language.slice(0, 2).toLowerCase();
    if (DICT[l]) setLang(l);
    else setLang("en");
  }, []);

  const tr = DICT[lang] || DICT.en;

  async function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, ref }),
    });
    if (res.ok) {
      setLink(`${window.location.origin}?ref=${email}`);
      setDone(true);
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div style={{ background: "black", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, color: "white" }}>
        <h1 style={{ fontSize: 60, fontWeight: 900 }}>RYZE</h1>
        <h2>{tr.ok}</h2>
        <p style={{ color: "#facc15", marginTop: 20 }}>{link}</p>
      </div>
    );
  }

  return (
    <div style={{ background: "black", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, textAlign: "center" }}>
      <h1 style={{ color: "white", fontSize: 60, fontWeight: 900, letterSpacing: 4, marginBottom: 30 }}>RYZE</h1>
      <p style={{ color: "white", fontSize: 20, marginBottom: 30 }}>{tr.t}</p>
      <form onSubmit={onSubmit} style={{ display: "flex", gap: 10, maxWidth: 450, width: "100%", marginBottom: 30 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={tr.ph} type="email" required style={{ flex: 1, padding: 18, borderRadius: 12, border: "none" }} />
        <button type="submit" style={{ background: "white", color: "black", padding: "0 30px", borderRadius: 12, fontWeight: "bold" }}>{loading? "..." : tr.btn}</button>
      </form>
      <div style={{ border: "1px solid #facc15", borderRadius: 16, padding: 20, maxWidth: 450, width: "100%" }}>
        <p style={{ color: "#facc15", fontWeight: 900, margin: 0 }}>{tr.p1}</p>
        <p style={{ color: "white", fontSize: 13, marginTop: 10, marginBottom: 0 }}>{tr.p2}</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ background: "black", minHeight: "100vh" }} />}>
      <Form />
    </Suspense>
  );
}
