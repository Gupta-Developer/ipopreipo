import { BankData } from "@/types/finance";

export const MOCK_BANKS: BankData[] = [
  {
    id: "b1",
    slug: "hdfc-bank",
    name: "HDFC Bank",
    type: "Private Sector Bank",
    savingsInterestRate: "3.00% - 3.50% p.a.",
    minBalanceRequirement: "₹10,000 (Metro/Urban) | ₹5,000 (Semi-Urban)",
    fdInterestRatePeak: "7.25% p.a. (Senior Citizens: 7.75%)",
    rating: 4.8,
    branchCount: "8,700+ Branches",
    atmCount: "20,500+ ATMs",
    digitalBankingScore: "4.8/5 (HDFC MobileBanking App)",
    pros: [
      "India's largest private sector bank with massive branch network.",
      "Top-tier credit card portfolio (Millennia, Regalia, Infinia).",
      "Seamless ASBA IPO application & NetBanking processing."
    ],
    cons: [
      "Minimum average monthly balance (MAB) requirement is ₹10,000 for urban branches."
    ],
    openAccountUrl: "https://www.hdfcbank.com"
  },
  {
    id: "b2",
    slug: "icici-bank",
    name: "ICICI Bank",
    type: "Private Sector Bank",
    savingsInterestRate: "3.00% - 3.50% p.a.",
    minBalanceRequirement: "₹10,000 (Metro) | ₹0 (Digital Savings iMobile)",
    fdInterestRatePeak: "7.20% p.a. (Senior Citizens: 7.75%)",
    rating: 4.7,
    branchCount: "6,500+ Branches",
    atmCount: "17,000+ ATMs",
    digitalBankingScore: "4.9/5 (iMobile Pay App)",
    pros: [
      "Best-in-class mobile banking app (iMobile Pay).",
      "Pre-approved home loans, personal loans, and credit cards.",
      "Fast 3-in-1 account integration with ICICI Direct."
    ],
    cons: [
      "Monthly average balance non-maintenance penalty on classic accounts."
    ],
    openAccountUrl: "https://www.icicibank.com"
  },
  {
    id: "b3",
    slug: "state-bank-of-india",
    name: "State Bank of India (SBI)",
    type: "Public Sector Bank",
    savingsInterestRate: "2.70% p.a.",
    minBalanceRequirement: "₹0 (Zero Balance MAB Waived)",
    fdInterestRatePeak: "7.10% p.a. (Senior Citizens: 7.60%)",
    rating: 4.6,
    branchCount: "22,500+ Branches",
    atmCount: "63,000+ ATMs",
    digitalBankingScore: "4.6/5 (YONO SBI)",
    pros: [
      "Unmatched nationwide branch & ATM reach across urban & rural India.",
      "Zero minimum balance requirement on standard savings accounts.",
      "Highest trust & sovereign backing."
    ],
    cons: [
      "Branch waiting times can be long during peak business hours."
    ],
    openAccountUrl: "https://www.sbi.co.in"
  },
  {
    id: "b4",
    slug: "kotak-mahindra-bank",
    name: "Kotak Mahindra Bank",
    type: "Private Sector Bank",
    savingsInterestRate: "3.50% - 4.00% p.a.",
    minBalanceRequirement: "₹0 (Kotak 811 Digital Account) | ₹10,000 (Edge)",
    fdInterestRatePeak: "7.40% p.a. (Senior Citizens: 7.90%)",
    rating: 4.6,
    branchCount: "1,900+ Branches",
    atmCount: "3,000+ ATMs",
    digitalBankingScore: "4.7/5 (Kotak Mobile App)",
    pros: [
      "Popular Kotak 811 instant zero-balance digital savings account.",
      "Higher savings interest rates on higher account balances.",
      "Seamless online video KYC opening."
    ],
    cons: [
      "Smaller physical branch footprint compared to HDFC or SBI."
    ],
    openAccountUrl: "https://www.kotak.com"
  },
  {
    id: "b5",
    slug: "idfc-first-bank",
    name: "IDFC FIRST Bank",
    type: "Private Sector Bank",
    savingsInterestRate: "3.00% - 7.00% p.a. (Monthly Interest Payout)",
    minBalanceRequirement: "₹10,000 or ₹25,000 AMB",
    fdInterestRatePeak: "7.75% p.a. (Senior Citizens: 8.25%)",
    rating: 4.8,
    branchCount: "900+ Branches",
    atmCount: "1,100+ ATMs",
    digitalBankingScore: "4.8/5 (IDFC FIRST Mobile App)",
    pros: [
      "Monthly interest credit payouts directly into savings account.",
      "High savings interest rates up to 7.00% p.a.",
      "Zero fee policy on 28+ routine banking services (Debit card, IMPS, DD)."
    ],
    cons: [
      "Branch network is still expanding in tier-3 cities."
    ],
    openAccountUrl: "https://www.idfcfirstbank.com"
  }
];
