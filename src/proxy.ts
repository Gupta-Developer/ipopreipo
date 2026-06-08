import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COUNTRIES = ["india", "united-states", "united-kingdom"];
const COUNTRY_MAP: Record<string, string> = {
  "in": "india",
  "india": "india",
  "us": "united-states",
  "united-states": "united-states",
  "gb": "united-kingdom",
  "uk": "united-kingdom",
  "united-kingdom": "united-kingdom"
};

const FEATURES = [
  "admin",
  "bank-accounts",
  "brokers",
  "calculator",
  "compare",
  "credit-card",
  "crypto",
  "ipo",
  "login",
  "news",
  "payment-apps",
  "preipo",
  "select",
  "sitemap"
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, internal Next.js files, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. Determine country code
  // Priority: 1. Cookie 'user-country' | 2. Header 'x-vercel-ip-country' or request.geo?.country | 3. Default 'india'
  let countryCode = request.cookies.get("user-country")?.value;
  if (!countryCode) {
    const geoCountry = request.headers.get("x-vercel-ip-country") || (request as any).geo?.country;
    if (geoCountry) {
      countryCode = geoCountry.toLowerCase();
    }
  }

  const countrySlug = (countryCode && COUNTRY_MAP[countryCode.toLowerCase()]) || "india";

  // 3. Parse pathname
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0) {
    const firstSegment = segments[0];

    // If the first segment is already a valid country slug, check for internal redundancy
    if (COUNTRIES.includes(firstSegment)) {
      let modified = false;
      const newSegments = segments.filter((seg, index) => {
        // Remove nested redundant country names (e.g. /india/bank-accounts/india -> /india/bank-accounts)
        if (index > 1 && COUNTRIES.includes(seg)) {
          modified = true;
          return false;
        }
        return true;
      });
      if (modified) {
        return NextResponse.redirect(new URL("/" + newSegments.join("/"), request.url));
      }
      return NextResponse.next();
    }

    // Check if the path starts with a feature
    if (FEATURES.includes(firstSegment)) {
      let targetCountry = countrySlug;
      let remainingSegments = segments.slice(1);

      // If there was an old country suffix (e.g. /bank-accounts/india), extract and use it
      if (segments[1] && COUNTRY_MAP[segments[1].toLowerCase()]) {
        targetCountry = COUNTRY_MAP[segments[1].toLowerCase()];
        remainingSegments = segments.slice(2);
      }

      const newPath = `/${targetCountry}/${firstSegment}${remainingSegments.length > 0 ? "/" + remainingSegments.join("/") : ""}`;
      
      const response = NextResponse.redirect(new URL(newPath, request.url));
      if (!request.cookies.get("user-country")) {
        response.cookies.set("user-country", targetCountry, { path: "/" });
      }
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
