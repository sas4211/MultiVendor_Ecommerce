import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'


export default clerkMiddleware(async (auth, req) => {
  const protectedRoutes = createRouteMatcher(['/dashboard', "/dashboard/(.*)"]);
  // Restrict admin routes to users with specific permissions
  if (protectedRoutes(req)) {
    await auth.protect()
  }
})


export const config = {
  matcher: [
    // Skip static files and internal routes
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always apply to API routes
    "/(api|trpc)(.*)",
  ],
};
