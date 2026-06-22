import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/proxy";

const protectedRoutes = ["/", "/new"];

function isProtectedRoute(pathname: string) {
  return protectedRoutes.includes(pathname) || pathname.startsWith("/folder/");
}

export async function proxy(request: NextRequest) {
  const { supabase, response } = createClient(request);

  const { data } = await supabase.auth.getUser();

  if (isProtectedRoute(request.nextUrl.pathname) && !data.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
