import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
      apiRoutes: ['/(api|trpc)(.*)'],
      afterAuth(auth, req, evt) {
            if (auth.isApiRoute || auth.isPublicRoute) {
                  return NextResponse.next();
            }
            if (!auth.userId && !auth.isPublicRoute) {
                  return redirectToSignIn({ returnBackUrl: req.url });
            }
      }
});

export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
