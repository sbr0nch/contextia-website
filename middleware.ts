import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE_NAME = 'dashboard_session'

export function middleware(request: NextRequest) {
  // Only protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Allow API routes to handle their own auth
    if (request.nextUrl.pathname.startsWith('/dashboard/api')) {
      return NextResponse.next()
    }
    
    // Check for session cookie
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)
    
    if (!sessionCookie) {
      // Redirect to login (dashboard page will show login form)
      return NextResponse.next()
    }
    
    try {
      const session = JSON.parse(sessionCookie.value)
      const isValid = session.authenticated && 
                     (Date.now() - session.timestamp) < (60 * 60 * 24 * 7 * 1000)
      
      if (!isValid) {
        // Session expired, clear cookie
        const response = NextResponse.next()
        response.cookies.delete(SESSION_COOKIE_NAME)
        return response
      }
    } catch {
      // Invalid session cookie, clear it
      const response = NextResponse.next()
      response.cookies.delete(SESSION_COOKIE_NAME)
      return response
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}