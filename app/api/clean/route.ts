import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // @ts-ignore
    const kv = (globalThis as any).RYZE_WAITLIST || (process.env as any).RYZE_WAITLIST
    // Si usas Cloudflare binding
    const binding = (globalThis as any).RYZE_WAITLIST
    if (binding) {
       const list = await binding.list()
       for (const key of list.keys) {
         await binding.delete(key.name)
       }
    }
    return NextResponse.json({ ok: true, msg: "Lista borrada" })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) })
  }
}
