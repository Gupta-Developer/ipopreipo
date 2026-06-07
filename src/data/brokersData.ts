export interface BrokerCharges {
  opening: string;
  amc: string;
  callTrade: string;
}

export interface BrokerBrokerage {
  delivery: string;
  intraday: string;
  futures: string;
  options: string;
}

export interface BrokerTaxes {
  stt: { delivery: string; intraday: string; futures: string; options: string };
  stampDuty: { delivery: string; intraday: string; futures: string; options: string };
  exchangeCharges: { delivery: string; intraday: string; futures: string; options: string };
  sebiFees: { delivery: string; intraday: string; futures: string; options: string };
  gst: { delivery: string; intraday: string; futures: string; options: string };
  dpCharges: string;
}

export interface BrokerData {
  slug: string;
  name: string;
  country: string; // "IN", "US", "UK"
  countryName: string;
  rating: number;
  type: string;
  depository: string;
  activeClients: string;
  likes: number;
  summary: string;
  logoColor: string;
  logoLetter: string;
  segments: {
    equity: boolean;
    commodity: boolean;
    currency: boolean;
    futures: boolean;
    options: boolean;
  };
  charges: BrokerCharges;
  brokerage: BrokerBrokerage;
  margins: {
    delivery: string;
    intraday: string;
  };
  platforms: string[];
  pros: string[];
  cons: string[];
  additionalFeatures: { label: string; supported: boolean }[];
  otherInvestments: { label: string; supported: boolean }[];
  categoryRatings: {
    charges: number;
    usability: number;
    customerService: number;
  };
  detailedReviews: {
    charges: string;
    usability: string;
    service: string;
    opening: string;
  };
  taxes: BrokerTaxes;
  detailedArticle?: {
    title: string;
    intro: string;
    sections: {
      heading: string;
      content?: string;
      items?: string[];
    }[];
  };
}

