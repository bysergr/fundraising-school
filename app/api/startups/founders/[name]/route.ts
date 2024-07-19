type Params = {
  name: string;
};

export async function GET(req: Request, context: { params: Params }) {
  const name = context.params.name;

  try {
    const response = await fetch(`${process.env.BACKEND_GATEWAY_URL}/startup/users/${name}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return Response.json({ message: 'Error' }, { status: 400 });
    }

    const data = await response.json();

    console.log({ data });

    return Response.json(data);
  } catch (error) {
    return Response.json({ message: `Error ${error}` }, { status: 500 });
  }
}
