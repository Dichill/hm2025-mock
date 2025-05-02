import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for protecting routes that require authentication
 * Redirects unauthenticated users to the login page
 * @param request - The incoming request object
 */
export function middleware(request: NextRequest) {
    const isGracePath = request.nextUrl.pathname.startsWith("/grace");
    const isLoginPage = request.nextUrl.pathname === "/grace";

    const token = request.cookies.get("grace_auth_token")?.value;

    if (isGracePath && !isLoginPage && !token) {
        const loginUrl = new URL("/grace", request.url);

        return NextResponse.redirect(loginUrl);
    }

    if (isLoginPage && token) {
        const dashboardUrl = new URL("/grace/dashboard", request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}
export const config = {
    matcher: ["/grace/:path*"],
};
