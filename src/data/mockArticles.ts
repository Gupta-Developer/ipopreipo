import { ArticlePost, IPOResearchReport, NewsAlert } from "@/types/editor";

export const MOCK_ARTICLES: ArticlePost[] = [
  {
    id: "art-1",
    slug: "hyundai-motor-india-ipo-deep-dive-valuation-analysis",
    title: "Hyundai Motor India IPO Analysis: Is the Premium Valuation Justified?",
    excerpt: "Detailed break-up of Hyundai Motor India's ₹27,870 Cr mega IPO. We analyze operational margins, SUV market share, and EV roadmap vs Maruti Suzuki & Tata Motors.",
    content: `
# Hyundai Motor India IPO: Complete Analytical Review

Hyundai Motor India Limited (HMIL), India's second-largest passenger vehicle maker, has opened its mega ₹27,870 Crore initial public offering. The entire issue is an Offer for Sale (OFS) by parent Hyundai Motor Company Korea.

## Key Financial & Operational Highlights
- **Market Share**: HMIL commands an ~14.6% market share in India's passenger vehicle segment.
- **SUV Leadership**: Creta and Venue account for over 60% of total domestic volumes.
- **Financial Performance**: FY24 Revenue stood at ₹69,829 Cr with a PAT of ₹6,047 Cr (ROE of 29.5%).

## Valuation & Peer Multiples
At the upper price band of ₹1,960, Hyundai is valued at a Price-to-Earnings (P/E) multiple of **26.2x FY24 EPS**, compared to Maruti Suzuki's 29.5x and Tata Motors' 11.4x.

### Analyst Verdict
**Apply for Long Term**. High operational efficiency, premium SUV portfolio, and Talegaon plant expansion give HMIL strong multi-year compounding potential.
    `,
    category: "Research Report",
    status: "Published",
    author: {
      name: "Rajesh Sharma",
      role: "Head of Equity Research",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    tags: ["Hyundai IPO", "Auto Sector", "Mainboard IPO", "Valuation Report"],
    featuredImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    seoTitle: "Hyundai Motor India IPO Review: Valuation & Financial Analysis",
    seoDescription: "Hyundai Motor India IPO analysis, GMP, lot size, subscription status and analyst verdict on applying.",
    relatedIpoSlug: "hyundai-motor-india-ipo",
    publishDate: "2026-07-22",
    views: 45200,
    readingTimeMins: 6,
    isBreaking: false,
    isFeatured: true
  },
  {
    id: "art-2",
    slug: "top-5-pre-ipo-stocks-to-watch-in-2026",
    title: "Top 5 High-Growth Pre-IPO & Unlisted Shares in India (2026 Edition)",
    excerpt: "An in-depth look at Tata Capital, National Stock Exchange (NSE), Reliance Retail, boAt, and Swiggy before their official mainboard listing DRHP filings.",
    content: `
# Unlisted Equities Guide: Pre-IPO Opportunities in India

Investing in unlisted shares before an official IPO offers high upside potential for patient investors. Here are the top 5 high-demand pre-IPO shares analyzed by our team.

## 1. Tata Capital Limited
- **Sector**: Financial Services / NBFC
- **Current Unlisted Price**: ₹950 per share
- **Expected IPO Timeline**: Q4 2026

## 2. National Stock Exchange (NSE)
- **Sector**: Financial Infrastructure
- **Current Unlisted Price**: ₹6,200 per share
- **Key Catalyst**: Awaiting SEBI No-Objection Certificate.

## 3. Reliance Retail Ventures
- **Sector**: Omnichannel Retail
- **Current Unlisted Price**: ₹2,850 per share
- **Store Count**: 18,800+ stores across India.
    `,
    category: "Pre-IPO Insights",
    status: "Published",
    author: {
      name: "Priya Malhotra",
      role: "Pre-IPO & Wealth Specialist",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    },
    tags: ["Pre-IPO", "Tata Capital", "NSE Unlisted", "Wealth Management"],
    featuredImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    seoTitle: "Best Pre-IPO Shares in India 2026: Valuation & Buying Guide",
    seoDescription: "Explore top 5 pre-IPO unlisted shares in India including Tata Capital, NSE, and Reliance Retail.",
    publishDate: "2026-07-20",
    views: 31800,
    readingTimeMins: 8,
    isBreaking: false,
    isFeatured: true
  },
  {
    id: "art-3",
    slug: "sebi-streamlines-sme-ipo-listing-guidelines-2026",
    title: "SEBI Mandates Stricter Audit & Minimum Lot Size Norms for SME IPOs",
    excerpt: "Capital market regulator SEBI releases new regulatory circular introducing minimum net worth criteria and mandatory promoter lock-in extensions for SME listings.",
    content: `
# SEBI SME IPO Regulatory Updates

To curb speculative froth in small and medium enterprise (SME) listings, SEBI has implemented new operational guidelines effective August 1, 2026.

## Major Changes Mandated:
1. **Minimum Operating Profit**: SME companies must demonstrate positive EBITDA in 2 out of the last 3 financial years.
2. **Promoter Lock-In**: 50% of promoter holding locked in for 3 years instead of 1 year.
3. **Lot Size Floor**: Application size minimum floor increased to ₹2,00,000 for retail investors.
    `,
    category: "Regulatory & SEBI",
    status: "Published",
    author: {
      name: "Amitabh Verma",
      role: "Senior Financial Journalist",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    tags: ["SEBI", "SME IPO", "Regulations", "Market News"],
    seoTitle: "SEBI SME IPO New Rules 2026: Lock-in, Lot Size & Profit Criteria",
    seoDescription: "SEBI updates guidelines for SME IPOs. Check new minimum lot size, promoter lock-in, and audit norms.",
    publishDate: "2026-07-23",
    views: 18900,
    readingTimeMins: 4,
    isBreaking: true
  },
  {
    id: "art-4",
    slug: "swiggy-ipo-drhp-filed-issue-size-gmp",
    title: "Swiggy Files DRHP for ₹10,400 Cr IPO: Food Delivery & Instamart Financials Revealed",
    excerpt: "Food tech giant Swiggy submits DRHP with SEBI for ₹3,750 Cr fresh issue and ₹6,650 Cr OFS. Quick commerce growth drives revenue spike.",
    content: `
# Swiggy DRHP Analysis & Draft Prospectus Summary

Swiggy Limited has officially filed its Draft Red Herring Prospectus (DRHP) with SEBI for a public listing aiming to raise ₹10,400 Crores.

## Swiggy vs Zomato Financial Comparison:
- **Swiggy Instamart GOV Growth**: +74% YoY growth in Quick Commerce Gross Order Value.
- **Contribution Margin**: Improved to positive 1.2% in Q4 FY26.
    `,
    category: "IPO News",
    status: "Draft",
    author: {
      name: "Rajesh Sharma",
      role: "Head of Equity Research"
    },
    tags: ["Swiggy IPO", "Zomato", "Quick Commerce", "DRHP"],
    seoTitle: "Swiggy IPO DRHP Filed: Issue Size, Financials, Instamart GOV",
    seoDescription: "Swiggy files DRHP with SEBI for 10400 Cr IPO. Check fresh issue size, Instamart growth and comparison with Zomato.",
    publishDate: "2026-07-24",
    views: 0,
    readingTimeMins: 5
  }
];

export const MOCK_RESEARCH_REPORTS: IPOResearchReport[] = [
  {
    id: "rep-1",
    ipoName: "Hyundai Motor India Limited",
    ipoSlug: "hyundai-motor-india-ipo",
    analystName: "Rajesh Sharma, CFA",
    publishDate: "2026-07-22",
    verdict: "Apply for Long Term",
    targetPriceRange: "₹2,250 - ₹2,400",
    financialScore: 8.5,
    managementScore: 9.0,
    valuationScore: 7.0,
    industryScore: 8.8,
    overallRating: 4.5,
    bullPoints: [
      "2nd largest passenger vehicle manufacturer in India with ~14.6% market share",
      "High margin SUV portfolio (Creta, Venue, Alcazar) accounting for 60%+ volumes",
      "Strong parent backing & cash-flow positive balance sheet with zero debt",
      "Expansion into Talegaon plant adds 250,000 unit capacity by 2027"
    ],
    bearPoints: [
      "100% OFS issue; zero proceeds going to company balance sheet",
      "Royalty payout to Korean parent increases from 2.2% to 3.5% of revenue",
      "Intense competition in EV transition phase from Tata Motors & Mahindra"
    ],
    summary: "Hyundai India is a marquee auto franchise with best-in-class return metrics (ROE ~29.5%). Though priced at a full 26.2x P/E, long term compounding potential makes it a key portfolio anchor.",
    status: "Published"
  },
  {
    id: "rep-2",
    ipoName: "Swiggy Limited",
    ipoSlug: "swiggy-ipo",
    analystName: "Priya Malhotra",
    publishDate: "2026-07-24",
    verdict: "Apply for Listing Gain",
    targetPriceRange: "₹420 - ₹480",
    financialScore: 7.2,
    managementScore: 8.2,
    valuationScore: 6.8,
    industryScore: 9.2,
    overallRating: 3.8,
    bullPoints: [
      "Hyper-growth in Instamart Quick Commerce GOV (+74% YoY)",
      "Duopoly market structure with Zomato ensures pricing power",
      "High average order value in premium urban cohorts"
    ],
    bearPoints: [
      "Consolidated net loss still remains at ₹2,350 Cr in FY25",
      "Zepto & Blinkit aggressively expanding dark store density"
    ],
    summary: "Swiggy offers high growth exposure to India's booming quick commerce and food delivery ecosystem. Recommended for risk-seeking investors targeting listing gains.",
    status: "Draft"
  }
];

export const MOCK_NEWS_ALERTS: NewsAlert[] = [
  {
    id: "alt-1",
    title: "Hyundai Motor India Allotment Out!",
    message: "Hyundai Motor India IPO allotment status is now live on Link Intime & BSE portal. Click here to check your application status instantly.",
    category: "Allotment Alert",
    targetAudience: "Registered Allotment Seekers (142,000+ users)",
    sentTime: "2026-07-23 18:30",
    deliveredCount: 138400,
    openRatePercent: 68.4,
    linkUrl: "/allotment"
  },
  {
    id: "alt-2",
    title: "Swiggy IPO GMP Surges +42%!",
    message: "Swiggy Unlisted GMP jumped from ₹85 to ₹120 per share following DRHP approval. Read full valuation analysis.",
    category: "GMP Surge",
    targetAudience: "IPO Watchlist Subscribers (45,000+ users)",
    sentTime: "2026-07-24 09:15",
    deliveredCount: 44200,
    openRatePercent: 74.2,
    linkUrl: "/ipo/swiggy-ipo"
  }
];
