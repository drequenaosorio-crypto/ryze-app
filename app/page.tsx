export default function Page() {
  return (
    <main className="min-h-screen bg-black flex justify-center items-center">
      <div className="relative w-full max-w-[400px] h-[100dvh] bg-black rounded-[32px] overflow-hidden border border-white/10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/ryze-promo.mp4" type="video/mp4" />
        </video>

        <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
          <h1 className="text-white text-2xl font-bold tracking-[0.3em] text-center">RYZE</h1>
        </div>
      </div>
    </main>
  );
}
