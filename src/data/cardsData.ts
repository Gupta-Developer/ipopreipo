export interface CardPerk {
  title: string;
  category: "cashback" | "fuel" | "emi" | "lounge" | "rewards" | "other";
  details: string[];
}

export interface FeeDetails {
  joiningFee: string;
  annualFee: string;
  apr: string;
  addonFee: string;
  minimumRepayment: string;
  cashWithdrawalFee: string;
  cashAdvanceLimit: string;
  cardReplacementFee: string;
  foreignTransactionFee: string;
  overLimitPenalty: string;
  fuelSurcharge: string;
  rewardPointValue: string;
}

export interface LatePaymentSlab {
  range: string;
  fee: string;
}

export interface CreditCardDetail {
  slug: string;
  name: string;
  overallRating: number;
  type: string;
  bestFor: string;
  issuer: string;
  issuerCode: string;
  network: "Visa" | "Mastercard" | "American Express";
  likes: number;
  description: string;
  featuresChecklist: {
    welcomeBonus: boolean;
    travel: boolean;
    fuel: boolean;
    rewards: boolean;
    shopping: boolean;
  };
  perks: CardPerk[];
  fees: FeeDetails;
  latePaymentCharges: LatePaymentSlab[];
  pros: string[];
  cons: string[];
  ratingsBreakdown: {
    charges: number;
    rewards: number;
    customerService: number;
  };
  reviewTitle: string;
  reviewContent: string;
  reviewOverviewTable: { label: string; value: string }[];
  country: string;
}

