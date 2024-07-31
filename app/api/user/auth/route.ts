export async function POST(req: Request) {
  const data = await req.json();

  const updateUserResponse = await fetch(
    `${process.env.BACKEND_GATEWAY_URL}/user/add_normal_user`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (updateUserResponse.status === 201 || updateUserResponse.status === 200) {
    return Response.json({ message: 'User created' }, { status: 201 });
  }

  return Response.json({ message: 'Error in create user' }, { status: 400 });
}
