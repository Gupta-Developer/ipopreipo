export interface CalculatorMeta {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: "ipo" | "stocks" | "mutual_funds" | "banking" | "tax_retirement";
  categoryLabel: string;
  badge?: string;
}

export const CALCULATORS_LIST: CalculatorMeta[] = [
  // Category 1: IPO & Pre-IPO
  {
    id: "ipo-gain",
    slug: "ipo-listing-gain-calculator",
    title: "IPO Listing Gain & Lot Cost Calculator",
    shortDescription: "Calculate total lot investment, expected GMP listing profits, and STCG tax breakdown.",
    category: "ipo",
    categoryLabel: "IPO & Pre-IPO",
    badge: "Popular"
  },
  {
    id: "ipo-allotment",
    slug: "ipo-allotment-probability-calculator",
    title: "IPO Allotment Odds & Multi-Account Estimator",
    shortDescription: "Estimate mathematical allotment probability across multiple family demat accounts.",
    category: "ipo",
    categoryLabel: "IPO & Pre-IPO",
    badge: "Must Use"
  },
  {
    id: "preipo-roi",
    slug: "pre-ipo-cagr-return-calculator",
    title: "Pre-IPO Equity Return & CAGR Calculator",
    shortDescription: "Project unlisted share listing returns, total capital gains, and annualized XIRR / CAGR.",
    category: "ipo",
    categoryLabel: "IPO & Pre-IPO"
  },
  {
    id: "sme-lot-risk",
    slug: "sme-ipo-lot-cost-calculator",
    title: "SME IPO Lot Cost & Capital Calculator",
    shortDescription: "Calculate minimum capital requirements (₹1.2L-₹1.4L) & profit targets for SME IPOs.",
    category: "ipo",
    categoryLabel: "IPO & Pre-IPO"
  },

  // Category 2: Stocks & Market Charges
  {
    id: "ltcg-stcg-tax",
    slug: "capital-gains-tax-calculator",
    title: "STCG & LTCG Tax Calculator (Budget 2024)",
    shortDescription: "Calculate Short Term (20%) & Long Term (12.5%) equity gains tax with ₹1.25L exemption.",
    category: "stocks",
    categoryLabel: "Equity & Market",
    badge: "Budget 2024"
  },
  {
    id: "brokerage-charges",
    slug: "brokerage-and-stt-charges-calculator",
    title: "Brokerage & Statutory Charges Calculator",
    shortDescription: "Calculate STT, Exchange Turnover fees, GST, Stamp Duty, and SEBI charges for trades.",
    category: "stocks",
    categoryLabel: "Equity & Market"
  },
  {
    id: "dividend-tax",
    slug: "dividend-yield-tax-calculator",
    title: "Dividend Yield & Net Tax Payout Calculator",
    shortDescription: "Calculate net dividend income after 10% TDS and individual income tax slab deduction.",
    category: "stocks",
    categoryLabel: "Equity & Market"
  },
  {
    id: "position-sizing",
    slug: "position-sizing-risk-calculator",
    title: "Position Sizing & Risk-Reward Calculator",
    shortDescription: "Determine maximum shares to buy based on portfolio risk tolerance and stop loss %.",
    category: "stocks",
    categoryLabel: "Equity & Market"
  },

  // Category 3: Mutual Funds & Wealth
  {
    id: "sip-calculator",
    slug: "sip-calculator",
    title: "SIP (Systematic Investment Plan) Calculator",
    shortDescription: "Project compounding growth of monthly SIP investments over 1 to 30 years.",
    category: "mutual_funds",
    categoryLabel: "Mutual Funds",
    badge: "Essential"
  },
  {
    id: "step-up-sip",
    slug: "step-up-sip-calculator",
    title: "Step-Up SIP Top-Up Growth Calculator",
    shortDescription: "Calculate compounding wealth when increasing monthly SIP contribution annually.",
    category: "mutual_funds",
    categoryLabel: "Mutual Funds"
  },
  {
    id: "lumpsum-calculator",
    slug: "lumpsum-investment-calculator",
    title: "Lumpsum Equity Investment Calculator",
    shortDescription: "Calculate future value of a one-time lumpsum mutual fund or stock investment.",
    category: "mutual_funds",
    categoryLabel: "Mutual Funds"
  },
  {
    id: "swp-calculator",
    slug: "swp-systematic-withdrawal-calculator",
    title: "SWP (Systematic Withdrawal Plan) Payout Calculator",
    shortDescription: "Calculate monthly passive income withdrawals & remaining mutual fund corpus.",
    category: "mutual_funds",
    categoryLabel: "Mutual Funds"
  },

  // Category 4: Banking & Credit Cards
  {
    id: "creditcard-cashback",
    slug: "credit-card-cashback-calculator",
    title: "Credit Card Rewards & Cashback Optimizer",
    shortDescription: "Optimize annual cashback earnings across SBI Cashback, HDFC Millennia, Amazon Pay ICICI.",
    category: "banking",
    categoryLabel: "Credit Cards & Banking",
    badge: "Popular"
  },
  {
    id: "fd-rd-calculator",
    slug: "fd-rd-maturity-interest-calculator",
    title: "Bank FD & RD Interest Maturity Calculator",
    shortDescription: "Calculate quarterly compounded Fixed Deposit & Recurring Deposit returns.",
    category: "banking",
    categoryLabel: "Credit Cards & Banking"
  },
  {
    id: "auto-sweep",
    slug: "auto-sweep-savings-yield-calculator",
    title: "Savings Account vs Auto-Sweep FD Calculator",
    shortDescription: "Compare standard 3% savings interest vs 7.25% auto-sweep sweep-in FD returns.",
    category: "banking",
    categoryLabel: "Credit Cards & Banking"
  },
  {
    id: "loan-emi",
    slug: "personal-loan-emi-calculator",
    title: "Loan EMI & Interest Breakdown Calculator",
    shortDescription: "Calculate monthly EMI, total interest payable, and principal repayment schedule.",
    category: "banking",
    categoryLabel: "Credit Cards & Banking"
  },

  // Category 5: Tax & Retirement
  {
    id: "tax-regime-compare",
    slug: "income-tax-new-vs-old-regime-calculator",
    title: "New vs Old Income Tax Regime Calculator",
    shortDescription: "Compare tax liability under New Regime vs Old Regime (80C, 80D, HRA deductions).",
    category: "tax_retirement",
    categoryLabel: "Tax & Retirement",
    badge: "Tax 2026"
  },
  {
    id: "nps-calculator",
    slug: "nps-pension-and-tax-calculator",
    title: "NPS (National Pension System) Growth & Tax Calculator",
    shortDescription: "Calculate Sec 80CCD(1B) ₹50,000 tax savings, lump sum payout, and monthly pension.",
    category: "tax_retirement",
    categoryLabel: "Tax & Retirement"
  },
  {
    id: "ppf-calculator",
    slug: "ppf-public-provident-fund-calculator",
    title: "PPF (Public Provident Fund) Compounding Calculator",
    shortDescription: "Calculate guaranteed tax-free returns under PPF at 7.1% p.a. interest over 15 years.",
    category: "tax_retirement",
    categoryLabel: "Tax & Retirement"
  },
  {
    id: "inflation-calculator",
    slug: "inflation-future-purchasing-power-calculator",
    title: "Inflation Impact & Future Cost Calculator",
    shortDescription: "Calculate how inflation degrades purchasing power and project target retirement corpus.",
    category: "tax_retirement",
    categoryLabel: "Tax & Retirement"
  }
];
