export async function GET() {
  const response = await fetch(`${process.env.BACKEND_GATEWAY_URL}/startups/filter/options`, {
    method: 'GET',
  });

  if (response.status === 200) {
    const data = await response.json();

    return Response.json(data);
  }

  return Response.json({ message: 'Error in filter options' }, { status: 400 });
}
