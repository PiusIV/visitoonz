// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const response = NextResponse.next(); // const instead of let

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(
            cookiesToSet: { name: string; value: string; options?: object }[],
          ) {
            cookiesToSet.forEach(({ name, value }) =>
              response.cookies.set(name, value),
            );
          },
        },
      },
    );

    // const {
    //   data: { session },
    // } = await supabase.auth.getSession();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // redirect back to login if user is not logged in
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return response; // return response so cookies persist
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
