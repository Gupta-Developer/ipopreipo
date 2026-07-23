import { BuybackData } from "@/types/ipo";

export const MOCK_BUYBACKS: BuybackData[] = [
  {
    id: "b1",
    companyName: "Tata Consultancy Services (TCS)",
    slug: "tcs-buyback-2026",
    issueType: "Tender Offer",
    buybackPrice: 4500,
    currentMarketPrice: 3950,
    premiumPercent: 13.92,
    issueSizeCr: 17000.0,
    recordDate: "2026-08-05",
    openDate: "2026-08-14",
    closeDate: "2026-08-20",
    acceptanceRatioEstimate: "20% - 35%",
    status: "Upcoming"
  },
  {
    id: "b2",
    companyName: "Infosys Limited",
    slug: "infosys-buyback",
    issueType: "Open Market",
    buybackPrice: 1950,
    currentMarketPrice: 1720,
    premiumPercent: 13.37,
    issueSizeCr: 9300.0,
    recordDate: "2026-07-15",
    openDate: "2026-07-22",
    closeDate: "2026-10-20",
    acceptanceRatioEstimate: "Open Market Bidding",
    status: "Active"
  },
  {
    id: "b3",
    companyName: "Wipro Limited",
    slug: "wipro-buyback",
    issueType: "Tender Offer",
    buybackPrice: 580,
    currentMarketPrice: 495,
    premiumPercent: 17.17,
    issueSizeCr: 12000.0,
    recordDate: "2026-06-30",
    openDate: "2026-07-08",
    closeDate: "2026-07-14",
    acceptanceRatioEstimate: "28.5%",
    status: "Closed"
  }
];
