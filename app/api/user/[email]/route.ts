type Params = {
  email: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const email = context.params.email;

  const response = await fetch(`${process.env.BACKEND_GATEWAY_URL}/user/${email}`, {
    method: 'GET',
  });

  if (response.status !== 200) {
    return Response.json({ error: 'Invalid User' }, { status: 400 });
  }

  const responseData = await response.json();

  return Response.json({ user: responseData }, { status: 200 });
}
