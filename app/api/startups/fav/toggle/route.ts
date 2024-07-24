export async function POST(req: Request) {
  const data = await req.json();

  const { email, startup_id, favorite } = data;

  if (favorite) {
    const response = await fetch(`${process.env.BACKEND_GATEWAY_URL}/user/favorite_startup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, startup_id: startup_id }),
    });

    if (response.status === 200 || response.status === 201) {
      return Response.json({ message: 'User updated' }, { status: 200 });
    }

    return Response.json({ message: 'Update error' }, { status: 400 });
  }

  const response = await fetch(
    `${process.env.BACKEND_GATEWAY_URL}/user/favorite_startup/${email}/${startup_id}`,
    {
      method: 'DELETE',
    },
  );

  if (response.status === 200) {
    return Response.json({ message: 'User updated' }, { status: 200 });
  }

  return Response.json({ message: 'Update error' }, { status: 400 });
}
