import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { LinkedinAdminEmail } from './data/enums';

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

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/matchmaking/', req.url));
  }

  if (!token) {
    if (pathname === '/matchmaking/vc-list' || pathname === '/matchmaking/startup-list') {
      return NextResponse.redirect(new URL('/matchmaking/', req.url));
    }

    return NextResponse.next({ headers });
  }

  if (LinkedinAdminEmail.includes(token?.email as string)) {
    return NextResponse.next({ headers });
  }

  let userRole = 'guest';

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

    if (userRole === 'startup' && pathname === '/matchmaking/startup-list') {
      return NextResponse.redirect(new URL('/matchmaking/vc-list', req.url));
    }

    if (userRole === 'fund' && pathname === '/matchmaking/vc-list') {
      return NextResponse.redirect(new URL('/matchmaking/startup-list', req.url));
    }

    if (
      userRole === 'guest' &&
      (pathname === '/matchmaking/vc-list' || pathname === '/matchmaking/startup-list')
    ) {
      return NextResponse.redirect(new URL('/matchmaking/', req.url));
    }
  } catch (error) {
    return NextResponse.next({ headers });
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
