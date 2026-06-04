export interface AppLimits {
  dailyLimit: string;
  transactionLimit: string;
}

export interface AppCharges {
  walletLoading: string;
  bankTransfer: string;
  cardPayments: string;
}

export interface PaymentAppDetail {
  slug: string;
  name: string;
  rating: number;
  activeUsers: string;
  likes: number;
  country: string; // "India", "United States", "United Kingdom"
  countrySlug: string; // "india", "united-states", "united-kingdom"
  type: string;
  logoColor: string;
  logoLetter: string;
  summary: string;
  features: {
    upi: boolean;
    wallet: boolean;
    bankTransfer: boolean;
    cards: boolean;
    international: boolean;
  };
  charges: AppCharges;
  limits: AppLimits;
  platforms: string[];
  pros: string[];
  cons: string[];
  categoryRatings: {
    speed: number;
    usability: number;
    security: number;
  };
  detailedReview: {
    interface: string;
    charges: string;
    onboarding: string;
    security: string;
  };
}

export const PAYMENT_APPS_DATA: PaymentAppDetail[] = [
  // --- INDIA PAYMENT APPS ---
  {
    slug: "phonepe",
    name: "PhonePe",
    rating: 4.6,
    activeUsers: "450 Million+",
    likes: 2450,
    country: "India",
    countrySlug: "india",
    type: "UPI & Wallet",
    logoColor: "#5f259f",
    logoLetter: "P",
    summary: "PhonePe is India's leading digital payments app, built on top of the Unified Payments Interface (UPI). It offers super-fast money transfers, bills payments, merchant checks, and gold investing features.",
    features: { upi: true, wallet: true, bankTransfer: true, cards: true, international: false },
    charges: {
      walletLoading: "Free (via UPI/Debit card) | 1-2% via Credit cards",
      bankTransfer: "0% for standard UPI transactions",
      cardPayments: "Free for merchants | standard merchant discount rates apply"
    },
    limits: {
      dailyLimit: "₹1,00,000 max (standard UPI daily cap)",
      transactionLimit: "₹1,00,000 per transaction"
    },
    platforms: ["Android App", "iOS App"],
    pros: [
      "Extremely reliable transaction success rate on UPI",
      "Comprehensive utility bill and mobile recharge integration",
      "Highly responsive and minimal user interface",
      "Seamless support for multiple linked bank accounts"
    ],
    cons: [
      "Wallet to bank transfer incurs a small convenience fee",
      "Frequent promotional notifications and advertising banners inside app",
      "No support for desktop payments (mobile-only ecosystem)"
    ],
    categoryRatings: {
      speed: 4.8,
      usability: 4.6,
      security: 4.5
    },
    detailedReview: {
      interface: "PhonePe features a clean violet-themed interface. Its navigation is extremely straightforward, with primary actions like 'To Contact' and 'To Account' clearly mapped on the landing home dashboard.",
      charges: "Standard UPI transfers on PhonePe are entirely free. The app charges tiny convenience fees for mobile recharges and bill payments (typically ₹1 - ₹2 per transaction) to sustain operations.",
      onboarding: "Onboarding requires a valid Indian mobile number linked to a bank account. Sim verification occurs instantly, followed by automatic bank mapping via UPI queries.",
      security: "Secured using UPI PIN layers along with local device locks (fingerprint/face ID), complying fully with NPCI security recommendations."
    }
  },
  {
    slug: "google-pay",
    name: "Google Pay",
    rating: 4.5,
    activeUsers: "380 Million+",
    likes: 1980,
    country: "India",
    countrySlug: "india",
    type: "UPI Payments",
    logoColor: "#4285f4",
    logoLetter: "G",
    summary: "Google Pay (formerly Tez) uses UPI to directly transfer money from your bank account. It features a unique scratch card reward module and integrates directly into the Google ecosystem.",
    features: { upi: true, wallet: false, bankTransfer: true, cards: true, international: false },
    charges: {
      walletLoading: "Not Applicable (No native wallet model)",
      bankTransfer: "0% (Direct bank-to-bank via UPI)",
      cardPayments: "Free for personal transfers"
    },
    limits: {
      dailyLimit: "₹1,00,000 / 10 transactions daily limit",
      transactionLimit: "₹1,00,000 max per ticket"
    },
    platforms: ["Android App", "iOS App"],
    pros: [
      "Direct bank-to-bank transfers without holding intermediate wallet funds",
      "Clean Material Design UI without intrusive advertising banners",
      "Strong reward programs with direct cashback scratch cards",
      "Integrated search index for local retail shops and bill companies"
    ],
    cons: [
      "Occasional transactional sync delays during NPCI server congestions",
      "Requires high-speed internet connection for smooth page rendering",
      "Lacks utility wallet models for fast micro-transactions under ₹10"
    ],
    categoryRatings: {
      speed: 4.4,
      usability: 4.7,
      security: 4.6
    },
    detailedReview: {
      interface: "Google Pay boasts a modern Material You interface. The app displays recent contacts as circle avatars, making recurring money requests very intuitive.",
      charges: "Since it is a direct UPI application, Google Pay does not charge any service fees for consumer-to-consumer money transfers or standard merchant payouts.",
      onboarding: "Simple onboarding using Google Account details and standard Indian mobile number lookup. UPI setup maps virtual addresses in under a minute.",
      security: "Includes Google's standard security shielding, requiring a screen lock PIN or fingerprint pattern check before every transaction authorization."
    }
  },
  
  // --- UNITED STATES PAYMENT APPS ---
  {
    slug: "paypal",
    name: "PayPal",
    rating: 4.4,
    activeUsers: "430 Million+",
    likes: 3120,
    country: "United States",
    countrySlug: "united-states",
    type: "Digital Wallet",
    logoColor: "#003087",
    logoLetter: "P",
    summary: "PayPal is the pioneer of online payment systems, allowing users to send money globally, link cards/accounts, and checkout securely on millions of e-commerce web platforms.",
    features: { upi: false, wallet: true, bankTransfer: true, cards: true, international: true },
    charges: {
      walletLoading: "Free (via linked bank accounts) | 2.9% + $0.30 via credit cards",
      bankTransfer: "Free for standard transfers (1-3 days) | 1.75% for instant transfers",
      cardPayments: "Free for consumer purchases | 3.49% + $0.49 for merchant invoicing"
    },
    limits: {
      dailyLimit: "$10,000 max per single transaction limit",
      transactionLimit: "$60,000 total weekly verified limit"
    },
    platforms: ["Web Interface", "Android App", "iOS App"],
    pros: [
      "Vast international network supporting multi-currency cross-border transactions",
      "Industry-leading Buyer Protection and dispute resolution mechanisms",
      "Highly integrated checkout module on global commercial websites",
      "Supports native crypto purchasing and holding inside wallet"
    ],
    cons: [
      "High transaction fees for receiving commercial payments",
      "Strict account lock policies on suspicious transaction behaviors",
      "Foreign exchange conversion markups can be expensive"
    ],
    categoryRatings: {
      speed: 4.2,
      usability: 4.3,
      security: 4.8
    },
    detailedReview: {
      interface: "PayPal's interface is professional and utility-oriented. The web interface is clean, showing balance trackers, active currencies, and recent activity logs clearly.",
      charges: "Standard transfers to bank accounts are free but take 1-3 business days. Immediate transfers to debit cards carry a 1.75% fee, capped at $25.",
      onboarding: "Registration involves checking email, SSN checks for US residents, and linking bank accounts via routing/account numbers.",
      security: "Employs heavy encryption, secure buyer protection shields, and multi-factor SMS/app code validation."
    }
  },
  {
    slug: "venmo",
    name: "Venmo",
    rating: 4.5,
    activeUsers: "90 Million+",
    likes: 1890,
    country: "United States",
    countrySlug: "united-states",
    type: "Social Payments",
    logoColor: "#008CFF",
    logoLetter: "V",
    summary: "Venmo is a popular peer-to-peer payment app owned by PayPal. It features a unique social feed where friends can share transaction descriptions with emojis and comments.",
    features: { upi: false, wallet: true, bankTransfer: true, cards: true, international: false },
    charges: {
      walletLoading: "Free (bank/debit) | 3% for credit cards",
      bankTransfer: "Free (standard 1-3 business days) | 1.75% ($0.25 min, $25 max) for instant",
      cardPayments: "Free for purchases | 3% for credit card transfers to friends"
    },
    limits: {
      dailyLimit: "$4,999.99 rolling weekly limit for peer-to-peer transfers",
      transactionLimit: "$2,999.99 single transaction limit"
    },
    platforms: ["Android App", "iOS App"],
    pros: [
      "Social-first design that makes splitting bills and tabs fun and easy",
      "Zero fees for standard peer-to-peer transactions using bank accounts",
      "Widespread usage among college students and retail consumers in the US",
      "Includes a free Mastercard debit card option with cashbacks"
    ],
    cons: [
      "Privacy concerns over the default public visibility of transactions",
      "Limited to US residents with US bank accounts and phone numbers",
      "No support for international payments or foreign currency handling"
    ],
    categoryRatings: {
      speed: 4.5,
      usability: 4.8,
      security: 4.3
    },
    detailedReview: {
      interface: "Venmo is designed around a social feed. Users send money with notes like 'Thanks for dinner 🍕' and can view, like, and comment on public transactions from friends.",
      charges: "Standard bank transfers and peer-to-peer transactions are completely free. Users pay a premium (1.75%) only for immediate cash-outs to debit cards.",
      onboarding: "Simple mobile sign-up validating a US phone number, followed by direct linking of bank accounts via Plaid or manual micro-deposits.",
      security: "Protected by PIN codes, biometric checks, and automated notifications for any login or device change events."
    }
  },

  // --- UNITED KINGDOM PAYMENT APPS ---
  {
    slug: "revolut",
    name: "Revolut",
    rating: 4.7,
    activeUsers: "40 Million+",
    likes: 2110,
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    type: "Neobank & Payments",
    logoColor: "#ffffff",
    logoLetter: "R",
    summary: "Revolut is a global financial super-app headquartered in the UK. It offers multi-currency banking, immediate peer-to-peer transfers, budgeting metrics, and zero-fee FX currency exchanges.",
    features: { upi: false, wallet: true, bankTransfer: true, cards: true, international: true },
    charges: {
      walletLoading: "Free (bank transfer or local debit cards)",
      bankTransfer: "Free (Local GBP and SEPA transfers)",
      cardPayments: "Free for purchases | FX conversion margins apply during weekends"
    },
    limits: {
      dailyLimit: "£100,000 maximum daily bank transfer limit",
      transactionLimit: "£50,000 per transaction cap"
    },
    platforms: ["iOS App", "Android App", "Web Portal"],
    pros: [
      "Outstanding multi-currency support with interbank exchange rates",
      "Advanced budgeting tools, vaults, and financial analytics dashboard",
      "Instant free transfers to other Revolut users globally",
      "Disposable virtual cards for secure online shopping checkouts"
    ],
    cons: [
      "Additional fee (0.5% to 1.0%) for weekend currency exchanges",
      "Lacks physical bank branch offices for in-person support",
      "Advanced features locked behind monthly subscription tiers"
    ],
    categoryRatings: {
      speed: 4.7,
      usability: 4.8,
      security: 4.7
    },
    detailedReview: {
      interface: "Revolut features a clean dark/light mode interface. The app allows swift navigation between card controls, currency accounts, vaults, and active crypto/stock investments.",
      charges: "Base account usage is free. Currency exchanges are free up to £1,000 per month on the standard tier. Premium subscription plans range from £2.99 to £12.99 per month.",
      onboarding: "Requires a UK/EU residency check. Onboarding involves taking a photo of a passport or driver's license and a quick selfie validation.",
      security: "Licensed in various European jurisdictions with multi-signature protocols, face verification, and immediate card freezing settings."
    }
  }
];
