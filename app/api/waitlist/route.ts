export async function GET() {
  try {
    // tu lógica para leer
    const data = ... 
    return Response.json(data || [])
  } catch (e) {
    return Response.json([], { status: 200 })
  }
}
