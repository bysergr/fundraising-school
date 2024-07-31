export async function PUT(req: Request) {
  const data = await req.json();

  const updateUserResponse = await fetch(`${process.env.BACKEND_GATEWAY_URL}/user/attendee_user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (updateUserResponse.status === 201 || updateUserResponse.status === 200) {
    return Response.json({ message: 'User created' }, { status: 201 });
  }

  return Response.json({ message: 'Error in create user' }, { status: 400 });
}
