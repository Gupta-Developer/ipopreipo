export interface BankDetail {
  slug: string;
  name: string;
  rating: number;
  activeUsers: string;
  likes: number;
  country: string;
  countrySlug: string;
  type: string; // "Traditional Savings", "Digital Account", "Neobank"
  logoColor: string;
  logoLetter: string;
  summary: string;
  features: {
    digitalOnboarding: boolean;
    mobileApp: boolean;
    freeDebitCard: boolean;
    highInterest: boolean;
    zeroBalance: boolean;
  };
  charges: {
    minimumBalance: string;
    maintenanceFee: string;
    atmWithdrawal: string;
    foreignExchange: string;
  };
  interestRate: string;
  platforms: string[];
  pros: string[];
  cons: string[];
  categoryRatings: {
    rates: number;
    usability: number;
    customerService: number;
  };
  detailedReview: {
    onboarding: string;
    fees: string;
    features: string;
    service: string;
  };
}

export const BANKS_DATA: BankDetail[] = [
  // --- INDIA BANKS ---
  {
    slug: "sbi-savings",
    name: "State Bank of India (SBI)",
    rating: 4.1,
    activeUsers: "480 Million+",
    likes: 840,
    country: "India",
    countrySlug: "india",
    type: "Traditional Savings",
    logoColor: "#00b2ec",
    logoLetter: "S",
    summary: "SBI is the largest public sector bank in India. Known for its unparalleled trust and massive physical branch network, it provides robust traditional savings accounts with offline and online capabilities.",
    features: {
      digitalOnboarding: true,
      mobileApp: true,
      freeDebitCard: false,
      highInterest: false,
      zeroBalance: false
    },
    charges: {
      minimumBalance: "₹0 (Waived, previously ₹3,000)",
      maintenanceFee: "₹125/year for Classic Debit Card",
      atmWithdrawal: "5 free withdrawals/month, then ₹20+GST per tx",
      foreignExchange: "3.5% markup fee"
    },
    interestRate: "2.70% per annum",
    platforms: ["YONO SBI App", "SBI Online Portal"],
    pros: [
      "Highest reliability and government backing safety",
      "Vast physical branch and ATM network across India",
      "No monthly average balance penalty charges"
    ],
    cons: [
      "Relatively low interest rates compared to private/digital banks",
      "Physical branch wait times are notoriously long",
      "Customer service response times can be sluggish"
    ],
    categoryRatings: {
      rates: 2.8,
      usability: 3.9,
      customerService: 3.5
    },
    detailedReview: {
      onboarding: "Can be opened online via YONO app using Video KYC, but full active services sometimes require visiting a home branch for physical signature records.",
      fees: "Extremely low transaction charges. SBI removed the minimum average balance penalty, making it highly accessible to the general public.",
      features: "The YONO app bundles banking, investments, shopping, and utility bill payments into one platform, though the app UI can sometimes experience heavy load.",
      service: "Highly secure but bureaucratic. Online issue resolution is available, but branch visits remain necessary for complex tasks."
    }
  },
  {
    slug: "hdfc-savings",
    name: "HDFC Bank",
    rating: 4.5,
    activeUsers: "120 Million+",
    likes: 950,
    country: "India",
    countrySlug: "india",
    type: "Traditional Savings",
    logoColor: "#004b87",
    logoLetter: "H",
    summary: "HDFC Bank is India's leading private sector bank. It offers premium banking features, advanced digital services, and a comprehensive ecosystem for shopping, credit cards, and investments.",
    features: {
      digitalOnboarding: true,
      mobileApp: true,
      freeDebitCard: false,
      highInterest: true,
      zeroBalance: false
    },
    charges: {
      minimumBalance: "₹10,000 (Urban) / ₹5,000 (Semi-Urban)",
      maintenanceFee: "₹150/year for standard debit cards",
      atmWithdrawal: "5 free withdrawals/month at HDFC ATMs",
      foreignExchange: "2.0% to 3.5% markup depending on card tier"
    },
    interestRate: "3.00% to 3.50% p.a.",
    platforms: ["HDFC MobileBanking App", "HDFC NetBanking Web"],
    pros: [
      "Exceptional digital banking speed and reliability",
      "Excellent customer support and dedicated relationship manager services",
      "Top-tier credit card and loan offers linked to the account"
    ],
    cons: [
      "Strict minimum average balance requirement",
      "Charges for non-maintenance of balance can be high",
      "Debit cards have annual maintenance fees"
    ],
    categoryRatings: {
      rates: 3.5,
      usability: 4.5,
      customerService: 4.3
    },
    detailedReview: {
      onboarding: "Fully digital instant onboarding through Aadhaar-based OTP and video call KYC validation in under 10 minutes.",
      fees: "Higher fee structures than public sector banks. Penalty charges for dropping below the minimum balance can range from ₹200 to ₹600 per month.",
      features: "Integrated shopping portals, SmartBuy discounts, smooth BillPay modules, and immediate credit line approvals.",
      service: "Very responsive phone helpdesks and priority email systems. Branches are modern and efficient."
    }
  },
  {
    slug: "kotak-811",
    name: "Kotak 811",
    rating: 4.6,
    activeUsers: "25 Million+",
    likes: 1110,
    country: "India",
    countrySlug: "india",
    type: "Digital Account",
    logoColor: "#e61a2b",
    logoLetter: "K",
    summary: "Kotak 811 is a pioneer in digital-only bank accounts in India. Launched by Kotak Mahindra Bank, it provides a zero-balance, fully digital account with zero paper compliance requirements.",
    features: {
      digitalOnboarding: true,
      mobileApp: true,
      freeDebitCard: true,
      highInterest: true,
      zeroBalance: true
    },
    charges: {
      minimumBalance: "₹0 (Lifetime Zero Balance)",
      maintenanceFee: "₹199/year for physical card (Virtual card is free)",
      atmWithdrawal: "5 free withdrawals/month, then ₹21 per tx",
      foreignExchange: "3.5% markup fee"
    },
    interestRate: "3.50% to 4.00% p.a.",
    platforms: ["Kotak Mobile Banking App"],
    pros: [
      "No minimum balance requirement forever",
      "Free lifetime virtual debit card for online transactions",
      "Higher interest rates compared to other standard savings accounts"
    ],
    cons: [
      "Physical debit card carries a recurring yearly charge",
      "Over-the-counter cash deposits carry branch service fees",
      "Limited direct branch assistance for digital-tier accounts"
    ],
    categoryRatings: {
      rates: 4.0,
      usability: 4.7,
      customerService: 4.0
    },
    detailedReview: {
      onboarding: "Completely paperless web onboarding. Enter PAN & Aadhaar details, perform a quick face verification, and receive account details instantly.",
      fees: "No hidden charges. Ideal for students, freelancers, and young professionals looking for a secondary zero-maintenance wallet.",
      features: "Offers Kotak ActivMoney auto-sweep deposit features to earn up to 7% interest on idle funds above a threshold.",
      service: "App-centric service desks are fast. Phone support and chatbot help are highly responsive."
    }
  },

  // --- UNITED STATES BANKS ---
  {
    slug: "chase-savings",
    name: "Chase Bank",
    rating: 4.2,
    activeUsers: "60 Million+",
    likes: 1240,
    country: "United States",
    countrySlug: "united-states",
    type: "Traditional Savings",
    logoColor: "#1172b0",
    logoLetter: "C",
    summary: "Chase is the largest retail bank in the United States. Providing a massive footprint of local branches and ATMs, it is the standard for traditional consumer bank accounts.",
    features: {
      digitalOnboarding: true,
      mobileApp: true,
      freeDebitCard: true,
      highInterest: false,
      zeroBalance: false
    },
    charges: {
      minimumBalance: "$300 minimum daily balance (or $5 monthly fee)",
      maintenanceFee: "$5/month (waivable with direct deposits)",
      atmWithdrawal: "Free at Chase ATMs | $3 at out-of-network ATMs",
      foreignExchange: "3% of transaction amount"
    },
    interestRate: "0.01% APY",
    platforms: ["Chase Mobile App", "Chase Online Web"],
    pros: [
      "Branches and ATMs in almost every major US city",
      "Voted one of the best banking mobile apps in the US",
      "Seamless integration with Chase Sapphire/Freedom credit cards"
    ],
    cons: [
      "Almost zero interest yield on savings balances",
      "Strict waivable fees requiring direct deposit or minimum balances",
      "Out-of-network ATM fees are double charged (Chase fee + operator fee)"
    ],
    categoryRatings: {
      rates: 1.0,
      usability: 4.8,
      customerService: 4.2
    },
    detailedReview: {
      onboarding: "SSN verification enables rapid digital accounts setup. Non-residents must visit branches for physical verification.",
      fees: "Monthly fees are waivable with a recurring monthly direct deposit of $500+. Without it, the yield is negative due to fees.",
      features: "Robust mobile check deposit, Zelle transfers, card controls, credit score monitoring, and travel portals.",
      service: "Excellent physical branch customer service. 24/7 phone assistance is quick."
    }
  },
  {
    slug: "ally-savings",
    name: "Ally Bank",
    rating: 4.6,
    activeUsers: "3 Million+",
    likes: 920,
    country: "United States",
    countrySlug: "united-states",
    type: "Digital Account",
    logoColor: "#4f2d7f",
    logoLetter: "A",
    summary: "Ally Bank is a leading digital-only bank in the US. By operating without physical branches, it passes savings to users through high-yield interest rates and zero monthly fees.",
    features: {
      digitalOnboarding: true,
      mobileApp: true,
      freeDebitCard: true,
      highInterest: true,
      zeroBalance: true
    },
    charges: {
      minimumBalance: "$0 (No minimum requirement)",
      maintenanceFee: "$0 (No monthly fees)",
      atmWithdrawal: "Free at Allpoint ATMs | Up to $10/month reimbursement for others",
      foreignExchange: "1% markup fee"
    },
    interestRate: "4.20% to 4.25% APY",
    platforms: ["Ally Mobile App", "Ally Online Web"],
    pros: [
      "Industry-leading high-yield interest rates",
      "No monthly maintenance or balance requirements",
      "Smart savings tools like buckets and boosters to automate savings"
    ],
    cons: [
      "No physical branch offices to deposit physical cash",
      "Out-of-network check deposits can take 2-3 days to clear",
      "No physical debit card checkbooks standard (available on request)"
    ],
    categoryRatings: {
      rates: 4.6,
      usability: 4.5,
      customerService: 4.4
    },
    detailedReview: {
      onboarding: "Requires US residency and SSN. Verification is completed online via credit report database checks in minutes.",
      fees: "Absolutely zero recurring fees. No overdraft fees, keeping consumer cash entirely intact.",
      features: "The savings 'buckets' feature allows users to divide their single account into sub-savings goals (e.g. Vacation, Taxes).",
      service: "Outstanding 24/7 phone support and online live chat. Average wait times are transparently shown on the website."
    }
  },
  {
    slug: "chime-neobank",
    name: "Chime",
    rating: 4.4,
    activeUsers: "15 Million+",
    likes: 810,
    country: "United States",
    countrySlug: "united-states",
    type: "Neobank",
    logoColor: "#25c974",
    logoLetter: "C",
    summary: "Chime is a financial technology company offering banking services through partner banks. It pioneered early direct deposit and fee-free overdraft protections for retail consumers.",
    features: {
      digitalOnboarding: true,
      mobileApp: true,
      freeDebitCard: true,
      highInterest: true,
      zeroBalance: true
    },
    charges: {
      minimumBalance: "$0 (No minimum requirement)",
      maintenanceFee: "$0 monthly fee",
      atmWithdrawal: "Free at 60,000+ fee-free ATMs",
      foreignExchange: "0% foreign transaction fee"
    },
    interestRate: "2.00% APY",
    platforms: ["Chime App"],
    pros: [
      "Get paid up to 2 days early with early direct deposit",
      "SpotMe feature allows fee-free overdrafts up to $200",
      "Zero foreign transaction fees on international card usage"
    ],
    cons: [
      "No physical branches or in-person services",
      "Cash deposits must be done at third-party retailers for a fee",
      "Interest rates are lower than dedicated high-yield digital banks"
    ],
    categoryRatings: {
      rates: 3.5,
      usability: 4.7,
      customerService: 3.8
    },
    detailedReview: {
      onboarding: "Instant registration on mobile. No credit check required to open an account, making it perfect for rebuilders.",
      fees: "Strictly fee-free. Overdrafts are protected up to limit limits without punitive penalty payments.",
      features: "Credit Builder Visa Credit Card integration allows users to build credit history using their Chime deposit balance.",
      service: "Mainly app chat-support based, but has 24/7 hotline services available."
    }
  },

  // --- UNITED KINGDOM BANKS ---
  {
    slug: "monzo-savings",
    name: "Monzo Bank",
    rating: 4.7,
    activeUsers: "9 Million+",
    likes: 1420,
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    type: "Neobank",
    logoColor: "#ff4d5a",
    logoLetter: "M",
    summary: "Monzo is a fully licensed digital bank in the UK. Famous for its coral-colored debit cards, it sets the standard for modern mobile-first neobanking.",
    features: {
      digitalOnboarding: true,
      mobileApp: true,
      freeDebitCard: true,
      highInterest: true,
      zeroBalance: true
    },
    charges: {
      minimumBalance: "£0 (No minimum balance)",
      maintenanceFee: "£0 (Premium tiers £5-£15/month)",
      atmWithdrawal: "Free in the UK/EEA | £200/month free internationally",
      foreignExchange: "0% markup fee (Mastercard wholesale rate)"
    },
    interestRate: "4.10% to 4.50% AER (via savings pots)",
    platforms: ["Monzo Mobile App"],
    pros: [
      "Instant push notifications and real-time transaction categorizations",
      "Fee-free spending abroad with zero exchange markups",
      "Innovative 'Pots' system for savings and bill scheduling"
    ],
    cons: [
      "No physical branch network for in-person support",
      "Cash deposits at PayPoint locations carry a £1 fee",
      "Strict international ATM fee-free withdrawal caps"
    ],
    categoryRatings: {
      rates: 4.5,
      usability: 4.9,
      customerService: 4.6
    },
    detailedReview: {
      onboarding: "Open an account on your phone in 5 minutes with a photo ID and a short video selfie. No paper files needed.",
      fees: "The core account is completely free. Premium subscriptions add travel insurance, phone insurance, and metal cards.",
      features: "Split bills, request money with links, set savings targets, and connect external credit cards.",
      service: "Excellent in-app chat help desk with fast response times. FSCS regulated to protect up to £85,000."
    }
  },
  {
    slug: "barclays-savings",
    name: "Barclays Bank",
    rating: 4.1,
    activeUsers: "20 Million+",
    likes: 830,
    country: "United Kingdom",
    countrySlug: "united-kingdom",
    type: "Traditional Savings",
    logoColor: "#00aeef",
    logoLetter: "B",
    summary: "Barclays is one of the oldest and largest high-street banks in the UK, providing traditional savings with secure digital app additions.",
    features: {
      digitalOnboarding: true,
      mobileApp: true,
      freeDebitCard: true,
      highInterest: true,
      zeroBalance: true
    },
    charges: {
      minimumBalance: "£0 (No minimum)",
      maintenanceFee: "£0 monthly fee",
      atmWithdrawal: "Free at Barclays and UK ATMs",
      foreignExchange: "2.75% transaction fee abroad"
    },
    interestRate: "1.65% to 5.12% AER (with Blue Rewards)",
    platforms: ["Barclays App", "Barclays Online Banking"],
    pros: [
      "Highly trusted brand with physically accessible branches in the UK",
      "High interest rate for Barclays Blue Rewards members",
      "Excellent cashback rewards on utilities and bills"
    ],
    cons: [
      "Standard non-rewards interest rates are very low",
      "App interface is clean but feels heavy and complex",
      "High charges for international spending"
    ],
    categoryRatings: {
      rates: 3.8,
      usability: 4.1,
      customerService: 3.9
    },
    detailedReview: {
      onboarding: "UK residents can apply on the app with passport checks, but approval can sometimes take up to 24-48 hours.",
      fees: "No standard monthly fees. Standard users pay extra for foreign transaction fees when traveling.",
      features: "Strong mortgage, loans, and credit integration. Offers Apple Pay, Google Pay, and contactless support.",
      service: "Excellent physical branch network. UK customer telephone lines are highly reliable."
    }
  }
];
