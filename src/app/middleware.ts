import { NextRequest, NextResponse } from 'next/server'
import { getCookie } from './app/actions'

export async function middleware(request: NextRequest) {
  const auth = await getCookie('authToken')
  const protectedRoutes = config.matcher
  if (protectedRoutes.includes(request.nextUrl.pathname) && !auth?.token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/home',
    '/dashboard',
    '/profile',
    '/medical-record',
    '/register/pathologies',
    '/register/patient',
    '/register/question',
  ],
}
