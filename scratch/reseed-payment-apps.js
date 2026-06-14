const fs = require('fs');
const path = require('path');
const { Pool } = require('@neondatabase/serverless');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
let databaseUrl = '';
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
  if (match) {
    databaseUrl = match[1];
  }
}

if (!databaseUrl) {
  console.error("DATABASE_URL not found in .env.local");
  process.exit(1);
}

const pool = new Pool({
  connectionString: databaseUrl,
});

const PAYMENT_APPS_DATA = [
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
    keyFeatures: [
      "Instant Bank-to-Bank money transfers using UPI",
      "Recharge prepaid mobile and pay postpaid utility bills",
      "Scan QR codes at offline stores to pay merchant accounts",
      "Invest in Gold, Mutual Funds, and insurance plans directly",
      "PhonePe Wallet for fast one-tap checkout transactions"
    ],
    charges: {
      walletLoading: "Free (via UPI/Debit card) | 1-2% via Credit cards",
      bankTransfer: "0% for standard UPI transactions",
      cardPayments: "Free for merchants | standard merchant discount rates apply",
      joiningBonus: "₹0",
      paymentSuccessRate: "99.4%",
      firstTransactionCashback: "Up to ₹50",
      chargesOnRecharge: "₹1 - ₹2 convenience fee",
      standardUpi: "₹0",
      upiRuPay: "₹0 for the consumer",
      mobileRecharges: "Up to ₹3 platform fee",
      utilityBills: "₹0 for most major billers",
      walletLoadingFees: "Free (via UPI/Debit) | 1-2% via Credit cards"
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
      security: "Secured using UPI PIN layers along with local device locks (fingerprint/face ID), complying fully with NPCI security recommendations.",
      cashbackRewards: "PhonePe offers scratch cards on transactions that provide cashback directly to the wallet or promotional vouchers for brands. It also runs seasonal game-based reward programs like PhonePe Shake."
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
    keyFeatures: [
      "Tez Mode for proximity payments using secure audio matching",
      "Direct Bank Account linkage with zero intermediate wallet fees",
      "Seamless Google ecosystem integration for bills and stores",
      "Split expenses easily with friends and groups",
      "Interactive transaction history linked to contacts"
    ],
    charges: {
      walletLoading: "Not Applicable (No native wallet model)",
      bankTransfer: "0% (Direct bank-to-bank via UPI)",
      cardPayments: "Free for personal transfers",
      joiningBonus: "₹21 (Referral)",
      paymentSuccessRate: "98.9%",
      firstTransactionCashback: "Flat ₹51 on first transaction",
      chargesOnRecharge: "Free",
      standardUpi: "₹0",
      upiRuPay: "₹0 for the consumer",
      mobileRecharges: "Free / No platform fee",
      utilityBills: "₹0 for most major billers",
      walletLoadingFees: "N/A (No native wallet model)"
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
      security: "Includes Google's standard security shielding, requiring a screen lock PIN or fingerprint pattern check before every transaction authorization.",
      cashbackRewards: "Google Pay is famous for its scratch cards and seasonal campaigns (like Diwali Stamps or Go India). Direct cashback is credited straight to the linked bank account, making it highly preferred over locked wallet points."
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
    keyFeatures: [
      "Secure global checkout accepted at millions of merchants online",
      "International multi-currency support and conversion options",
      "Pioneering Buyer and Seller Protection policy for secure transactions",
      "Link multiple bank accounts, debit cards, and credit cards",
      "Native support to purchase, hold, and sell Cryptocurrencies"
    ],
    charges: {
      walletLoading: "Free (via linked bank accounts) | 2.9% + $0.30 via credit cards",
      bankTransfer: "Free for standard transfers (1-3 days) | 1.75% for instant transfers",
      cardPayments: "Free for consumer purchases | 3.49% + $0.49 for merchant invoicing",
      joiningBonus: "$0",
      paymentSuccessRate: "99.9%",
      firstTransactionCashback: "Not Applicable",
      chargesOnRecharge: "Free",
      standardUpi: "N/A (Standard P2P: $0 via Bank/Linked balance)",
      upiRuPay: "N/A",
      mobileRecharges: "N/A",
      utilityBills: "N/A",
      walletLoadingFees: "Free (via bank accounts) | 2.9% + $0.30 via credit cards"
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
      security: "Employs heavy encryption, secure buyer protection shields, and multi-factor SMS/app code validation.",
      cashbackRewards: "PayPal offers cashback programs mainly via the PayPal Cashback Mastercard (offering 3% on PayPal checkouts) and merchant-specific discount deals in the Deals tab."
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
    keyFeatures: [
      "Social feed to share payments with custom emojis and texts",
      "Instant Cash-out to debit cards (for a small 1.75% fee)",
      "Free physical Venmo Debit Card option with direct cashback perks",
      "Split tabs and group utility bills in real time",
      "QR code scanning for fast P2P payments in person"
    ],
    charges: {
      walletLoading: "Free (bank/debit) | 3% for credit cards",
      bankTransfer: "Free (standard 1-3 business days) | 1.75% ($0.25 min, $25 max) for instant",
      cardPayments: "Free for purchases | 3% for credit card transfers to friends",
      joiningBonus: "$5",
      paymentSuccessRate: "99.5%",
      firstTransactionCashback: "$10 after first pay",
      chargesOnRecharge: "Free",
      standardUpi: "N/A (Standard P2P: $0 via Bank/Linked balance)",
      upiRuPay: "N/A",
      mobileRecharges: "N/A",
      utilityBills: "N/A",
      walletLoadingFees: "Free (bank/debit) | 3% for credit cards"
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
      security: "Protected by PIN codes, biometric checks, and automated notifications for any login or device change events.",
      cashbackRewards: "Venmo provides targeted cashback rewards through the Venmo Debit Card at select retailers, automatically credited back to your Venmo balance. They also offer a Venmo Credit Card with custom cashback categories."
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
    keyFeatures: [
      "Multi-currency accounts supporting instant FX currency exchange",
      "Disposable virtual cards for safe online shopping checkout",
      "Automated budgeting analytics and savings Vaults",
      "Interest-bearing savings accounts and fractional stock trading",
      "Instant free global transfers to any other Revolut user"
    ],
    charges: {
      walletLoading: "Free (bank transfer or local debit cards)",
      bankTransfer: "Free (Local GBP and SEPA transfers)",
      cardPayments: "Free for purchases | FX conversion margins apply during weekends",
      joiningBonus: "£10",
      paymentSuccessRate: "99.8%",
      firstTransactionCashback: "Not Applicable",
      chargesOnRecharge: "Free",
      standardUpi: "N/A (Standard P2P: £0 / Free)",
      upiRuPay: "N/A",
      mobileRecharges: "N/A",
      utilityBills: "N/A",
      walletLoadingFees: "Free (bank transfer or local debit cards)"
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
      security: "Licensed in various European jurisdictions with multi-signature protocols, face verification, and immediate card freezing settings.",
      cashbackRewards: "Revolut offers 'RevPoints' and 'Shops' cashback, allowing users to earn cashback at partner brands when checking out. Premium/Metal tier subscribers get higher cashback rates on international card spending."
    }
  }
];

async function main() {
  try {
    console.log("Truncating payment_apps table...");
    await pool.query("TRUNCATE TABLE payment_apps RESTART IDENTITY;");

    console.log("Seeding updated payment apps...");
    for (const app of PAYMENT_APPS_DATA) {
      await pool.query(
        `INSERT INTO payment_apps (
          slug, name, rating, active_users, likes, country, country_slug, type,
          logo_color, logo_letter, summary, features, charges, limits,
          platforms, pros, cons, category_ratings, detailed_review, detailed_article, status, added_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`,
        [
          app.slug,
          app.name,
          app.rating,
          app.activeUsers,
          app.likes,
          app.country,
          app.countrySlug,
          app.type,
          app.logoColor,
          app.logoLetter,
          app.summary,
          JSON.stringify(app.features),
          JSON.stringify(app.charges),
          JSON.stringify(app.limits),
          app.platforms,
          app.pros,
          app.cons,
          JSON.stringify(app.categoryRatings),
          JSON.stringify(app.detailedReview),
          app.detailedArticle ? JSON.stringify(app.detailedArticle) : null,
          "approved",
          "seed@ipopreipo.com",
        ]
      );
    }
    console.log("Reseed completed successfully!");
  } catch (err) {
    console.error("Reseed failed:", err);
  } finally {
    await pool.end();
  }
}

main();
