import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const user_email = searchParams.get('user_email');

  const params = new URLSearchParams();

  if (user_email) {
    params.append('user_email', user_email);
  }

  const resp = await fetch(`${process.env.BACKEND_GATEWAY_URL}/startup/user/favorites?${params}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!resp.ok) {
    return Response.json({ error: 'Invalid Request' }, { status: 400 });
  }

  const data = await resp.json();

  return Response.json(data);
}
