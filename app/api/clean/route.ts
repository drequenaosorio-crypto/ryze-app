export async function GET() {
  const { getRequestContext } = await import('@cloudflare/next-on-pages')
  const { env } = getRequestContext()
  await env.RYZE_WAITLIST.delete("prueba@test.com")
  await env.RYZE_WAITLIST.delete("amigo1@test.com")
  return new Response("Limpio ✅ Ya puedes lanzar")
}
