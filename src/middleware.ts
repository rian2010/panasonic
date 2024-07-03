import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Add user role to the request headers
    const userRole = token.role; // Assuming token contains the user's role
    req.headers.set("X-User-Role", userRole);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

