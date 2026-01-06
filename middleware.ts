import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth-utils"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginRoute = pathname.startsWith("/admin/login")

  if (!isAdminRoute || isLoginRoute) {
    return NextResponse.next()
  }

  const token = req.cookies.get("admin_token")?.value
  if (!token) {
    const url = new URL("/admin/login", req.url)
    return NextResponse.redirect(url)
  }

  const payload = await verifyToken(token)
  if (!payload) {
    const url = new URL("/admin/login", req.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
