import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { writeFile, mkdir, readFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      )
    }
    
    if (!file.name.endsWith('.json')) {
      return NextResponse.json(
        { success: false, message: 'Only JSON files are allowed' },
        { status: 400 }
      )
    }
    
    const fileContent = await file.text()
    
    let jsonData
    try {
      jsonData = JSON.parse(fileContent)
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON file' },
        { status: 400 }
      )
    }
    
    if (!Array.isArray(jsonData)) {
      return NextResponse.json(
        { success: false, message: 'JSON must be an array of test runs' },
        { status: 400 }
      )
    }
    
    const dataDir = path.join(process.cwd(), 'public', 'data')
    await mkdir(dataDir, { recursive: true })
    
    const filePath = path.join(dataDir, 'test-results.json')
    await writeFile(filePath, JSON.stringify(jsonData, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Data uploaded successfully',
      recordCount: jsonData.length
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const filePath = path.join(process.cwd(), 'public', 'data', 'test-results.json')
    
    try {
      const fileContent = await readFile(filePath, 'utf-8')
      const jsonData = JSON.parse(fileContent)
      
      return NextResponse.json({ 
        success: true, 
        data: jsonData 
      })
    } catch {
      return NextResponse.json({ 
        success: true, 
        data: [] 
      })
    }
    
  } catch (error) {
    console.error('Get data error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}