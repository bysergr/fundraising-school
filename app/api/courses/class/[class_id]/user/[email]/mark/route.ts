type Params = {
  class_id: string;
  email: string;
};

export async function POST(req: Request, context: { params: Params }) {
  const { email, class_id } = context.params;

  try {
    const response = await fetch(
      `${process.env.BACKEND_GATEWAY_URL}/course/classes/${class_id}/user/${email}/completed`,
      {
        method: 'POST',
      },
    );

    if (!response.ok) {
      return Response.json({ message: 'Error' }, { status: 400 });
    }

    return Response.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return Response.json({ message: `Error ${error}` }, { status: 500 });
  }
}
