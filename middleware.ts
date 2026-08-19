import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/app/_lib/supabase-middleware";

// middleware.ts
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute =
    pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isShopRoute = pathname.startsWith("/shop");

  if (!isAdminRoute && !isShopRoute) {
    return NextResponse.next();
  }

  const { response, session, user } = await updateSession(request);

  if (!session) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Extra check ONLY for admin routes — must be email/password login
  if (isAdminRoute) {
    const provider = user?.app_metadata?.provider;
    if (provider !== "email") {
      // Google OAuth user tried to hit admin — kick them out
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/shop/:path*"],
};
