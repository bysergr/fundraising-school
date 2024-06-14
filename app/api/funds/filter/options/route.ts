export async function GET() {
  const response = await fetch(`${process.env.BACKEND_GATEWAY_URL}/vc_sheet/filter/options`, {
    method: 'GET',
  });

  if (response.status === 200) {
    const data = await response.json();

    return Response.json(data);
  }

  return Response.json({ message: 'Error in update users' }, { status: 400 });
}
