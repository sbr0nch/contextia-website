import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, createSession, clearSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, action } = body
    
    // Handle logout
    if (action === 'logout') {
      await clearSession()
      return NextResponse.json({ success: true, message: 'Logged out successfully' })
    }
    
    // Handle login
    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password is required' },
        { status: 400 }
      )
    }
    
    const isValid = verifyPassword(password)
    
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      )
    }
    
    // Create session
    await createSession()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Authentication successful' 
    })
    
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}