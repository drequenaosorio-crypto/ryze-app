"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative w-full h-[100vh] md:max-w-[430px] md:aspect-[9/16] md:rounded-[36px] overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/20260531_133116.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 pb-10">
          <h1 className="text-white text-[44px] font-black">RYZE</h1>
          <p className="text-white/60 mt-1">Swipe. Match. Rise.</p>
          <button className="mt-6 w-full bg-white text-black h-[56px] rounded-full font-bold">
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}
