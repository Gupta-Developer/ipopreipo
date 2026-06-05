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

const SELECT_FEATURES = [
  "bank-accounts",
  "brokers",
  "calculator",
  "compare",
  "credit-card",
  "crypto",
  "payment-apps",
  "select"
];

const MAIN_FEATURES = [
  "ipo",
  "preipo",
  "login",
  "signup"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const isSelectSubdomain = host.startsWith("select.");
  const isLocal = host.includes("localhost");

  const mainDomain = isLocal ? "localhost:3000" : "ipopreipo.vercel.app";
  const selectDomain = isLocal ? "select.localhost:3000" : "select.ipopreipo.vercel.app";
  const protocol = isLocal ? "http" : "https";

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
  const firstSegment = segments[0];

  // A. IF WE ARE ON THE MAIN DOMAIN: Redirect select features to the select subdomain
  if (!isSelectSubdomain) {
    if (firstSegment === "select") {
      const remaining = segments.slice(1);
      const targetCountry = (remaining[0] && COUNTRIES.includes(remaining[0])) ? remaining[0] : countrySlug;
      return NextResponse.redirect(new URL(`${protocol}://${selectDomain}/${targetCountry}`, request.url));
    }

    if (COUNTRIES.includes(firstSegment)) {
      const secondSegment = segments[1];
      if (secondSegment && SELECT_FEATURES.includes(secondSegment)) {
        // e.g. /india/bank-accounts -> redirect to select.ipopreipo.vercel.app/india/bank-accounts
        const newSegments = segments.filter((seg, index) => !(index > 1 && COUNTRIES.includes(seg)));
        return NextResponse.redirect(new URL(`${protocol}://${selectDomain}/${newSegments.join("/")}`, request.url));
      }
    } else if (firstSegment && SELECT_FEATURES.includes(firstSegment)) {
      // e.g. /bank-accounts -> redirect to select.ipopreipo.vercel.app/india/bank-accounts
      let targetCountry = countrySlug;
      let remainingSegments = segments.slice(1);
      if (segments[1] && COUNTRY_MAP[segments[1].toLowerCase()]) {
        targetCountry = COUNTRY_MAP[segments[1].toLowerCase()];
        remainingSegments = segments.slice(2);
      }
      return NextResponse.redirect(new URL(`${protocol}://${selectDomain}/${targetCountry}/${firstSegment}${remainingSegments.length > 0 ? "/" + remainingSegments.join("/") : ""}`, request.url));
    }
  }

  // B. IF WE ARE ON THE SELECT SUBDOMAIN:
  if (isSelectSubdomain) {
    // Subdomain root redirect to /countrySlug/select internally
    if (pathname === "/" || pathname === "") {
      const response = NextResponse.rewrite(new URL(`/${countrySlug}/select`, request.url));
      if (!request.cookies.get("user-country")) {
        response.cookies.set("user-country", countrySlug, { path: "/" });
      }
      return response;
    }

    if (COUNTRIES.includes(firstSegment)) {
      // If they request country Slug directly, e.g. select.ipopreipo.vercel.app/india
      if (segments.length === 1) {
        const response = NextResponse.rewrite(new URL(`/${firstSegment}/select`, request.url));
        if (!request.cookies.get("user-country")) {
          response.cookies.set("user-country", firstSegment, { path: "/" });
        }
        return response;
      }

      // If they request a main feature on the subdomain, redirect to main domain
      const secondSegment = segments[1];
      if (secondSegment && MAIN_FEATURES.includes(secondSegment)) {
        return NextResponse.redirect(new URL(`${protocol}://${mainDomain}/${firstSegment}/${secondSegment}`, request.url));
      }
    } else if (firstSegment && MAIN_FEATURES.includes(firstSegment)) {
      // e.g. select.ipopreipo.vercel.app/ipo -> redirect to ipopreipo.vercel.app/india/ipo
      return NextResponse.redirect(new URL(`${protocol}://${mainDomain}/${countrySlug}/${firstSegment}`, request.url));
    }
  }

  // C. Fallback default country checks and redundant checks
  if (segments.length > 0 && COUNTRIES.includes(firstSegment)) {
    let modified = false;
    const newSegments = segments.filter((seg, index) => {
      if (index > 1 && COUNTRIES.includes(seg)) {
        modified = true;
        return false;
      }
      return true;
    });
    if (modified) {
      return NextResponse.redirect(new URL("/" + newSegments.join("/"), request.url));
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
