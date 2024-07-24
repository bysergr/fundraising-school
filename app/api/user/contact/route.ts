export async function POST(req: Request) {
  const data = await req.json();

  const updateUserResponse = await fetch(`${process.env.BACKEND_GATEWAY_URL}/user/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (updateUserResponse.status === 200) {
    return Response.json({ message: 'User updated' }, { status: 200 });
  }

  return Response.json({ message: 'Error in update users' }, { status: 400 });
}
