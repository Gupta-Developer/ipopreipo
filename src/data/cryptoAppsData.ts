export interface CryptoAppLimits {
  dailyWithdrawal: string;
  minimumDeposit: string;
}

export interface CryptoAppCharges {
  makerFee: string;
  takerFee: string;
  withdrawalFee: string;
}

export interface CryptoAppDetail {
  slug: string;
  name: string;
  rating: number;
  activeUsers: string;
  likes: number;
  country: string; // "India", "United States", "United Kingdom", "Singapore"
  countrySlug: string;
  type: string; // "Exchange", "Broker / Exchange", "Exchange & Wallet"
  logoColor: string;
  logoLetter: string;
  summary: string;
  features: {
    spotTrading: boolean;
    futuresTrading: boolean;
    staking: boolean;
    wallet: boolean;
    fiatDeposit: boolean;
  };
  charges: CryptoAppCharges;
  limits: CryptoAppLimits;
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
    fees: string;
    onboarding: string;
    security: string;
  };
}

export const CRYPTO_APPS_DATA: CryptoAppDetail[] = [
  // --- INDIA CRYPTO APPS ---
  {
    slug: "coindcx",
    name: "CoinDCX",
    rating: 4.4,
    activeUsers: "15 Million+",
    likes: 720,
    country: "India",
    countrySlug: "india",
    type: "Exchange",
    logoColor: "#0066cc",
    logoLetter: "C",
    summary: "CoinDCX is India's leading crypto exchange, offering users a secure and simple platform to buy, sell, and trade over 500+ cryptocurrencies with low transaction fees.",
    features: { spotTrading: true, futuresTrading: true, staking: true, wallet: true, fiatDeposit: true },
    charges: {
      makerFee: "0.20% flat rate",
      takerFee: "0.20% flat rate",
      withdrawalFee: "Varies by token (e.g. 0.0005 BTC)"
    },
    limits: {
      dailyWithdrawal: "₹10,00,000 equivalent per day",
      minimumDeposit: "₹100 minimum deposit amount"
    },
    platforms: ["Android App", "iOS App", "Web Interface"],
    pros: [
      "Extremely simple instant buying interface for beginners",
      "High liquidity support for fast orders",
      "Complies with local FIU regulations and Tax Deducted at Source (TDS) reporting",
      "Robust Web3 integration and native staking yields"
    ],
    cons: [
      "Bank deposit processing can occasionally delay due to local banking rules",
      "Higher withdrawal charges on specific networks",
      "High TDS regulation compliance required under Indian tax laws"
    ],
    categoryRatings: {
      speed: 4.3,
      usability: 4.5,
      security: 4.4
    },
    detailedReview: {
      interface: "CoinDCX provides a clean white dashboard layout on desktop and modern blue-tinted dark mode menus on the app. The separation of simple investing and professional pro-trading tabs is well implemented.",
      fees: "Trading commissions are standard. Deposits are free via netbanking and UPI, while network transaction fees apply to outgoing blockchain transfers.",
      onboarding: "FIU regulatory compliance requires mandatory video-KYC, PAN card validation, and banking association setup, which takes under 15 minutes.",
      security: "Boasts ISO certifications, multi-signature wallet configurations, 2FA authorizations, and partnerships with global security firm BitGo."
    }
  },
  {
    slug: "wazirx",
    name: "WazirX",
    rating: 4.2,
    activeUsers: "12 Million+",
    likes: 580,
    country: "India",
    countrySlug: "india",
    type: "Exchange",
    logoColor: "#1a73e8",
    logoLetter: "W",
    summary: "WazirX is one of India's oldest and most popular cryptocurrency exchanges, featuring a robust peer-to-peer (P2P) fiat conversion engine.",
    features: { spotTrading: true, futuresTrading: false, staking: false, wallet: true, fiatDeposit: true },
    charges: {
      makerFee: "0.20% standard rate",
      takerFee: "0.20% standard rate",
      withdrawalFee: "Varies by token network"
    },
    limits: {
      dailyWithdrawal: "₹50,00,000 daily bank limit",
      minimumDeposit: "₹100 minimum ticket"
    },
    platforms: ["Android App", "iOS App", "Web Portal"],
    pros: [
      "Outstanding P2P fiat deposit/withdrawal engine",
      "Large local token pairings directory (INR / USDT / BTC)",
      "Instant internal utility transfer options"
    ],
    cons: [
      "Futures trading is currently limited",
      "Lacks native staking program on the core platform",
      "User interface feels slightly legacy compared to global alternatives"
    ],
    categoryRatings: {
      speed: 4.1,
      usability: 4.2,
      security: 4.1
    },
    detailedReview: {
      interface: "WazirX uses a dark themes model emphasizing exchange charts and ledger lines. Order booking menus are stacked neatly on the left-side columns.",
      fees: "Standard trading fee is 0.2%. Deposit fees vary depending on the chosen netbanking partner channel.",
      onboarding: "Instant onboarding using Indian Aadhar card registration and mobile text-codes validation.",
      security: "Includes typical 2FA checks, security passcode shields, and cold-storage system structures."
    }
  },

  // --- UNITED STATES CRYPTO APPS ---
  {
    slug: "coinbase",
    name: "Coinbase",
    rating: 4.7,
    activeUsers: "100 Million+",
    likes: 2890,
    country: "United States",
    countrySlug: "united-states",
    type: "Exchange & Wallet",
    logoColor: "#0052ff",
    logoLetter: "C",
    summary: "Coinbase is the premier regulated crypto platform in the United States, known for its focus on safety, security, compliance, and user-friendly interface.",
    features: { spotTrading: true, futuresTrading: true, staking: true, wallet: true, fiatDeposit: true },
    charges: {
      makerFee: "0.40% Advanced Trade",
      takerFee: "0.60% Advanced Trade",
      withdrawalFee: "Network gas fees only (ACH withdrawals are free)"
    },
    limits: {
      dailyWithdrawal: "$250,000 maximum daily bank limit",
      minimumDeposit: "$2.00 minimum transaction check"
    },
    platforms: ["iOS App", "Android App", "Web Portal"],
    pros: [
      "Top-tier institutional security compliance and FDIC balance protections",
      "Extremely user-friendly design for beginners, with Learn & Earn rewards",
      "Advanced Trade interface offers low-fee pro tooling features",
      "Seamless integrations with Coinbase Web3 Wallet ecosystem"
    ],
    cons: [
      "Standard buying fees can be very high for casual non-advanced users",
      "Customer service response times can be slow during high traffic volumes",
      "Strict account verification triggers can limit immediate accessibility"
    ],
    categoryRatings: {
      speed: 4.6,
      usability: 4.9,
      security: 4.8
    },
    detailedReview: {
      interface: "Coinbase has a masterfully designed premium interface. Finding assets, setting recurring purchases, and reviewing balances is fluid and visually appealing.",
      fees: "Standard transaction fees range from 1% to 3.99% based on payment method. Advanced Trade charges starting at 0.40%/0.60% maker/taker.",
      onboarding: "Fully KYC compliant with US SSN and photo ID check requirements, completed automatically within minutes.",
      security: "Holds state-of-the-art secure enclave key storage, 2FA, hardware key support, and offline cold storage vaults."
    }
  },
  {
    slug: "kraken",
    name: "Kraken",
    rating: 4.6,
    activeUsers: "10 Million+",
    likes: 1450,
    country: "United States",
    countrySlug: "united-states",
    type: "Exchange",
    logoColor: "#5842ad",
    logoLetter: "K",
    summary: "Kraken is a highly respected global cryptocurrency exchange, boasting advanced security controls, pro-trading features, and top-tier support.",
    features: { spotTrading: true, futuresTrading: true, staking: true, wallet: true, fiatDeposit: true },
    charges: {
      makerFee: "0.16% Pro rate",
      takerFee: "0.26% Pro rate",
      withdrawalFee: "Low network fees (e.g. 0.00002 BTC)"
    },
    limits: {
      dailyWithdrawal: "$500,000 daily limit (Pro tier)",
      minimumDeposit: "$1.00 minimum fiat ticket"
    },
    platforms: ["Android App", "iOS App", "Web Platform"],
    pros: [
      "Outstanding Pro trading terminal interface with charting metrics",
      "Competitive, transparent trading commission pricing structures",
      "Highly responsive 24/7 client live chat support team",
      "Proof of Reserves verification model published regularly"
    ],
    cons: [
      "Standard instant buying option is expensive for retail users",
      "Lacks simple local US debit card loading flexibility",
      "Pro interface has a slightly steeper learning curve"
    ],
    categoryRatings: {
      speed: 4.5,
      usability: 4.4,
      security: 4.9
    },
    detailedReview: {
      interface: "Kraken features a beautiful dark theme with custom illustrations. The exchange terminal interface is extremely powerful, supporting comprehensive API capabilities.",
      fees: "Charges starting at 0.16%/0.26% on Kraken Pro, scaling down aggressively based on monthly trading volume levels.",
      onboarding: "Straightforward verification, requiring proof of address and standard ID submissions.",
      security: "Historically one of the most secure exchanges globally, utilizing physical servers in locked enclosures and heavy cold asset shields."
    }
  },

  // --- UNITED KINGDOM CRYPTO APPS ---
  {
    slug: "binance-uk",
    name: "Binance",
    rating: 4.5,
    activeUsers: "180 Million+",
    likes: 3890,
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    type: "Exchange",
    logoColor: "#f3ba2f",
    logoLetter: "B",
    summary: "Binance is the world's largest cryptocurrency exchange by trading volume, providing users with premium liquidity, low trading fees, and massive asset availability.",
    features: { spotTrading: true, futuresTrading: true, staking: true, wallet: true, fiatDeposit: true },
    charges: {
      makerFee: "0.10% standard rate",
      takerFee: "0.10% standard rate",
      withdrawalFee: "Network specific fee"
    },
    limits: {
      dailyWithdrawal: "8,000,000 BUSD equivalent daily limit",
      minimumDeposit: "£10 minimum deposit amount"
    },
    platforms: ["iOS App", "Android App", "Desktop Software", "Web Platform"],
    pros: [
      "Extremely low trading fees (0.10%), with further BNB token holdings discount",
      "Premium trading charts, analytics tools, and automated API hooks",
      "Deepest liquidity market pools for large transactions",
      "Comprehensive Earn section supporting diverse staking options"
    ],
    cons: [
      "Regulatory restrictions on GBP card deposits depending on local bank policies",
      "Complex layout structure can overwhelm non-expert users",
      "Limited direct local customer phone support availability"
    ],
    categoryRatings: {
      speed: 4.8,
      usability: 4.2,
      security: 4.5
    },
    detailedReview: {
      interface: "Binance has both Lite and Professional app versions. The Pro version contains advanced order charts, order books, technical overlay widgets, and custom triggers.",
      fees: "Standard fee is 0.10%. 25% trading discount is available when paying fees using BNB tokens.",
      onboarding: "Global verification requires government-issued credentials and a live video face-scan, approved in under 30 minutes.",
      security: "Secured with automated 2FA controls, anti-phishing codes, strict withdrawal whitelist options, and the SAFU security fund."
    }
  },

  // --- SINGAPORE CRYPTO APPS ---
  {
    slug: "coinhako",
    name: "Coinhako",
    rating: 4.3,
    activeUsers: "4 Million+",
    likes: 410,
    country: "Singapore",
    countrySlug: "singapore",
    type: "Exchange & Wallet",
    logoColor: "#ff4d4d",
    logoLetter: "C",
    summary: "Coinhako is Singapore's favorite portal to access cryptocurrencies. It provides an extremely easy way to trade using local SGD bank channels like FAST.",
    features: { spotTrading: true, futuresTrading: false, staking: true, wallet: true, fiatDeposit: true },
    charges: {
      makerFee: "0.60% standard rate",
      takerFee: "0.60% standard rate",
      withdrawalFee: "$2.00 SGD flat bank withdrawal fee"
    },
    limits: {
      dailyWithdrawal: "$200,000 SGD daily limit",
      minimumDeposit: "$5.00 SGD minimum ticket"
    },
    platforms: ["Android App", "iOS App", "Web Portal"],
    pros: [
      "Highly optimized for Singapore residents with FAST bank transfers",
      "Fully regulated and licensed by the Monetary Authority of Singapore (MAS)",
      "Simple, modern user dashboard suitable for all age groups"
    ],
    cons: [
      "Trading fees (0.6%) are higher than global professional platforms",
      "Smaller coin listing selection compared to Binance or Kraken",
      "High transaction limits require advanced tier setup approvals"
    ],
    categoryRatings: {
      speed: 4.4,
      usability: 4.6,
      security: 4.6
    },
    detailedReview: {
      interface: "Coinhako uses a modern light/dark clean interface. Asset rows and values are styled with distinct clean typography suited for fast checks.",
      fees: "SGD transaction fees are flat-rate based. Deposits are free via standard FAST bank transfers.",
      onboarding: "Supports immediate verification using Singpass integration, allowing Singapore residents to open verified accounts in under 5 minutes.",
      security: "Compliant with MAS regulatory framework, featuring multi-signature authentication layers and local biometric locks."
    }
  }
];
