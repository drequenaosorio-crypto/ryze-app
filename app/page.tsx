"use client"

export default function Home() {
  return (
    <div className="h-screen bg-black text-white overflow-y-scroll snap-y snap-mandatory">
      <div className="sticky top-0 z-10 bg-black p-4 flex justify-between items-center border-b border-zinc-800">
        <h1 className="font-black text-xl">RYZE</h1>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>

      <div className="relative h-[calc(100vh-65px)] snap-start bg-zinc-900">
        <video
          src="/pitch1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => {
            // si no tienes pitch1.mp4, usa el de prueba
            (e.target as HTMLVideoElement).src = "https://www.w3schools.com/html/mov_bbb.mp4"
          }}
        />
        <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-end bg-gradient-to-t from-black to-transparent">
          <div>
            <p className="font-bold">@drequenaosorio</p>
            <p className="text-sm">Mi primer pitch 🔥</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">♡ 124</div>
        </div>
      </div>
    </div>
  )
}
