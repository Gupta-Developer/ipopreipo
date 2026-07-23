import { PaymentAppData } from "@/types/finance";

export const MOCK_PAYMENT_APPS: PaymentAppData[] = [
  {
    id: "p1",
    slug: "phonepe",
    name: "PhonePe UPI & Payments",
    developer: "PhonePe India Pvt. Ltd.",
    downloadsTier: "500M+ Downloads",
    playStoreRating: 4.6,
    appStoreRating: 4.7,
    upiLiteSupport: true,
    ruPayUpiSupport: true,
    creditScoreCheckFree: true,
    cashbackPolicy: "Scratch cards, brand discount vouchers, and merchant cashbacks.",
    keyFeatures: [
      "UPI payments & instant bank transfers",
      "RuPay Credit Card linking for merchant UPI payments",
      "UPI Lite for PIN-less micro-payments up to ₹500",
      "Mutual Fund & Insurance distribution platform",
      "FASTag recharges, electricity & mobile bill payments"
    ],
    pros: [
      "Highest UPI transaction success rate in India.",
      "Extensive offline merchant QR acceptance everywhere.",
      "Clean, responsive user interface."
    ],
    cons: [
      "Direct wallet cashbacks replaced largely by merchant vouchers."
    ],
    downloadUrl: "https://www.phonepe.com"
  },
  {
    id: "p2",
    slug: "google-pay",
    name: "Google Pay (GPay)",
    developer: "Google LLC",
    downloadsTier: "500M+ Downloads",
    playStoreRating: 4.5,
    appStoreRating: 4.6,
    upiLiteSupport: true,
    ruPayUpiSupport: true,
    creditScoreCheckFree: true,
    cashbackPolicy: "Direct bank transfer cashbacks and rewards cards.",
    keyFeatures: [
      "NPCI-backed secure UPI 2.0 transaction engine",
      "RuPay credit card on UPI integration",
      "Free credit score tracking report",
      "Split bills with friends and group expense tracking",
      "Tap & Pay NFC payments on supported smartphones"
    ],
    pros: [
      "Direct-to-bank cashback credits.",
      "Seamless integration with Android & Google account security.",
      "No pop-up ads or clutter."
    ],
    cons: [
      "Occasional bank server timeout errors during peak hours."
    ],
    downloadUrl: "https://pay.google.com"
  },
  {
    id: "p3",
    slug: "cred",
    name: "CRED: Credit Card & UPI",
    developer: "Dreamplug Technologies",
    downloadsTier: "50M+ Downloads",
    playStoreRating: 4.7,
    appStoreRating: 4.8,
    upiLiteSupport: false,
    ruPayUpiSupport: true,
    creditScoreCheckFree: true,
    cashbackPolicy: "CRED coins, cashback on credit card bill payments, and luxury rewards.",
    keyFeatures: [
      "Credit card bill management & hidden charge alert detector",
      "CRED Pay UPI with high cashback rewards for high-credit users",
      "FREE CIBIL & Experian credit score monitor",
      "CRED Cash low-interest personal pre-approved credit line",
      "Curated shopping & travel deals"
    ],
    pros: [
      "Premium interface designed for creditworthy users (750+ score).",
      "Timely bill reminders & hidden bank fee alerts.",
      "High reward value on credit card bill payments."
    ],
    cons: [
      "Requires credit score of 750+ to join platform."
    ],
    downloadUrl: "https://cred.club"
  },
  {
    id: "p4",
    slug: "paytm",
    name: "Paytm: UPI, Bills & Fastag",
    developer: "One97 Communications",
    downloadsTier: "500M+ Downloads",
    playStoreRating: 4.4,
    appStoreRating: 4.5,
    upiLiteSupport: true,
    ruPayUpiSupport: true,
    creditScoreCheckFree: true,
    cashbackPolicy: "Paytm points, travel discounts, and cashback vouchers.",
    keyFeatures: [
      "Multi-bank UPI handle integration",
      "FASTag management & NCMC transit cards",
      "Movie & flight booking ticketing ecosystem",
      "Free credit report analysis"
    ],
    pros: [
      "All-in-one super app for travel, movies, and utility bills.",
      "Widespread soundbox merchant network."
    ],
    cons: [
      "App home screen can feel slightly crowded."
    ],
    downloadUrl: "https://paytm.com"
  }
];
