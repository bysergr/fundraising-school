import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  let page = searchParams.get('page');
  let limit = searchParams.get('limit');

  const round = searchParams.get('round');
  const check_size = searchParams.get('check_size');
  const sector = searchParams.get('sector');
  const location = searchParams.get('location');
  const user_email = searchParams.get('user_email');
  const fund_term = searchParams.get('fund_term');

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

  if (round) {
    params.append('fund_round', round);
  }
  if (check_size) {
    params.append('check_size', check_size);
  }
  if (sector) {
    params.append('sector', sector);
  }
  if (location) {
    params.append('country', location);
  }
  if (user_email) {
    params.append('user_email', user_email);
  }
  if (fund_term) {
    params.append('fund_name_term', fund_term);
  }

  const resp = await fetch(`${process.env.BACKEND_GATEWAY_URL}/vc_sheet/funds?${params}`, {
    method: 'GET',
  });

  if (!resp.ok) {
    return Response.json({ error: 'Invalid Request' }, { status: 400 });
  }

  const data = await resp.json();

  return Response.json(data);
}
