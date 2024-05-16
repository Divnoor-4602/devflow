import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/"]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-up(.*)",
  "/sign-in(.*)",
  "/questions/:id",
  "/tags",
  "/tags/:id",
  "/community",
  "/jobs",
  "/api/webhooks",
  "/api/chatgpt",
]);

export default clerkMiddleware((auth, req) => {
  !isPublicRoute(req) && auth().protect();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
    "/", // Run middleware on index page
    "/(api|trpc)(.*)",
  ], // Run middleware on API routes
};
