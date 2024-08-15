type Params = {
  id: string;
};

export async function POST(req: Request, context: { params: Params }) {
  const request_data = await req.formData();

  const file = request_data.get('startup_photo');

  if (!file) {
    return Response.json({ message: 'No file' }, { status: 400 });
  }

  const new_request_data = new FormData();
  if (file instanceof File) {
    new_request_data.append('startup_photo', file, file.name);
  }

  const { id } = context.params;

  try {
    const response = await fetch(`${process.env.BACKEND_GATEWAY_URL}/startup/${id}/startup_photo`, {
      method: 'POST',
      body: new_request_data,
    });

    if (!response.ok) {
      response
        .json()
        .then((data) => {
          console.error('Error:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      return Response.json({ message: 'Error' }, { status: 400 });
    }

    return Response.json({ message: 'Success', status: 200 });
  } catch (error) {
    return Response.json({ message: `Error ${error}` }, { status: 500 });
  }
}
