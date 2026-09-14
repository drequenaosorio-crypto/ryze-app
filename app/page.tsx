"use client";
import { useRef, useState } from "react";

export default function Page() {
  const videoRef = useRef<any>(null);
  const [muted, setMuted] = useState(false);

  function toggle() {
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

  return (
    <main style={{ background: "black", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: "400px", height: "100vh", background: "black" }}>
        <video ref={videoRef} autoPlay loop playsInline onClick={toggle} style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          <source src="/ryze-promo.mp4" type="video/mp4" />
        </video>
        <button onClick={toggle} style={{ position: "absolute", top: 20, right: 20, background: "black", color: "white", padding: "6px 12px", borderRadius: 20 }}>
          {muted ? "SILENCIADO" : "CON AUDIO"}
        </button>
        <h1 style={{ position: "absolute", bottom: 20, width: "100%", textAlign: "center", color: "white", letterSpacing: 8 }}>RYZE</h1>
      </div>
    </main>
  );
}
