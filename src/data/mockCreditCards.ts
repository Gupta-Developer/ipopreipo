import { CreditCardData } from "@/types/finance";

export const MOCK_CREDIT_CARDS: CreditCardData[] = [
  {
    id: "c1",
    slug: "hdfc-millennia",
    name: "HDFC Millennia Credit Card",
    issuer: "HDFC Bank",
    category: ["cashback", "rewards"],
    rating: 4.8,
    joiningFee: 1000,
    annualFee: 1000,
    annualFeeWaiverCondition: "Waived on ₹1.0 Lakh spend in a anniversary year",
    rewardRate: "5% Cashback on Amazon, Flipkart, Myntra, Swiggy & Zomato",
    keyPrivileges: [
      "5% Cashback on top partner merchants (Amazon, Flipkart, Swiggy)",
      "1% Cashback on all other online & offline spends",
      "4 Complimentary domestic airport lounge visits per calendar year",
      "1% Fuel surcharge waiver across all fuel stations in India"
    ],
    minIncomePerMonth: 35000,
    recommendedCreditScore: 750,
    pros: [
      "Highest cashback rates on popular shopping & food ordering apps.",
      "Low annual fee with easy spend-based waiver.",
      "Complimentary domestic lounge access."
    ],
    cons: [
      "Cashback is credited as CashPoints which require manual redemption.",
      "Capped at ₹1,000 max cashback per month for partner category."
    ],
    applyUrl: "https://www.hdfcbank.com",
    isPopular: true
  },
  {
    id: "c2",
    slug: "amazon-pay-icici",
    name: "Amazon Pay ICICI Credit Card",
    issuer: "ICICI Bank",
    category: ["lifetime_free", "cashback"],
    rating: 4.9,
    joiningFee: 0,
    annualFee: 0,
    annualFeeWaiverCondition: "Lifetime Free (₹0 Renewal Fee)",
    rewardRate: "5% Unlimited Cashback for Amazon Prime Members",
    keyPrivileges: [
      "5% Unlimited Cashback on Amazon.in for Prime users (3% for Non-Prime)",
      "2% Cashback on digital payments (recharges, bill payments, Amazon Pay partner merchants)",
      "1% Unlimited Cashback on all other retail purchases",
      "No joining or annual maintenance fees ever"
    ],
    minIncomePerMonth: 25000,
    recommendedCreditScore: 730,
    pros: [
      "True Lifetime Free card with zero annual charges.",
      "Direct auto-credit of earnings to Amazon Pay balance every month.",
      "No upper capping on monthly cashback earnings."
    ],
    cons: [
      "Does not offer airport lounge access.",
      "Highest reward rate requires active Amazon Prime subscription."
    ],
    applyUrl: "https://www.icicibank.com",
    isPopular: true
  },
  {
    id: "c3",
    slug: "sbi-simplyclick",
    name: "SBI SimplyCLICK Credit Card",
    issuer: "State Bank of India (SBI)",
    category: ["rewards", "cashback"],
    rating: 4.6,
    joiningFee: 499,
    annualFee: 499,
    annualFeeWaiverCondition: "Waived on annual spend of ₹1,00,000",
    rewardRate: "10X Reward Points on partner online merchants",
    keyPrivileges: [
      "10X Reward Points on Apollo 24x7, BookMyShow, Cleartrip, Domino's, Myntra, Yatra",
      "5X Reward Points on all other online shopping spends",
      "Welcome Amazon e-voucher worth ₹500 on fee payment",
      "Cleartrip e-voucher worth ₹2,000 on reaching ₹1 Lakh & ₹2 Lakh annual spends"
    ],
    minIncomePerMonth: 20000,
    recommendedCreditScore: 720,
    pros: [
      "Excellent online shopping reward multipliers.",
      "Low joining fee offset by welcome gift voucher.",
      "Wide acceptance backed by SBI Card network."
    ],
    cons: [
      "Reward points rate on offline transactions is basic (1X)."
    ],
    applyUrl: "https://www.sbicard.com",
    isPopular: false
  },
  {
    id: "c4",
    slug: "axis-my-zone",
    name: "Axis Bank MY ZONE Credit Card",
    issuer: "Axis Bank",
    category: ["lifetime_free", "rewards"],
    rating: 4.5,
    joiningFee: 500,
    annualFee: 500,
    annualFeeWaiverCondition: "Waived on spend of ₹50,000/year (often issued Lifetime Free)",
    rewardRate: "Buy-1-Get-1 Free Movie Tickets on Paytm Movies",
    keyPrivileges: [
      "Buy-1-Get-1 free movie ticket on Paytm Movies (up to ₹200 off/month)",
      "Flat ₹120 off on Swiggy on minimum order of ₹500 (twice a month)",
      "Free SonyLIV Premium annual subscription worth ₹999 on first spend",
      "4 Complimentary lounge visits per year"
    ],
    minIncomePerMonth: 15000,
    recommendedCreditScore: 700,
    pros: [
      "Ideal entry-level card for movies, entertainment, and food delivery.",
      "Low income eligibility requirement.",
      "Free SonyLIV annual membership."
    ],
    cons: [
      "Low base reward point rate on routine offline spends."
    ],
    applyUrl: "https://www.axisbank.com",
    isPopular: false
  },
  {
    id: "c5",
    slug: "idfc-first-wealth",
    name: "IDFC FIRST Wealth Credit Card",
    issuer: "IDFC FIRST Bank",
    category: ["lifetime_free", "travel", "rewards"],
    rating: 4.8,
    joiningFee: 0,
    annualFee: 0,
    annualFeeWaiverCondition: "Lifetime Free (₹0 Forever)",
    rewardRate: "10X Reward Points on monthly spends above ₹30,000",
    keyPrivileges: [
      "Complimentary domestic & international airport & railway lounge access (4/quarter)",
      "Reward points that never expire and can be redeemed directly for cash",
      "Interest-free cash withdrawal at ATMs worldwide for up to 48 days",
      "Low foreign currency markup fee of only 1.5%"
    ],
    minIncomePerMonth: 100000,
    recommendedCreditScore: 760,
    pros: [
      "Premium premium travel perks on a Lifetime Free card.",
      "Reward points never expire.",
      "Lowest Forex markup fee (1.5%) in the market."
    ],
    cons: [
      "Higher income eligibility benchmark (₹1.0 Lakh/month)."
    ],
    applyUrl: "https://www.idfcfirstbank.com",
    isPopular: true
  }
];
