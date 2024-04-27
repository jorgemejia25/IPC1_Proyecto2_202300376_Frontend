import { NextRequest, NextResponse } from "next/server";

import { VerifyUserResponse } from "./utils/types/response/verifyUserResponse";
import fetchWithCredentials from "./utils/auth/fetchWithCredentials";
import { redirect } from "next/dist/server/api-utils";

export async function middleware(request: NextRequest) {
  const redirectUrl = new URL("/auth/login", request.url);

  const token = request.cookies.get("token");
  const role = request.cookies.get("role")?.value;

  if (!token) {
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const userResponse = await fetchWithCredentials<VerifyUserResponse>(
      "/auth/me",
      {},
      request
    );

    if (userResponse.statusCode === 200) {
      const res = NextResponse.next();

      res.cookies.set("id", userResponse.data._id);
      res.cookies.set("code", userResponse.data.code.toString());
      res.cookies.set("role", userResponse.data.role);

      if (
        request.nextUrl.pathname.startsWith("/dashboard/admin") &&
        role !== "admin"
      ) {
        return NextResponse.redirect(redirectUrl);
      }

      return res;
    }
  } catch (error) {
    console.error(error);
  }

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    { source: "/dashboard/:path*" },
    {
      source: "/admin/:path*",
    },
  ],
};
