import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  let page = searchParams.get('page');
  let limit = searchParams.get('limit');

  const traction = searchParams.get('traction');
  const sector = searchParams.get('sector');
  const country = searchParams.get('country');
  const user_email = searchParams.get('user_email');
  const startup_term = searchParams.get('startup_term');

  if (!page) {
    page = '1';
  }

  if (!limit) {
    limit = '10';
  }

  const params = new URLSearchParams({
    page,
    limit,
  });

  if (traction) {
    params.append('traction', traction);
  }
  if (sector) {
    params.append('sector', sector);
  }
  if (country) {
    params.append('country', country);
  }
  if (startup_term) {
    params.append('startup_term', startup_term);
  }
  if (user_email) {
    params.append('user_email', user_email);
  }

  const resp = await fetch(`${process.env.BACKEND_GATEWAY_URL}/startups/all?${params}`, {
    method: 'GET',
  });

  if (!resp.ok) {
    return Response.json({ error: 'Invalid Request' }, { status: 400 });
  }

  const data = await resp.json();

  return Response.json(data);
}
