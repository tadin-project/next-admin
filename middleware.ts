import { NextRequest, NextResponse } from "next/server";
import { deleteCookiesAuth, verifyToken } from "./helpers";
import { TemplateResponse } from "./types/api/TemplateResponse";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === "/") {
  } else {
    const loginUrl = new URL("/", request.url);
    if (!request.cookies.has("token")) {
      return NextResponse.redirect(loginUrl);
    }

    if (!request.cookies.get("token")!.value) {
      deleteCookiesAuth();
      return NextResponse.redirect(loginUrl);
    }

    const checkToken: TemplateResponse = await verifyToken(request);
    if (checkToken.error) {
      deleteCookiesAuth();
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  // matcher: [AppRoutes.dashboard],
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
