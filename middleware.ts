import { NextRequest, NextResponse } from "next/server";
import { deleteCookiesAuth } from "./helpers";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === "/") {
  } else {
    const loginUrl = new URL("/", request.url);
    if (!request.cookies.has("expiresIn")) {
      return NextResponse.redirect(loginUrl);
    }

    if (!request.cookies.get("expiresIn")!.value) {
      deleteCookiesAuth(request);
      return NextResponse.redirect(loginUrl);
    }

    const currentTime = new Date();
    const expireTime = new Date(request.cookies.get("expiresIn")!.value);
    if (expireTime <= currentTime) {
      deleteCookiesAuth(request);
      return NextResponse.redirect(loginUrl);
    }
    // console.log(request.cookies.get("expiresIn")!.value);
  }
  return NextResponse.next();
}

export const config = {
  // matcher: [AppRoutes.dashboard],
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
