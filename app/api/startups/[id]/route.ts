type Params = {
  id: string;
};

export async function PUT(req: Request, context: { params: Params }) {
  const data = await req.json();

  const updateUserResponse = await fetch(
    `${process.env.BACKEND_GATEWAY_URL}/startups/${context.params.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (updateUserResponse.status === 201 || updateUserResponse.status === 200) {
    return Response.json({ message: 'Startup Updated' }, { status: 200 });
  }

  return Response.json({ message: 'Error in update startup' }, { status: 400 });
}
