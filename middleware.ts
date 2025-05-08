import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { NextResponse } from "next/server";
import { api } from "./convex/_generated/api";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Get the current authentication state
  const authState = await auth();
  const isAuthenticated = !!authState.userId;

  try {
    const token = await authState.getToken({ template: "convex" });

    // Check if user has an active subscription
    let hasActiveSubscription = false;
    try {
      const result = await fetchQuery(
        api.subscriptions.getUserSubscriptionStatus,
        {},
        {
          token: token!,
        }
      );
      hasActiveSubscription = result.hasActiveSubscription;
    } catch (error) {
      console.error("Failed to fetch subscription status:", error);
      // Default to no subscription on error
      hasActiveSubscription = false;
    }

    // Check if the request is for the home page
    const isHomePage = req.nextUrl.pathname === "/";

    // Check if the request is for a dashboard page
    const isDashboard = req.nextUrl.href.includes(`/dashboard`);

    // If user is authenticated and has an active subscription and is on the home page,
    // redirect them to their personalized dashboard
    if (isAuthenticated && hasActiveSubscription && isHomePage) {
      const dashboardUrl = new URL("/dashboard", req.nextUrl.origin);
      return NextResponse.redirect(dashboardUrl);
    }

    // If user is trying to access dashboard but doesn't have an active subscription,
    // redirect them to the pricing page
    if (isDashboard && !hasActiveSubscription) {
      const pricingUrl = new URL("/pricing", req.nextUrl.origin);
      return NextResponse.redirect(pricingUrl);
    }

    // Protect dashboard routes
    if (isProtectedRoute(req)) await auth.protect();
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, redirect to home page
    if (req.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
