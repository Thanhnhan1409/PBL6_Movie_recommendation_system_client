import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('authToken')
  if (!authToken && (request.url !== '/login' && request.url !== '/signup')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (authToken && (request.url === '/login' || request.url === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: '/about/:path*',
};
