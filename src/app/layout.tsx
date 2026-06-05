import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ipopreipo.com | World's Biggest IPO, Pre-IPO, Broker & Credit Card Platform",
  description: "Compare IPOs, Pre-IPOs, stock brokers, and credit cards across every country. Institutional-grade tracking, GMP data, allotment search, brokerage calculators and financial tools — all in one place.",
  keywords: "IPO, Pre-IPO, stock brokers, credit cards, GMP, allotment, brokerage, India, US, UK",
  authors: [{ name: "ipopreipo.com" }],
  metadataBase: new URL("https://ipopreipo.com"),
  openGraph: {
    siteName: "ipopreipo.com",
    title: "ipopreipo.com | IPO, Pre-IPO, Brokers & Credit Cards",
    description: "The world's biggest platform for IPOs, Pre-IPOs, Brokers and Credit Cards across every country.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
