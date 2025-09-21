import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // Public routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        // Optional public pages
        if (pathname === "/" || pathname.startsWith("/api/video")) {
          return true;
        }

        // Protect all other routes
        return !!token;
      },
    },
  }
);

// Routes to apply middleware
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // Protect all routes except static files
  ],
};
