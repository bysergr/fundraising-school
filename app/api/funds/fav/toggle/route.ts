export async function POST(req: Request) {
  const data = await req.json();

  const { email, fund_id, favorite } = data;

  if (favorite) {
    const response = await fetch(`${process.env.BACKEND_GATEWAY_URL}/user/favorite_fund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, fund_id: fund_id }),
    });

    if (response.status === 200 || response.status === 201) {
      return Response.json({ message: 'User updated' }, { status: 200 });
    }

    return Response.json({ message: 'Update error' }, { status: 400 });
  }

  const response = await fetch(
    `${process.env.BACKEND_GATEWAY_URL}/user/favorite_fund/${email}/${fund_id}`,
    {
      method: 'DELETE',
    },
  );

  if (response.status === 200) {
    return Response.json({ message: 'User updated' }, { status: 200 });
  }

  return Response.json({ message: 'Update error' }, { status: 400 });
}
