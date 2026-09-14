"use client"

export default function Home() {
  return (
    <div className="h-screen bg-black text-white overflow-y-scroll snap-y snap-mandatory">
      <div className="sticky top-0 z-20 bg-black p-4 flex justify-between items-center border-b border-zinc-800">
        <h1 className="text-xl font-black">RYZE</h1>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>

      {/* VIDEO 1 */}
      <div className="relative h-[90vh] snap-start bg-zinc-900">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <p className="font-bold">@drequenaosorio</p>
          <p className="text-sm">Mi primer pitch 🔥 TEST</p>
        </div>
        <div className="absolute bottom-20 right-4 flex flex-col gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">♡ 124</div>
        </div>
      </div>

      {/* VIDEO 2 */}
      <div className="relative h-[90vh] snap-start bg-zinc-900">
        <video
          src="https://www.w3schools.com/html/movie.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <p className="font-bold">@ryze_official</p>
          <p className="text-sm">Segundo test</p>
        </div>
      </div>
    </div>
  )
}
