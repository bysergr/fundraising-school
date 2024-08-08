type Params = {
  email: string;
};

export async function GET(req: Request, context: { params: Params }) {
  const email = context.params.email;

  try {
    const response = await fetch(
      `${process.env.BACKEND_GATEWAY_URL}/user/favorite_startup/csv/${email}`,
      {
        cache: 'no-store',
        method: 'GET',
      },
    );

    if (!response.ok) {
      return Response.json({ message: 'Error' }, { status: 400 });
    }

    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const fileName = 'favorite_startups.xlsx';

    const headers = new Headers();
    headers.append('Content-Disposition', `attachment; filename="${fileName}"`);
    headers.append('Content-Type', 'text/vnd.openxmlformats-officedocument.spreadsheetml.sheet ');

    return new Response(Buffer.from(buffer), { headers });
  } catch (error) {
    console.error('Error downloading the file:', error);

    return Response.json({ message: `Error ${error}` }, { status: 500 });
  }
}