export const BROKERS_DATA: BrokerData[] = [
  // --- INDIA BROKERS ---
  {
    slug: "groww",
    name: "Groww",
    country: "IN",
    countryName: "India",
    rating: 3.8,
    type: "Discount Broker",
    depository: "CDSL",
    activeClients: "6.8 Million+",
    likes: 935,
    summary: "Groww is a leading direct mutual fund and stock investing platform in India. Popular for its extremely intuitive user interface and zero account opening or maintenance fees, it focuses heavily on simplicity for retail investors.",
    logoColor: "#00d09c",
    logoLetter: "G",
    segments: { equity: true, commodity: false, currency: false, futures: true, options: true },
    charges: {
      opening: "₹0 (Free)",
      amc: "₹0 (Free)",
      callTrade: "Not Supported"
    },
    brokerage: {
      delivery: "0.05% or ₹20 max",
      intraday: "0.05% or ₹20 max",
      futures: "₹20 flat",
      options: "₹20 flat"
    },
    margins: {
      delivery: "1x (No Leverage)",
      intraday: "Up to 5x"
    },
    platforms: ["Groww Web", "Groww App (iOS & Android)"],
    pros: [
      "Zero Account Opening & Zero Annual Maintenance Charges (AMC)",
      "Clean, modern user interface perfect for beginners",
      "Direct mutual fund investments with zero commission fees",
      "Fast online paperless account opening process"
    ],
    cons: [
      "Does not support commodity or currency trading segments",
      "High default brokerage (0.05%) compared to other discount brokers for large volume deliveries",
      "Does not offer professional research reports, stock recommendations, or trading advisory",
      "No 3-in-1 bank integration account support"
    ],
    additionalFeatures: [
      { label: "3-in-1 Account", supported: false },
      { label: "Free Trading Calls", supported: false },
      { label: "Research Reports", supported: false },
      { label: "SMS Alerts", supported: true },
      { label: "Margin Funding", supported: false },
      { label: "Margin Against Shares", supported: true }
    ],
    otherInvestments: [
      { label: "Mutual Funds", supported: true },
      { label: "IPO Platform", supported: true },
      { label: "Bonds & Debt Instruments", supported: true },
      { label: "Exchange Traded Funds (ETFs)", supported: true },
      { label: "Gold & Insurance", supported: true }
    ],
    categoryRatings: {
      charges: 4.2,
      usability: 4.8,
      customerService: 3.5
    },
    detailedReviews: {
      charges: "Groww offers a highly competitive pricing model, charging absolutely zero fees for both account opening and lifetime AMC. The brokerage fee is fixed at a maximum of ₹20 per trade or 0.05% (whichever is lower), keeping it affordable for active retail players.",
      usability: "Usability is the core reason behind Groww's explosive user base growth. Its clean design, quick filters, integrated watchlist, and frictionless order execution modules ensure that first-time stock buyers do not get overwhelmed.",
      service: "Groww's support team is mostly ticketing-based. While mobile push notifications are fast, phone call support handles only critical issues, and resolution times can stretch during high volatility trading hours.",
      opening: "Demat account activation on Groww takes under 15 minutes. It utilizes instant e-KYC validation via DigiLocker and Aadhaar e-Sign, enabling same-day investment onboarding."
    },
    taxes: {
      stt: {
        delivery: "0.1% on buy & sell",
        intraday: "0.025% on sell only",
        futures: "0.0125% on sell only",
        options: "0.0625% on sell only (on premium)"
      },
      stampDuty: {
        delivery: "0.015% on buy",
        intraday: "0.003% on buy",
        futures: "0.002% on buy",
        options: "0.003% on buy"
      },
      exchangeCharges: {
        delivery: "NSE: 0.00322% | BSE: 0.00375%",
        intraday: "NSE: 0.00322% | BSE: 0.00375%",
        futures: "NSE: 0.0019% | BSE: 0",
        options: "NSE: 0.0505% | BSE: 0.0495%"
      },
      sebiFees: {
        delivery: "₹10 per Crore",
        intraday: "₹10 per Crore",
        futures: "₹10 per Crore",
        options: "₹10 per Crore"
      },
      gst: {
        delivery: "18% on (Brokerage + Exchange + SEBI)",
        intraday: "18% on (Brokerage + Exchange + SEBI)",
        futures: "18% on (Brokerage + Exchange + SEBI)",
        options: "18% on (Brokerage + Exchange + SEBI)"
      },
      dpCharges: "₹13.5 per company debit per day (charged by CDSL/Groww)"
    },
    detailedArticle: {
      title: "Why Choose Groww? Know Everything about Groww here.",
      intro: "Groww has rapidly emerged as one of India's leading investment platforms, capturing the attention of both novice and seasoned participants in the financial markets. Founded in 2017 with the core mission of democratising investing, Groww initially focused on simplifying mutual fund investments. Over time, it has strategically expanded its offerings to encompass a wide array of asset classes, including stocks, IPOs, Futures & Options, NFOs, and ETFs. The platform is lauded for its clean, intuitive user interface and its commitment to providing a seamless investment experience. This detailed review aims to examine the Groww app, examining its features, pricing, pros and cons, and specifically highlighting what it offers to both traders and long-term investors.",
      sections: [
        {
          heading: "What Groww Offers for Investors",
          content: "Groww provides a robust platform for individuals looking to build wealth over the long term through various investment avenues:",
          items: [
            "Mutual Funds: Groww exclusively offers direct mutual funds, which have a lower expense ratio compared to regular funds, leading to higher returns over time.",
            "Wide Range of Schemes: Investors can access a vast selection of mutual fund schemes across different categories (equity, debt, hybrid, sectoral, etc.).",
            "SIP and Lumpsum Investments: Groww facilitates both Systematic Investment Plans (SIPs) for regular investing and lumpsum investments.",
            "Easy Navigation and Filtering: Provides intuitive tools to filter and compare mutual funds based on parameters like returns, ratings, and expense ratios.",
            "Portfolio Tracking: Track the performance of your mutual fund and stock portfolio through a consolidated dashboard."
          ]
        },
        {
          heading: "What Groww Offers for Traders",
          content: "Groww has expanded its platform to cater to the needs of active traders, providing tools and features for efficient trading in the equity markets:",
          items: [
            "Real-time Market Data: Live stock prices and market movements.",
            "Advanced Charting Tools: Interactive charts with various technical indicators (e.g., moving averages, RSI, MACD) to aid in technical analysis.",
            "Multiple Order Types: Place market orders, limit orders, stop-loss orders, and GTT (Good Till Triggered) orders.",
            "Option Chain Analysis: Comprehensive view of option chains for indices and stocks, aiding in options trading strategy.",
            "Basket & Iceberg Orders: Execute complex multi-leg options strategies simultaneously or break large quantities to minimize market impact.",
            "Instant Margin Pledge: Pledge existing holdings to obtain trading margin for Futures & Options segments."
          ]
        },
        {
          heading: "Groww Trading Platforms",
          content: "Groww offers access to the financial markets through two primary trading platforms: the Groww Mobile App and the Groww Web Platform.",
          items: [
            "Groww Mobile App: Designed for mobile-first users. It features an incredibly clean UI, instant price alerts, option chains, TradingView charts integrations, and easy online IPO applications via UPI.",
            "Groww Web Platform: Ideal for desktop or laptop users. Features a streamlined Terminal Interface that integrates charts, technical indicators, order placement, open positions, and watchlists onto a single screen for professional efficiency."
          ]
        }
      ]
    }
  },
  {
    slug: "zerodha",
    name: "Zerodha",
    country: "IN",
    countryName: "India",
    rating: 4.4,
    type: "Discount Broker",
    depository: "CDSL",
    activeClients: "6.5 Million+",
    likes: 1250,
    summary: "Zerodha is the pioneer of discount broking in India and the largest broker by active retail trading volumes. It is highly valued for its advanced trading platform (Kite), zero delivery charges, and institutional-grade tools.",
    logoColor: "#387ed1",
    logoLetter: "Z",
    segments: { equity: true, commodity: true, currency: true, futures: true, options: true },
    charges: {
      opening: "₹200 (Online Demat + Trading)",
      amc: "₹300/year (billed quarterly)",
      callTrade: "₹50 per order executed"
    },
    brokerage: {
      delivery: "₹0 (Free)",
      intraday: "0.03% or ₹20 max",
      futures: "0.03% or ₹20 max",
      options: "₹20 flat"
    },
    margins: {
      delivery: "1x (No Leverage)",
      intraday: "Up to 5x"
    },
    platforms: ["Kite Web", "Kite Mobile App", "Console (Backoffice)", "Sensibull"],
    pros: [
      "Zero brokerage on equity delivery investments for lifetime",
      "Extremely robust API and advanced analytical charting options (Kite Connect)",
      "Supports all trading segments (Equity, Currency, Commodity, F&O)",
      "Clean product ecosystems with Console, Coin (Direct MF), and Varsity (Education)"
    ],
    cons: [
      "Charges account opening fee (₹200) and quarterly AMC",
      "No direct relationship managers or phone-based trading advice",
      "Doesn't support 3-in-1 bank account integration",
      "Occasional technical lags during extreme high-volume market events"
    ],
    additionalFeatures: [
      { label: "3-in-1 Account", supported: false },
      { label: "Free Trading Calls", supported: false },
      { label: "Research Reports", supported: false },
      { label: "SMS Alerts", supported: true },
      { label: "Margin Funding", supported: false },
      { label: "Margin Against Shares", supported: true }
    ],
    otherInvestments: [
      { label: "Mutual Funds", supported: true },
      { label: "IPO Platform", supported: true },
      { label: "Bonds & Debt Instruments", supported: true },
      { label: "Exchange Traded Funds (ETFs)", supported: true },
      { label: "Gold & Insurance", supported: true }
    ],
    categoryRatings: {
      charges: 4.5,
      usability: 4.6,
      customerService: 4.1
    },
    detailedReviews: {
      charges: "Zerodha is very transparent with charges. It offers zero delivery brokerage, which is an industry benchmark. For F&O and Intraday, it charges a max of ₹20 or 0.03%. Online account opening fee is ₹200.",
      usability: "Kite is widely regarded as one of the cleanest, fastest, and most advanced HTML5-based trading engines in India. It loads charts instantly and supports complex multi-indicator overlays.",
      service: "Customer service is highly organized. The support ticket desk handles account queries efficiently, and the community forum (TradingQ&A) provides direct answers from experts.",
      opening: "Onboarding is fully digital, validating your ID via PAN and Aadhaar. Post-verification, demat credentials are standardly generated within 12–24 hours."
    },
    taxes: {
      stt: {
        delivery: "0.1% on buy & sell",
        intraday: "0.025% on sell only",
        futures: "0.0125% on sell only",
        options: "0.0625% on sell only"
      },
      stampDuty: {
        delivery: "0.015% on buy",
        intraday: "0.003% on buy",
        futures: "0.002% on buy",
        options: "0.003% on buy"
      },
      exchangeCharges: {
        delivery: "NSE: 0.00322% | BSE: 0.00375%",
        intraday: "NSE: 0.00322% | BSE: 0.00375%",
        futures: "NSE: 0.0019% | BSE: 0",
        options: "NSE: 0.0505% | BSE: 0.0495%"
      },
      sebiFees: {
        delivery: "₹10 per Crore",
        intraday: "₹10 per Crore",
        futures: "₹10 per Crore",
        options: "₹10 per Crore"
      },
      gst: {
        delivery: "18% on (Brokerage + Exchange + SEBI)",
        intraday: "18% on (Brokerage + Exchange + SEBI)",
        futures: "18% on (Brokerage + Exchange + SEBI)",
        options: "18% on (Brokerage + Exchange + SEBI)"
      },
      dpCharges: "₹13.5 + GST per debit transaction"
    }
  },
  {
    slug: "angelone",
    name: "Angel One",
    country: "IN",
    countryName: "India",
    rating: 4.2,
    type: "Full Service Broker",
    depository: "CDSL",
    activeClients: "5.2 Million+",
    likes: 850,
    summary: "Angel One (formerly Angel Broking) is a premier full-service broker offering discount-brokerage pricing structure combined with full-service advisory reports, stock tips, dedicated relationship managers, and margin funding loans.",
    logoColor: "#f59e0b",
    logoLetter: "A",
    segments: { equity: true, commodity: true, currency: true, futures: true, options: true },
    charges: {
      opening: "₹0 (Free)",
      amc: "₹240/year (Free for 1st Year)",
      callTrade: "₹20 per order executed"
    },
    brokerage: {
      delivery: "₹0 (Free)",
      intraday: "0.03% or ₹20 max",
      futures: "₹20 flat",
      options: "₹20 flat"
    },
    margins: {
      delivery: "Up to 4x (MTF)",
      intraday: "Up to 5x"
    },
    platforms: ["Angel One Web", "Angel One Super App", "SmartAPI for algo trading"],
    pros: [
      "Zero brokerage on delivery and ₹0 account opening charges",
      "Provides stock market research, tips, and investment advisory for free",
      "Margin Trading Facility (MTF) with up to 4x leverage for holding delivery shares",
      "Dedicated client relationship managers"
    ],
    cons: [
      "Annual AMC charge (₹20 per month + GST) starts from the second year",
      "App UI is feature-heavy and can be slightly confusing for beginners",
      "No 3-in-1 bank integration options",
      "Spam alerts and sales calls are frequent"
    ],
    additionalFeatures: [
      { label: "3-in-1 Account", supported: false },
      { label: "Free Trading Calls", supported: true },
      { label: "Research Reports", supported: true },
      { label: "SMS Alerts", supported: true },
      { label: "Margin Funding", supported: true },
      { label: "Margin Against Shares", supported: true }
    ],
    otherInvestments: [
      { label: "Mutual Funds", supported: true },
      { label: "IPO Platform", supported: true },
      { label: "Bonds & Debt Instruments", supported: true },
      { label: "Exchange Traded Funds (ETFs)", supported: true },
      { label: "Gold & Insurance", supported: true }
    ],
    categoryRatings: {
      charges: 4.1,
      usability: 4.0,
      customerService: 4.4
    },
    detailedReviews: {
      charges: "Angel One has transitioned into a highly competitive hybrid model. It charges zero delivery fees and standardizes F&O or Intraday trades at a flat ₹20 limit.",
      usability: "The mobile platform has been revamped as the 'Super App'. It bundles mutual funds, news tickers, portfolio insights, and automated trading algorithms into one interface.",
      service: "Customer service is highly rated. Relationship managers help clients set up trading systems, and advisory reports are sent daily via WhatsApp/email.",
      opening: "Demat setups are processed seamlessly using instant paperless Aadhaar-based OTP signing, usually activated on the CDSL depository within 24 hours."
    },
    taxes: {
      stt: {
        delivery: "0.1% on buy & sell",
        intraday: "0.025% on sell only",
        futures: "0.0125% on sell only",
        options: "0.0625% on sell only"
      },
      stampDuty: {
        delivery: "0.015% on buy",
        intraday: "0.003% on buy",
        futures: "0.002% on buy",
        options: "0.003% on buy"
      },
      exchangeCharges: {
        delivery: "NSE: 0.00322% | BSE: 0.00375%",
        intraday: "NSE: 0.00322% | BSE: 0.00375%",
        futures: "NSE: 0.0019% | BSE: 0",
        options: "NSE: 0.0505% | BSE: 0.0495%"
      },
      sebiFees: {
        delivery: "₹10 per Crore",
        intraday: "₹10 per Crore",
        futures: "₹10 per Crore",
        options: "₹10 per Crore"
      },
      gst: {
        delivery: "18% on (Brokerage + Exchange + SEBI)",
        intraday: "18% on (Brokerage + Exchange + SEBI)",
        futures: "18% on (Brokerage + Exchange + SEBI)",
        options: "18% on (Brokerage + Exchange + SEBI)"
      },
      dpCharges: "₹20 + GST per debit transaction"
    }
  },

  // --- UNITED STATES BROKERS ---
  {
    slug: "robinhood",
    name: "Robinhood",
    country: "US",
    countryName: "United States",
    rating: 4.0,
    type: "Discount Broker",
    depository: "APEX Clearing",
    activeClients: "23 Million+",
    likes: 2150,
    summary: "Robinhood pioneered commission-free stock and options trading in the US. Popular for its extremely simple UI, it is the primary onboarding vehicle for young retail options traders in the United States.",
    logoColor: "#5eff5e",
    logoLetter: "R",
    segments: { equity: true, commodity: false, currency: false, futures: false, options: true },
    charges: {
      opening: "$0 (Free)",
      amc: "$0 (Free) / Gold: $5/mo",
      callTrade: "Not Supported"
    },
    brokerage: {
      delivery: "$0 (Free)",
      intraday: "$0 (Free)",
      futures: "Not Supported",
      options: "$0 (Free) + $0.03 regulatory fee"
    },
    margins: {
      delivery: "Up to 2x (Schwab/IBKR matching)",
      intraday: "Up to 4x"
    },
    platforms: ["Robinhood App (iOS/Android)", "Robinhood Web"],
    pros: [
      "Absolutely $0 commission on US Stocks, ETFs, and Options trading",
      "Extremely intuitive mobile experience with simple layouts",
      "Supports fractional stock purchases (starting at just $1)",
      "High yield cash sweeps of up to 5% APY on uninvested cash (Gold members)"
    ],
    cons: [
      "No futures or mutual fund investment support",
      "Customer support is text/chat based, no direct phone brokers",
      "Limited charting tool overlays and advanced analysis packages",
      "No 3-in-1 bank integration options"
    ],
    additionalFeatures: [
      { label: "3-in-1 Account", supported: false },
      { label: "Free Trading Calls", supported: false },
      { label: "Research Reports", supported: true },
      { label: "SMS Alerts", supported: false },
      { label: "Margin Funding", supported: true },
      { label: "Margin Against Shares", supported: true }
    ],
    otherInvestments: [
      { label: "Mutual Funds", supported: false },
      { label: "IPO Platform", supported: true },
      { label: "Bonds & Debt Instruments", supported: false },
      { label: "Exchange Traded Funds (ETFs)", supported: true },
      { label: "Gold & Insurance", supported: false }
    ],
    categoryRatings: {
      charges: 4.8,
      usability: 4.9,
      customerService: 3.2
    },
    detailedReviews: {
      charges: "Robinhood has zero commission structure. Options, delivery, and accounts are completely free. Robinhood Gold ($5/mo) unlocks high sweep rates and margin lines.",
      usability: "Usability is unmatched. Executing an option trade takes three simple steps, with neat charts showing the profit/loss zones.",
      service: "Customer service has historically faced criticisms. The app now supports 24/7 call-backs, but lacks specialized branch brokers.",
      opening: "Account setup takes minutes for US residents with paperless SSN and e-Sign checks."
    },
    taxes: {
      stt: { delivery: "$0", intraday: "$0", futures: "$0", options: "$0" },
      stampDuty: { delivery: "$0", intraday: "$0", futures: "$0", options: "$0" },
      exchangeCharges: {
        delivery: "SEC Fee: $27.80 per million",
        intraday: "SEC Fee: $27.80 per million",
        futures: "$0",
        options: "FINRA Activity Fee: $0.00244 per contract"
      },
      sebiFees: { delivery: "$0", intraday: "$0", futures: "$0", options: "$0" },
      gst: { delivery: "$0", intraday: "$0", futures: "$0", options: "$0" },
      dpCharges: "Not Applicable (APEX clearing fee covered)"
    }
  },
  {
    slug: "ibkr",
    name: "Interactive Brokers",
    country: "US",
    countryName: "United States",
    rating: 4.7,
    type: "Discount Broker",
    depository: "Self-Clearing (IBKR)",
    activeClients: "2.6 Million+",
    likes: 1840,
    summary: "Interactive Brokers (IBKR) is the gold standard for global investors, active day traders, and institutions. It offers access to over 150 global markets in 33 countries with institutional-grade pricing and margin rates.",
    logoColor: "#e11d48",
    logoLetter: "I",
    segments: { equity: true, commodity: true, currency: true, futures: true, options: true },
    charges: {
      opening: "$0 (Free)",
      amc: "$0 (Free)",
      callTrade: "$0.01 per share"
    },
    brokerage: {
      delivery: "$0.005 per share (Lite) | Tiered (Pro)",
      intraday: "$0.005 per share (Lite) | Tiered (Pro)",
      futures: "$0.85 per contract",
      options: "$0.65 per contract"
    },
    margins: {
      delivery: "Up to 4x (MTF)",
      intraday: "Up to 4x"
    },
    platforms: ["Trader Workstation (TWS)", "IBKR Mobile", "Client Portal Web"],
    pros: [
      "Access to 150+ international exchanges in 33 countries",
      "Lowest margin loan rates in the brokerage industry (under 6% APY)",
      "High interest payouts on cash balances (up to 4.83% APY)",
      "Advanced algorithmic trading setups and professional desktop dashboard"
    ],
    cons: [
      "TWS Desktop software has a very steep learning curve for beginners",
      "Brokerage structures (Lite vs Pro, Tiered vs Fixed) can be confusing",
      "Account opening process is highly detailed and requires compliance checks",
      "Occasional data subscription charges for real-time streaming quotes"
    ],
    additionalFeatures: [
      { label: "3-in-1 Account", supported: false },
      { label: "Free Trading Calls", supported: false },
      { label: "Research Reports", supported: true },
      { label: "SMS Alerts", supported: true },
      { label: "Margin Funding", supported: true },
      { label: "Margin Against Shares", supported: true }
    ],
    otherInvestments: [
      { label: "Mutual Funds", supported: true },
      { label: "IPO Platform", supported: true },
      { label: "Bonds & Debt Instruments", supported: true },
      { label: "Exchange Traded Funds (ETFs)", supported: true },
      { label: "Gold & Insurance", supported: false }
    ],
    categoryRatings: {
      charges: 4.9,
      usability: 3.8,
      customerService: 4.2
    },
    detailedReviews: {
      charges: "IBKR Lite offers zero commission on US stocks. IBKR Pro features extremely low tiered commission rates that decline with higher trading volumes, making it ideal for active traders.",
      usability: "Trader Workstation (TWS) is designed for professionals. While full of complex option grids and hotkey routing tools, it is too complex for casual stock buyers.",
      service: "Customer service is highly professional with international support lines and detailed ticketing solutions.",
      opening: "Account registration is thorough. Because they support trading across international borders, you must submit details of tax residency."
    },
    taxes: {
      stt: { delivery: "$0", intraday: "$0", futures: "$0", options: "$0" },
      stampDuty: { delivery: "$0", intraday: "$0", futures: "$0", options: "$0" },
      exchangeCharges: {
        delivery: "SEC fee applies to US sell trades",
        intraday: "SEC fee applies to US sell trades",
        futures: "Exchange fees vary by contract",
        options: "OCC fees apply ($0.05 max per contract)"
      },
      sebiFees: { delivery: "$0", intraday: "$0", futures: "$0", options: "$0" },
      gst: { delivery: "$0", intraday: "$0", futures: "$0", options: "$0" },
      dpCharges: "Not Applicable"
    }
  },

  // --- UNITED KINGDOM BROKERS ---
  {
    slug: "trading212",
    name: "Trading 212",
    country: "UK",
    countryName: "United Kingdom",
    rating: 4.1,
    type: "Discount Broker",
    depository: "Interactive Brokers (Custody)",
    activeClients: "1.5 Million+",
    likes: 670,
    summary: "Trading 212 is a popular zero-commission stockbroker in the UK and Europe. Known for its clean mobile app interface and Stock ISA tax wrap support, it simplifies global equity access for European retail investors.",
    logoColor: "#0052ff",
    logoLetter: "T",
    segments: { equity: true, commodity: false, currency: false, futures: false, options: false },
    charges: {
      opening: "£0 (Free)",
      amc: "£0 (Free)",
      callTrade: "Not Supported"
    },
    brokerage: {
      delivery: "£0 (Free)",
      intraday: "£0 (Free)",
      futures: "Not Supported",
      options: "Not Supported"
    },
    margins: {
      delivery: "1x (No Leverage)",
      intraday: "Not Supported"
    },
    platforms: ["Trading 212 App", "Trading 212 Web"],
    pros: [
      "Zero commission stock and ETF purchases inside UK ISAs",
      "AutoInvest feature with automated fractional stock portfolios (Pies)",
      "Instant account funding via digital wallets (Apple Pay/Google Pay)",
      "High cash balance interest yields"
    ],
    cons: [
      "Does not support futures, options, or complex derivatives",
      "Foreign exchange fee of 0.15% applies on non-GBP investments",
      "No professional broker-assisted phone trade desks",
      "High deposit fee (0.7%) on card transfers above £2,000"
    ],
    additionalFeatures: [
      { label: "3-in-1 Account", supported: false },
      { label: "Free Trading Calls", supported: false },
      { label: "Research Reports", supported: false },
      { label: "SMS Alerts", supported: true },
      { label: "Margin Funding", supported: false },
      { label: "Margin Against Shares", supported: false }
    ],
    otherInvestments: [
      { label: "Mutual Funds", supported: false },
      { label: "IPO Platform", supported: true },
      { label: "Bonds & Debt Instruments", supported: false },
      { label: "Exchange Traded Funds (ETFs)", supported: true },
      { label: "Gold & Insurance", supported: false }
    ],
    categoryRatings: {
      charges: 4.6,
      usability: 4.7,
      customerService: 3.8
    },
    detailedReviews: {
      charges: "Trading 212 offers £0 commission on delivery shares. Their main fee is a small 0.15% FX conversion fee when buying US or international stocks.",
      usability: "The 'Pies & AutoInvest' feature allows users to construct visual stock charts of targets and automatically rebalance them with weekly deposits.",
      service: "Customer service is primarily ticket-based with chat features directly in the mobile app.",
      opening: " ऑन-स्क्रीन e-KYC and digital ID checks standardly activate the account within 1-2 hours."
    },
    taxes: {
      stt: { delivery: "Stamp Duty Reserve Tax: 0.5% (UK stocks only)", intraday: "$0", futures: "$0", options: "$0" },
      stampDuty: { delivery: "0.5% on buy (UK stocks only)", intraday: "$0", futures: "$0", options: "$0" },
      exchangeCharges: {
        delivery: "PTM Levy: £1 on trades above £10,000",
        intraday: "PTM Levy: £1 on trades above £10,000",
        futures: "$0",
        options: "$0"
      },
      sebiFees: { delivery: "$0", intraday: "$0", futures: "$0", options: "$0" },
      gst: { delivery: "$0", intraday: "$0", futures: "$0", options: "$0" },
      dpCharges: "Not Applicable"
    }
  }
];
