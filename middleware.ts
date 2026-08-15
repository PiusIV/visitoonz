// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/app/_lib/supabase-middleware";

export async function middleware(request: NextRequest) {
  // console.log(
  //   "PROXY RUNNING:",
  //   request.nextUrl.pathname,
  //   request.cookies.getAll(),
  // );
  const { pathname } = request.nextUrl;

  const isAdminRoute =
    pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isShopRoute = pathname.startsWith("/shop");

  if (!isAdminRoute && !isShopRoute) {
    return NextResponse.next();
  }

  const { response, session } = await updateSession(request);

  if (!session) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/shop/:path*"],
};
