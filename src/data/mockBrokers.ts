import { BrokerData } from "@/types/ipo";

export const MOCK_BROKERS: BrokerData[] = [
  {
    id: "br1",
    name: "Zerodha",
    type: "Discount Broker",
    equityDeliveryFee: "₹0 (Free)",
    equityIntradayFee: "₹20 or 0.03% (Whichever is lower)",
    fnOFee: "₹20 per executed order",
    dematAnualFee: "₹300 / year",
    accountOpeningFee: "₹200",
    ipoApplicationMethod: "UPI 2.0 & Net Banking ASBA",
    rating: 4.8,
    activeClientsNse: "7.5+ Million",
    pros: [
      "No brokerage on long-term equity delivery investments.",
      "Kite platform is fast, clean, and reliable.",
      "Seamless UPI IPO application workflow with instant mandate generation."
    ],
    cons: [
      "No advisory or stock research tips provided.",
      "Customer support response times can be slow."
    ],
    openAccountUrl: "https://zerodha.com"
  },
  {
    id: "br2",
    name: "Angel One",
    type: "Full-Service Broker",
    equityDeliveryFee: "₹0 (Free for 30 days)",
    equityIntradayFee: "₹20 or 0.25%",
    fnOFee: "₹20 per executed order",
    dematAnualFee: "₹240 / year (First year free)",
    accountOpeningFee: "₹0 (Free)",
    ipoApplicationMethod: "UPI 2.0 & One-Click ASBA",
    rating: 4.6,
    activeClientsNse: "5.2+ Million",
    pros: [
      "Free account opening & zero AMC for 1st year.",
      "ARQ Prime AI-based research recommendations.",
      "Pre-IPO & SME IPO quick application features."
    ],
    cons: [
      "Hidden charges for paper statements & physical DP requests."
    ],
    openAccountUrl: "https://angelone.in"
  },
  {
    id: "br3",
    name: "Groww",
    type: "Discount Broker",
    equityDeliveryFee: "₹20 or 0.05%",
    equityIntradayFee: "₹20 or 0.05%",
    fnOFee: "₹20 per executed order",
    dematAnualFee: "₹0 (Zero AMC Lifetime)",
    accountOpeningFee: "₹0 (Free)",
    ipoApplicationMethod: "Instant UPI Mandate",
    rating: 4.7,
    activeClientsNse: "10.1+ Million",
    pros: [
      "Zero Demat AMC for lifetime.",
      "Ultra-simple UI designed for beginner retail investors.",
      "In-app IPO status tracking and fast UPI approval."
    ],
    cons: [
      "Advanced charting tools are slightly basic compared to Kite."
    ],
    openAccountUrl: "https://groww.in"
  },
  {
    id: "br4",
    name: "ProStocks",
    type: "Discount Broker",
    equityDeliveryFee: "₹0 or Unlimited Flat ₹899/month",
    equityIntradayFee: "₹15 per trade or ₹899/month",
    fnOFee: "₹15 per trade or ₹899/month",
    dematAnualFee: "₹0 (Refundable Deposit)",
    accountOpeningFee: "₹0 (Free)",
    ipoApplicationMethod: "ASBA Netbanking & UPI",
    rating: 4.3,
    activeClientsNse: "500,000+",
    pros: [
      "Unlimited trading monthly subscription plan at ₹899.",
      "Zero AMC options with refundable deposit.",
      "High leverage and dedicated API trading options."
    ],
    cons: [
      "Mobile app interface is basic."
    ],
    openAccountUrl: "https://prostocks.com"
  }
];
