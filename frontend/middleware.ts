// export { default } from "next-auth/middleware";

import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = await getToken({ req });

    // if (req.nextUrl.pathname.includes("/admins") && !token?.isSuperAdmin) {
    //   return NextResponse.rewrite(new URL("/adminpanel/unauthorized", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/"],
};
