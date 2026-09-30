import { NextRequest, NextResponse } from "next/server"

export function proxy(req: NextRequest) {
    const hasSession = req.cookies.has("csrf_token")

    if (!hasSession) {
        const url = new URL("/login", req.url)
        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"],
}