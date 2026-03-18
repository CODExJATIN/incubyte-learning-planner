import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Protect /blog/create and /blog/[id]/edit routes
  const isProtectedPath = 
    request.nextUrl.pathname.startsWith('/blog/create') ||
    request.nextUrl.pathname.match(/^\/blog\/[^/]+\/edit$/);

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Prevent authenticated users from going to login/signup
  if (request.nextUrl.pathname.startsWith('/auth')) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog/:path*', '/auth/:path*'],
};
