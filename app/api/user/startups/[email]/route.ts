type Params = {
  email: string;
};

export async function GET(request: Request, context: { params: Params }) {
  const email = context.params.email;

  return Response.json({
    response: 'fund',
  });
  /// Se acabo
  const response = await fetch(`${process.env.BACKEND_GATEWAY_URL}/user/check/${email}`, {
    method: 'GET',
  });

  if (response.status !== 200) {
    return Response.json({ error: 'Invalid User' }, { status: 400 });
  }

  try {
    const responseData = await response.json();

    return Response.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error:', error);

    return Response.json('error', { status: 400 });
  }
}
