import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_PATHS = [/^posts\/$/, /^posts\/[-a-zA-Z0-9_]+\/$/, /^homepage\/$/]

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = `${params.path.join('/')}/`
  if (!ALLOWED_PATHS.some((pattern) => pattern.test(path))) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const backendUrl = process.env.WEBSITE_API_URL
  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Blog backend is not configured' },
      { status: 503 }
    )
  }

  const target = new URL(
    `/v1/blog/${path}`,
    `${backendUrl.replace(/\/$/, '')}/`
  )
  target.search = request.nextUrl.search

  try {
    const response = await fetch(target, { cache: 'no-store' })
    const body = await response.text()
    return new NextResponse(body, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Blog backend request failed:', error)
    return NextResponse.json(
      { error: 'Blog backend request failed' },
      { status: 502 }
    )
  }
}