export const CREDIT_CARDS_CATALOG: CreditCardDetail[] = [
  {
    slug: "sbi-cashback-credit-card",
    name: "SBI Cashback Credit Card",
    overallRating: 4.8,
    type: "Cashback",
    bestFor: "Cashback",
    issuer: "SBI Card",
    issuerCode: "sbi",
    network: "Visa",
    likes: 142,
    country: "India",
    description: "Love shopping online? Well, we've got some great news for you! With the SBI Cashback Credit Card, you can earn 5% cashback on all your online purchases. That's not all – you'll also get 1% cashback on in-store shopping. The card has a joining and annual fee of just ₹999. It's easy to use and accepted worldwide. So, you can save a lot on your everyday expenses.",
    featuresChecklist: {
      welcomeBonus: false,
      travel: false,
      fuel: true,
      rewards: false,
      shopping: false
    },
    perks: [
      {
        title: "Cashback Benefit",
        category: "cashback",
        details: [
          "Get a 5% cashback on online purchases without any limitations on the merchant.",
          "1% cashback is available for your offline purchases.",
          "Cashback will be credited to your SBI Card account within 2 days of statement generation."
        ]
      },
      {
        title: "Fuel Surcharge Waiver",
        category: "fuel",
        details: [
          "1% Fuel Surcharge Waiver at all petrol pumps in India.",
          "Valid for transactions between ₹500 - ₹3,000.",
          "Maximum surcharge waiver of ₹100 per statement cycle."
        ]
      },
      {
        title: "EMI Benefit",
        category: "emi",
        details: [
          "Get a Balance Transfer on EMI with CASHBACK SBI Card.",
          "Save money while paying credit card dues by transferring outstanding balances of other bank credit cards."
        ]
      },
      {
        title: "Global Acceptance & Utilities",
        category: "other",
        details: [
          "Access cash from 1 million+ VISA ATMs worldwide.",
          "Enjoy convenient utility bill payments, including electricity, telephone, mobile, with Easy Bill Pay.",
          "Spend ₹2 Lakh annually to reverse the renewal fee."
        ]
      }
    ],
    fees: {
      joiningFee: "₹999",
      annualFee: "₹999",
      apr: "45%",
      addonFee: "Free",
      minimumRepayment: "5%",
      cashWithdrawalFee: "2.5% or ₹500, whichever is higher",
      cashAdvanceLimit: "80%",
      cardReplacementFee: "₹100 (maximum ₹250)",
      foreignTransactionFee: "3.5%",
      overLimitPenalty: "2.50% or ₹600, whichever is higher",
      fuelSurcharge: "1%",
      rewardPointValue: "1% to 5%"
    },
    latePaymentCharges: [
      { range: "Balance from ₹0 to ₹500", fee: "₹0" },
      { range: "Balance from ₹500 to ₹1000", fee: "₹400" },
      { range: "Balance from ₹1000 to ₹10000", fee: "₹750" },
      { range: "Balance from ₹10000 to ₹25000", fee: "₹950" },
      { range: "Balance from ₹25000 to ₹50000", fee: "₹1100" },
      { range: "Balance more than ₹50000", fee: "₹1300" }
    ],
    pros: [
      "Cashback is automatically added to your account within 2 days after statement is generated.",
      "Enjoy 5% cashback on all online purchases, with no merchant restrictions.",
      "Use the contactless feature for quick payments on small purchases.",
      "Visa PayWave enables only one transaction even if you tap multiple times.",
      "The ₹999 renewal fee is waived if you spend ₹2 lakh or more in a year."
    ],
    cons: [
      "No complimentary airport lounge access.",
      "Cashback is not available for Education, Fuel, Jewelry, Insurance, Rent, Utilities, and Wallets.",
      "There are no welcome benefits or introductory offers with this card."
    ],
    ratingsBreakdown: {
      charges: 3.5,
      rewards: 4.8,
      customerService: 3.0
    },
    reviewTitle: "SBI Cashback Credit Card Review",
    reviewContent: "If you like retail therapy or pay most of your bills online, then the SBI Cashback credit card is made for you. From ordering food and booking flights to grabbing the latest fashion deals, this card ensures that you get cashback on almost everything you buy without the hassle of redeeming reward points. The 5% cashback on online spending is definitely the highlight. But like everything in life, this card comes with a few conditions. The ₹5,000 monthly cashback cap means that if you're someone who splurges heavily online, you'll hit the limit pretty quickly. Overall, if most of your expenses are online, this card is a practical addition to your wallet.",
    reviewOverviewTable: [
      { label: "Joining fees", value: "₹999 + taxes" },
      { label: "Annual fees", value: "₹999 + taxes (waived on spending ₹2 lakh annually)" },
      { label: "Best for", value: "Online shopping, everyday spending" },
      { label: "Cashback rate", value: "1% to 5%" },
      { label: "Cashback cap", value: "₹5,000 per statement cycle" },
      { label: "Card type", value: "Cashback" },
      { label: "Card network", value: "Visa" }
    ]
  },
  {
    slug: "tata-neu-infinity-hdfc",
    name: "Tata Neu Infinity HDFC Bank",
    overallRating: 4.7,
    type: "Co-Branded",
    bestFor: "Reward Points",
    issuer: "HDFC Bank",
    issuerCode: "hdfc",
    network: "Visa",
    likes: 198,
    country: "India",
    description: "Earn accelerated rewards on the Tata Neu App and selected partner brands with Tata Neu Infinity HDFC Bank Credit Card. Get NeuCoins on online/offline transactions, airport lounge access, and zero redemption charges.",
    featuresChecklist: {
      welcomeBonus: true,
      travel: false,
      fuel: true,
      rewards: true,
      shopping: false
    },
    perks: [
      {
        title: "NeuCoins Reward Engine",
        category: "rewards",
        details: [
          "Get 5% NeuCoins on Tata Neu App and partner brands (BigBasket, 1mg, Croma, Air India Express, IHCL).",
          "Earn 1.5% NeuCoins on all other non-Tata merchants and offline purchases.",
          "1 NeuCoin is valued at ₹1."
        ]
      },
      {
        title: "Lounge Access Privilege",
        category: "lounge",
        details: [
          "8 complimentary domestic lounge visits per calendar year (both Visa & RuPay variants).",
          "4 complimentary international lounge visits per calendar year via Priority Pass."
        ]
      },
      {
        title: "Insurance Coverage",
        category: "other",
        details: [
          "Air accidental death insurance cover worth ₹1 Crore.",
          "Credit Liability cover worth ₹9 Lakhs."
        ]
      }
    ],
    fees: {
      joiningFee: "₹1,499",
      annualFee: "₹1,499",
      apr: "41.88%",
      addonFee: "Free",
      minimumRepayment: "5%",
      cashWithdrawalFee: "2.5% or ₹500, whichever is higher",
      cashAdvanceLimit: "40%",
      cardReplacementFee: "₹100",
      foreignTransactionFee: "2.0% (Marked down)",
      overLimitPenalty: "2.50% or ₹500, whichever is higher",
      fuelSurcharge: "1%",
      rewardPointValue: "1% to 5%"
    },
    latePaymentCharges: [
      { range: "Balance from ₹0 to ₹100", fee: "₹0" },
      { range: "Balance from ₹100 to ₹500", fee: "₹100" },
      { range: "Balance from ₹500 to ₹1000", fee: "₹500" },
      { range: "Balance from ₹1000 to ₹10000", fee: "₹600" },
      { range: "Balance from ₹10000 to ₹25000", fee: "₹800" },
      { range: "Balance more than ₹25000", fee: "₹950" }
    ],
    pros: [
      "Extremely rewarding for loyal Tata customers (5% return on Tata Neu).",
      "Priority Pass domestic and international lounge visits are included.",
      "High insurance cover of up to ₹1 Crore for air accident deaths."
    ],
    cons: [
      "Accelerated rewards are capped and specific to Tata app purchases.",
      "High annual fee of ₹1,499 without waiver features."
    ],
    ratingsBreakdown: {
      charges: 4.0,
      rewards: 4.7,
      customerService: 4.2
    },
    reviewTitle: "Tata Neu Infinity HDFC Bank Review",
    reviewContent: "For users heavily invested in the Tata Ecosystem (Croma, BigBasket, 1mg), the Tata Neu Infinity is an exceptional co-branded card offering up to 5% yield. Outside Tata purchases, the 1.5% base reward is also competitive, making it a well-rounded wallet addition.",
    reviewOverviewTable: [
      { label: "Joining fees", value: "₹1,499 + taxes" },
      { label: "Annual fees", value: "₹1,499 + taxes" },
      { label: "Best for", value: "Tata App rewards, NeuCoins" },
      { label: "Reward rate", value: "1.5% to 5%" },
      { label: "Card type", value: "Co-branded" },
      { label: "Card network", value: "Visa / RuPay" }
    ]
  },
  {
    slug: "amex-smartearn",
    name: "American Express SmartEarn",
    overallRating: 4.5,
    type: "Premium",
    bestFor: "Rewards",
    likes: 110,
    issuer: "American Express",
    issuerCode: "amex",
    network: "American Express",
    country: "India",
    description: "Earn accelerated Membership Reward Points on daily shopping, dining, and online deliveries. The American Express SmartEarn card provides a low entry-barrier for premium perks, zero interest credit periods, and high reward multiplier options.",
    featuresChecklist: {
      welcomeBonus: true,
      travel: false,
      fuel: true,
      rewards: true,
      shopping: false
    },
    perks: [
      {
        title: "Multiplier Rewards",
        category: "rewards",
        details: [
          "10x points on Flipkart, Uber, and more (up to 500 points per month).",
          "5x points on Amazon, BookMyShow, and online transactions.",
          "Earn 1 Membership Reward Point for every ₹50 spent normally."
        ]
      },
      {
        title: "Milestone Benefits",
        category: "other",
        details: [
          "₹500 voucher on spending ₹1.2 Lakhs in a year.",
          "Second ₹500 voucher on spending ₹2.40 Lakhs."
        ]
      }
    ],
    fees: {
      joiningFee: "₹495",
      annualFee: "₹495",
      apr: "42%",
      addonFee: "Free",
      minimumRepayment: "5%",
      cashWithdrawalFee: "3.5% or ₹500, whichever is higher",
      cashAdvanceLimit: "30%",
      cardReplacementFee: "₹100",
      foreignTransactionFee: "3.5%",
      overLimitPenalty: "2.50% or ₹500, whichever is higher",
      fuelSurcharge: "1%",
      rewardPointValue: "1% to 10%"
    },
    latePaymentCharges: [
      { range: "Balance from ₹0 to ₹100", fee: "₹0" },
      { range: "Balance from ₹100 to ₹500", fee: "₹100" },
      { range: "Balance from ₹500 to ₹1000", fee: "₹500" },
      { range: "Balance from ₹1000 to ₹10000", fee: "₹600" },
      { range: "Balance from ₹10000 to ₹25000", fee: "₹800" },
      { range: "Balance more than ₹25000", fee: "₹950" }
    ],
    pros: [
      "Low annual fee of ₹495 with waiver on spending ₹40,000.",
      "Access to premium American Express customer service and dining privileges."
    ],
    cons: [
      "Lower merchant acceptance compared to Visa and Mastercard in smaller towns.",
      "Airport lounge access is not provided."
    ],
    ratingsBreakdown: {
      charges: 4.5,
      rewards: 4.2,
      customerService: 4.8
    },
    reviewTitle: "American Express SmartEarn Review",
    reviewContent: "Amex SmartEarn is a fantastic starter card for anyone looking to enter the American Express ecosystem. The low membership fee combined with high reward multipliers on daily essentials like Uber makes it very accessible and high-value.",
    reviewOverviewTable: [
      { label: "Joining fees", value: "₹495 + taxes" },
      { label: "Annual fees", value: "₹495 + taxes" },
      { label: "Best for", value: "Uber rides, online shopping rewards" },
      { label: "Reward rate", value: "1% to 10%" },
      { label: "Card network", value: "American Express" }
    ]
  }
];
