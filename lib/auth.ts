/**
 * Authentication utilities for dashboard
 */

import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'dashboard_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface AuthSession {
  authenticated: boolean
  timestamp: number
}

/**
 * Verify password against environment variable
 */
export function verifyPassword(password: string): boolean {
  const correctPassword = process.env.DASHBOARD_PASSWORD
  
  if (!correctPassword) {
    console.error('DASHBOARD_PASSWORD environment variable is not set')
    return false
  }
  
  return password === correctPassword
}

/**
 * Create authentication session
 */
export async function createSession(): Promise<void> {
  const cookieStore = await cookies()
  const session: AuthSession = {
    authenticated: true,
    timestamp: Date.now()
  }
  
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/'
  })
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
    
    if (!sessionCookie) {
      return false
    }
    
    const session: AuthSession = JSON.parse(sessionCookie.value)
    
    // Check if session is still valid (not expired)
    const isValid = session.authenticated && 
                   (Date.now() - session.timestamp) < (SESSION_MAX_AGE * 1000)
    
    return isValid
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}

/**
 * Clear authentication session
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}