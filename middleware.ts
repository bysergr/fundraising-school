import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const headers = new Headers(req.headers);
  const { pathname } = req.nextUrl;

  // Set the current path in the headers
  headers.set('x-current-path', pathname);

  // // Check if the route is protected and the user is not logged in
  // // If so, redirect to the login page
  // for (const route of ProtectedRoutes) {
  //   if ((pathname.startsWith(route) || pathname === route) && !token) {
  //     return NextResponse.redirect(new URL('/signin', req.url));
  //   }
  // }

  // // If the user is logged in and tries to access the login page, redirect to the homepage
  // if (token && pathname === '/signin') {
  //   return NextResponse.redirect(new URL('/activation/', req.url));
  // }

  if (!token) {
    return NextResponse.next({ headers });
  }

  let userRole = 'guest';

  console.log({ pathname });
  console.log({ token });

  try {
    // Check the role of the user and redirect to the appropriate page
    const response = await fetch(`${process.env.BACKEND_GATEWAY_URL}/user/check/${token?.email}`, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();

      const role = data['response'];

      if (role !== undefined) {
        userRole = role;
      }
    }

    if (userRole === 'startup' && pathname === '/product/startups_list') {
      return NextResponse.redirect(new URL('/product/vc_list', req.url));
    }

    if (userRole === 'fund' && pathname === '/product/vc_list') {
      return NextResponse.redirect(new URL('/product/startups_list', req.url));
    }

    if (
      userRole === 'guest' &&
      (pathname === '/product/vc_list' || pathname === '/product/startups_list')
    ) {
      return NextResponse.redirect(new URL('/product/', req.url));
    }
  } catch (error) {
    return NextResponse.next({ headers });
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};