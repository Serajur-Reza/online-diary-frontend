import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { isTokenValid } from "./utils/auth";
import { publicRoutes } from "./constants/constants";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  // return NextResponse.redirect(new URL("/home", request.url));
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const refreshToken = cookieStore?.get("refreshToken");

  // console.log("path from middleware", refreshToken);

  const isValid = isTokenValid(refreshToken?.value as string);

  // console.log("valdi toke fromm middleware", isValid);

  if (isValid && pathname === "/") {
    console.log("valid token", isValid && pathname === "/");
    const home = new URL("/home", request.url);
    return NextResponse.redirect(home);
  }

  if (!isValid && !publicRoutes.includes(pathname)) {
    console.log("invalid token", !isValid && !publicRoutes.includes(pathname));
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check if the user is trying to access an admin page without a session
  // if (pathname.startsWith("/admin")) {
  //   // Redirect to the login page
  //   const loginUrl = new URL("/login", request.url);
  //   return NextResponse.redirect(loginUrl);
  // }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// export const config = {
//   matcher: "/about/:path*",
// };
