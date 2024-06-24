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
    params.append('round_op', round);
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

  const resp = await fetch(`${process.env.BACKEND_GATEWAY_URL}/vc_sheet/funds?${params}`, {
    method: 'GET',
  });

  const data = await resp.json();

  return Response.json(data);
}
