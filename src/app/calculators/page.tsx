"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Calculator as CalcIcon, 
  TrendingUp, 
  Percent, 
  CreditCard, 
  Briefcase, 
  Coins, 
  Sparkles, 
  Zap, 
  Clock, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  Search,
  Filter,
  BarChart3,
  Award,
  Layers,
  CheckCircle2,
  DollarSign,
  PieChart,
  ShieldAlert,
  Sliders,
  Calendar,
  Wallet
} from "lucide-react";
import { CALCULATORS_LIST, CalculatorMeta } from "@/data/calculatorsData";

export default function CalculatorsPage() {
  const [selectedCalcId, setSelectedCalcId] = useState<string>("ipo-gain");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered List
  const filteredCalculators = useMemo(() => {
    return CALCULATORS_LIST.filter((calc) => {
      if (categoryFilter !== "all" && calc.category !== categoryFilter) return false;
      if (searchQuery.trim() && !calc.title.toLowerCase().includes(searchQuery.toLowerCase()) && !calc.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [categoryFilter, searchQuery]);

  const activeMeta = CALCULATORS_LIST.find((c) => c.id === selectedCalcId) || CALCULATORS_LIST[0];

  // ==================== CALCULATOR STATES & FORMULAS ====================

  // 1. IPO Listing Gain
  const [ipoLots, setIpoLots] = useState<number>(1);
  const [ipoLotSize, setIpoLotSize] = useState<number>(35);
  const [ipoPrice, setIpoPrice] = useState<number>(425);
  const [ipoGmp, setIpoGmp] = useState<number>(65);
  const [ipoTaxRate, setIpoTaxRate] = useState<number>(20);

  const ipoTotalShares = ipoLots * ipoLotSize;
  const ipoInvestment = ipoTotalShares * ipoPrice;
  const ipoGrossProfit = ipoTotalShares * ipoGmp;
  const ipoTax = Math.max(0, ipoGrossProfit * (ipoTaxRate / 100));
  const ipoNetProfit = ipoGrossProfit - ipoTax;
  const ipoListingPrice = ipoPrice + ipoGmp;

  // 2. IPO Allotment Multi-Account
  const [retailSub, setRetailSub] = useState<number>(35);
  const [numPanAccounts, setNumPanAccounts] = useState<number>(3);
  const pSingle = retailSub > 0 ? Math.min(1, 1 / retailSub) : 0;
  const multiPanProb = (1 - Math.pow(1 - pSingle, numPanAccounts)) * 100;

  // 3. Pre-IPO CAGR
  const [preIpoBuy, setPreIpoBuy] = useState<number>(250);
  const [preIpoQty, setPreIpoQty] = useState<number={500}>({500} as any);
  const [preIpoQtyNum, setPreIpoQtyNum] = useState<number>(500);
  const [preIpoTarget, setPreIpoTarget] = useState<number>(450);
  const [preIpoMonths, setPreIpoMonths] = useState<number>(18);
  const preIpoCost = preIpoBuy * preIpoQtyNum;
  const preIpoVal = preIpoTarget * preIpoQtyNum;
  const preIpoGainVal = preIpoVal - preIpoCost;
  const preIpoCagr = preIpoMonths > 0 && preIpoCost > 0 ? (Math.pow(preIpoVal / preIpoCost, 12 / preIpoMonths) - 1) * 100 : 0;

  // 4. SME IPO Lot Risk
  const [smePrice, setSmePrice] = useState<number>(70);
  const [smeLotSize, setSmeLotSize] = useState<number>(2000);
  const [smeGmp, setSmeGmp] = useState<number>(16);
  const smeInvestment = smePrice * smeLotSize;
  const smeExpectedProfit = smeGmp * smeLotSize;

  // 5. STCG & LTCG Tax Calculator
  const [stcgGains, setStcgGains] = useState<number>(150000);
  const [ltcgGains, setLtcgGains] = useState<number>(250000);
  const stcgTaxVal = stcgGains * 0.20; // 20% Budget 2024
  const ltcgTaxable = Math.max(0, ltcgGains - 125000); // ₹1.25L exempt
  const ltcgTaxVal = ltcgTaxable * 0.125; // 12.5% Budget 2024
  const totalEquityTax = stcgTaxVal + ltcgTaxVal;

  // 6. Brokerage & Statutory Charges
  const [turnoverVal, setTurnoverVal] = useState<number>(100000);
  const [tradeType, setTradeType] = useState<"delivery" | "intraday" | "options">("delivery");
  const sttFee = tradeType === "delivery" ? turnoverVal * 0.001 : turnoverVal * 0.00025;
  const exchangeFee = turnoverVal * 0.000035;
  const gstFee = (20 + exchangeFee) * 0.18;
  const totalCharges = 20 + sttFee + exchangeFee + gstFee; // flat ₹20 brokerage

  // 7. Dividend Tax
  const [divAnnualIncome, setDivAnnualIncome] = useState<number>(50000);
  const [taxSlab, setTaxSlab] = useState<number>(30);
  const tdsDeducted = divAnnualIncome > 5000 ? divAnnualIncome * 0.10 : 0;
  const netSlabTax = divAnnualIncome * (taxSlab / 100);
  const finalNetDividend = divAnnualIncome - netSlabTax;

  // 8. Position Sizing
  const [portfolioSize, setPortfolioSize] = useState<number>(500000);
  const [riskPerTradePct, setRiskPerTradePct] = useState<number>(2); // 2% risk
  const [entryPrice, setEntryPrice] = useState<number>(500);
  const [stopLossPrice, setStopLossPrice] = useState<number>(470);
  const riskAmount = portfolioSize * (riskPerTradePct / 100);
  const riskPerShare = Math.max(1, entryPrice - stopLossPrice);
  const maxSharesToBuy = Math.floor(riskAmount / riskPerShare);
  const totalPositionCost = maxSharesToBuy * entryPrice;

  // 9. SIP Calculator
  const [sipMonthly, setSipMonthly] = useState<number>(10000);
  const [sipReturnRate, setSipReturnRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);
  const sipMonthsCount = sipYears * 12;
  const sipMonthlyRate = sipReturnRate / 12 / 100;
  const sipFutureVal = sipMonthly * ((Math.pow(1 + sipMonthlyRate, sipMonthsCount) - 1) / sipMonthlyRate) * (1 + sipMonthlyRate);
  const sipTotalInvested = sipMonthly * sipMonthsCount;
  const sipWealthGain = sipFutureVal - sipTotalInvested;

  // 10. Step-Up SIP
  const [stepSipMonthly, setStepSipMonthly] = useState<number>(10000);
  const [stepAnnualPct, setStepAnnualPct] = useState<number>(10); // 10% annual top up
  const [stepYears, setStepYears] = useState<number>(10);
  const [stepReturnRate, setStepReturnRate] = useState<number>(12);
  let stepTotalInvested = 0;
  let stepFutureVal = 0;
  let currSip = stepSipMonthly;
  const rM = stepReturnRate / 12 / 100;
  for (let y = 1; y <= stepYears; y++) {
    for (let m = 1; m <= 12; m++) {
      stepTotalInvested += currSip;
      const monthsRemaining = (stepYears - y) * 12 + (12 - m + 1);
      stepFutureVal += currSip * Math.pow(1 + rM, monthsRemaining);
    }
    currSip *= (1 + stepAnnualPct / 100);
  }

  // 11. Lumpsum Investment
  const [lumpAmount, setLumpAmount] = useState<number>(100000);
  const [lumpReturnRate, setLumpReturnRate] = useState<number>(12);
  const [lumpYears, setLumpYears] = useState<number>(10);
  const lumpFutureVal = lumpAmount * Math.pow(1 + lumpReturnRate / 100, lumpYears);
  const lumpGain = lumpFutureVal - lumpAmount;

  // 12. SWP Calculator
  const [swpCorpus, setSwpCorpus] = useState<number>(2000000);
  const [swpMonthlyWithdrawal, setSwpMonthlyWithdrawal] = useState<number>(15000);
  const [swpExpectedReturn, setSwpExpectedReturn] = useState<number>(8);
  const [swpYears, setSwpYears] = useState<number>(15);
  let swpRemCorpus = swpCorpus;
  const rSwp = swpExpectedReturn / 12 / 100;
  const swpTotalWithdrawn = swpMonthlyWithdrawal * 12 * swpYears;
  for (let m = 1; m <= swpYears * 12; m++) {
    swpRemCorpus = (swpRemCorpus - swpMonthlyWithdrawal) * (1 + rSwp);
  }

  // 13. Credit Card Cashback
  const [ccOnlineSpend, setCcOnlineSpend] = useState<number>(25000);
  const [ccUtilitySpend, setCcUtilitySpend] = useState<number>(10000);
  const [ccTravelSpend, setCcTravelSpend] = useState<number>(15000);
  const ccMonthlyCb = (ccOnlineSpend * 0.05) + (ccUtilitySpend * 0.01) + (ccTravelSpend * 0.05);
  const ccAnnualCb = ccMonthlyCb * 12;

  // 14. FD / RD Interest
  const [fdPrincipal, setFdPrincipal] = useState<number>(100000);
  const [fdRate, setFdRate] = useState<number>(7.25);
  const [fdTenureYears, setFdTenureYears] = useState<number>(3);
  const fdMaturityVal = fdPrincipal * Math.pow(1 + (fdRate / 400), 4 * fdTenureYears); // Quarterly compounding
  const fdInterestEarned = fdMaturityVal - fdPrincipal;

  // 15. Savings vs Auto-Sweep
  const [avgSavingsBal, setAvgSavingsBal] = useState<number>(300000);
  const normalSavingsInt = avgSavingsBal * 0.03;
  const autoSweepInt = avgSavingsBal * 0.0725;
  const extraSweepYield = autoSweepInt - normalSavingsInt;

  // 16. Personal Loan EMI
  const [loanAmt, setLoanAmt] = useState<number>(500000);
  const [loanRatePct, setLoanRatePct] = useState<number>(10.5);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);
  const rLoan = loanRatePct / 12 / 100;
  const nLoan = loanTenureYears * 12;
  const loanEmi = (loanAmt * rLoan * Math.pow(1 + rLoan, nLoan)) / (Math.pow(1 + rLoan, nLoan) - 1);
  const loanTotalPayment = loanEmi * nLoan;
  const loanTotalInterest = loanTotalPayment - loanAmt;

  // 17. New vs Old Tax Regime
  const [grossAnnualSalary, setGrossAnnualSalary] = useState<number>(1200000);
  const [sec80cDeduction, setSec80cDeduction] = useState<number>(150000);
  const [hraDeduction, setHraDeduction] = useState<number>(100000);
  
  // Tax calculations
  const taxableOld = Math.max(0, grossAnnualSalary - 50000 - sec80cDeduction - hraDeduction);
  const taxableNew = Math.max(0, grossAnnualSalary - 75000); // Standard deduction ₹75K in New Regime

  const calculateNewRegimeTax = (inc: number) => {
    let tax = 0;
    if (inc > 300000) tax += Math.min(300000, inc - 300000) * 0.05;
    if (inc > 700000) tax += Math.min(300000, inc - 700000) * 0.10;
    if (inc > 1000000) tax += Math.min(200000, inc - 1000000) * 0.15;
    if (inc > 1200000) tax += Math.min(300000, inc - 1200000) * 0.20;
    if (inc > 1500000) tax += (inc - 1500000) * 0.30;
    return tax * 1.04; // 4% cess
  };

  const calculateOldRegimeTax = (inc: number) => {
    let tax = 0;
    if (inc > 250000) tax += Math.min(250000, inc - 250000) * 0.05;
    if (inc > 500000) tax += Math.min(500000, inc - 500000) * 0.20;
    if (inc > 1000000) tax += (inc - 1000000) * 0.30;
    return tax * 1.04;
  };

  const taxNewVal = calculateNewRegimeTax(taxableNew);
  const taxOldVal = calculateOldRegimeTax(taxableOld);

  // 18. NPS Tax & Pension
  const [npsMonthly, setNpsMonthly] = useState<number>(5000);
  const [npsAgeCurrent, setNpsAgeCurrent] = useState<number>(30);
  const npsYearsToRetire = Math.max(1, 60 - npsAgeCurrent);
  const npsMonths = npsYearsToRetire * 12;
  const npsRateM = 0.10 / 12;
  const npsCorpus = npsMonthly * ((Math.pow(1 + npsRateM, npsMonths) - 1) / npsRateM) * (1 + npsRateM);
  const npsLumpsum60 = npsCorpus * 0.60;
  const npsAnnuity40 = npsCorpus * 0.40;
  const npsMonthlyPension = (npsAnnuity40 * 0.06) / 12; // 6% annuity yield

  // 19. PPF Compounding
  const [ppfAnnualInv, setPpfAnnualInv] = useState<number>(150000);
  let ppfMaturityVal = 0;
  for (let i = 1; i <= 15; i++) {
    ppfMaturityVal = (ppfMaturityVal + ppfAnnualInv) * 1.071; // 7.1% p.a.
  }
  const ppfTotalInvested = ppfAnnualInv * 15;
  const ppfInterestGain = ppfMaturityVal - ppfTotalInvested;

  // 20. Inflation Impact
  const [currExpenses, setCurrExpenses] = useState<number>(50000);
  const [inflationRatePct, setInflationRatePct] = useState<number>(6);
  const [inflationYears, setInflationYears] = useState<number>(15);
  const futureExpenses = currExpenses * Math.pow(1 + inflationRatePct / 100, inflationYears);

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-8">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-10 px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
            <CalcIcon className="w-3.5 h-3.5 text-blue-700" />
            20 Comprehensive Financial Calculators
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Financial &amp; Investment Calculators Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
            Institutional-grade calculators for IPO Listing Gains, Allotment Odds, Budget 2024 STCG/LTCG Taxes, SIP Compounding, Credit Card Cashback, and Retirement Planning.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Category & Search Filter Bar */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Category:
            </span>

            {[
              { id: "all", label: "All 20 Calculators" },
              { id: "ipo", label: "IPO & Pre-IPO" },
              { id: "stocks", label: "Equity & Market" },
              { id: "mutual_funds", label: "Mutual Funds" },
              { id: "banking", label: "Banking & Cards" },
              { id: "tax_retirement", label: "Tax & Retirement" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  categoryFilter === cat.id
                    ? "bg-blue-900 text-white border-blue-900 font-bold shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search calculator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-700 bg-slate-50"
            />
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Calculator Selector List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 px-1">
              Select Calculator ({filteredCalculators.length})
            </h3>

            <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
              {filteredCalculators.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setSelectedCalcId(calc.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1 block ${
                    selectedCalcId === calc.id
                      ? "bg-blue-900 text-white border-blue-900 shadow-md"
                      : "bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded ${
                      selectedCalcId === calc.id ? "bg-blue-800 text-blue-200" : "bg-slate-100 text-slate-600"
                    }`}>
                      {calc.categoryLabel}
                    </span>
                    {calc.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                        {calc.badge}
                      </span>
                    )}
                  </div>
                  <strong className="text-xs font-bold block line-clamp-1">{calc.title}</strong>
                  <p className={`text-[11px] line-clamp-2 ${
                    selectedCalcId === calc.id ? "text-slate-300" : "text-slate-500"
                  }`}>
                    {calc.shortDescription}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Active Interactive Calculator Area (8 cols) */}
          <div className="lg:col-span-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              {/* Header Banner */}
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
                    {activeMeta.categoryLabel}
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900">{activeMeta.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{activeMeta.shortDescription}</p>
                </div>
              </div>

              {/* 1. IPO Listing Gain Calculator */}
              {selectedCalcId === "ipo-gain" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Number of Lots</label>
                      <input type="number" min={1} value={ipoLots} onChange={(e) => setIpoLots(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Shares per Lot</label>
                      <input type="number" min={1} value={ipoLotSize} onChange={(e) => setIpoLotSize(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Cutoff Price (₹)</label>
                      <input type="number" min={1} value={ipoPrice} onChange={(e) => setIpoPrice(Math.max(1, parseFloat(e.target.value) || 0))} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Grey Market Premium GMP (₹)</label>
                      <input type="number" value={ipoGmp} onChange={(e) => setIpoGmp(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[11px] text-blue-400 font-extrabold uppercase block">PROJECTION RESULT</span>
                      <div>
                        <span className="text-slate-400 block">Total Investment Required</span>
                        <strong className="text-xl font-bold">₹{ipoInvestment.toLocaleString("en-IN")}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Expected Listing Price</span>
                        <strong className="text-lg font-bold text-blue-400">₹{ipoListingPrice.toLocaleString("en-IN")}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Net Listing Profit (After 20% STCG)</span>
                        <strong className="text-2xl font-black text-emerald-400">+₹{ipoNetProfit.toLocaleString("en-IN")}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. IPO Allotment Multi-Account */}
              {selectedCalcId === "ipo-allotment" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Retail Subscription Multiplier (x)</label>
                      <input type="number" step="0.1" value={retailSub} onChange={(e) => setRetailSub(Math.max(1, parseFloat(e.target.value) || 1))} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Number of Family PAN Demat Accounts</label>
                      <input type="number" min={1} max={10} value={numPanAccounts} onChange={(e) => setNumPanAccounts(Math.max(1, parseInt(e.target.value) || 1))} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-purple-950 text-white space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[11px] text-purple-300 font-extrabold uppercase block">ALLOTMENT ODDS</span>
                      <div>
                        <span className="text-purple-200 block">Single Account Odds</span>
                        <strong className="text-lg font-bold">{(pSingle * 100).toFixed(2)}%</strong>
                      </div>
                      <div>
                        <span className="text-purple-200 block">Combined Multi-Account Probability</span>
                        <strong className="text-3xl font-black text-emerald-400">{multiPanProb.toFixed(2)}%</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. STCG & LTCG Tax Calculator */}
              {selectedCalcId === "ltcg-stcg-tax" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Short Term Capital Gains STCG (₹)</label>
                      <input type="number" value={stcgGains} onChange={(e) => setStcgGains(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Long Term Capital Gains LTCG (₹)</label>
                      <input type="number" value={ltcgGains} onChange={(e) => setLtcgGains(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[11px] text-emerald-400 font-extrabold uppercase block">BUDGET 2024 TAX LIABILITY</span>
                      <div>
                        <span className="text-slate-400 block">STCG Tax (20%)</span>
                        <strong className="text-lg font-bold">₹{stcgTaxVal.toLocaleString("en-IN")}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">LTCG Tax (12.5% above ₹1.25L)</span>
                        <strong className="text-lg font-bold text-amber-400">₹{ltcgTaxVal.toLocaleString("en-IN")}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Total Income Tax Payable</span>
                        <strong className="text-2xl font-black text-rose-400">₹{totalEquityTax.toLocaleString("en-IN")}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. SIP Calculator */}
              {selectedCalcId === "sip-calculator" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Monthly SIP Investment (₹)</label>
                      <input type="number" value={sipMonthly} onChange={(e) => setSipMonthly(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Expected Annual Return Rate (%)</label>
                      <input type="number" step="0.5" value={sipReturnRate} onChange={(e) => setSipReturnRate(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Investment Period (Years)</label>
                      <input type="number" min={1} max={35} value={sipYears} onChange={(e) => setSipYears(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[11px] text-blue-400 font-extrabold uppercase block">SIP COMPOUNDING RESULT</span>
                      <div>
                        <span className="text-slate-400 block">Total Amount Invested</span>
                        <strong className="text-lg font-bold">₹{sipTotalInvested.toLocaleString("en-IN")}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Estimated Wealth Gain</span>
                        <strong className="text-lg font-bold text-emerald-400">+₹{sipWealthGain.toLocaleString("en-IN")}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Target Maturity Value</span>
                        <strong className="text-3xl font-black text-blue-400">₹{Math.round(sipFutureVal).toLocaleString("en-IN")}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 17. New vs Old Tax Regime */}
              {selectedCalcId === "tax-regime-compare" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Gross Annual Salary (₹)</label>
                      <input type="number" value={grossAnnualSalary} onChange={(e) => setGrossAnnualSalary(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Sec 80C Deductions (₹)</label>
                      <input type="number" value={sec80cDeduction} onChange={(e) => setSec80cDeduction(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">HRA / Other Deductions (₹)</label>
                      <input type="number" value={hraDeduction} onChange={(e) => setHraDeduction(parseFloat(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[11px] text-blue-400 font-extrabold uppercase block">TAX REGIME COMPARISON</span>
                      <div>
                        <span className="text-slate-400 block">Old Regime Tax</span>
                        <strong className="text-lg font-bold">₹{Math.round(taxOldVal).toLocaleString("en-IN")}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">New Regime Tax (₹75K Standard Ded.)</span>
                        <strong className="text-lg font-bold text-emerald-400">₹{Math.round(taxNewVal).toLocaleString("en-IN")}</strong>
                      </div>
                      <div className="p-3.5 rounded-lg bg-emerald-950 border border-emerald-800">
                        <span className="text-emerald-300 font-bold block">Recommended Choice:</span>
                        <strong className="text-base text-white font-extrabold">
                          {taxNewVal < taxOldVal ? "New Tax Regime (Saves Money)" : "Old Tax Regime (Saves Money)"}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Generic Handler for other calculators */}
              {!["ipo-gain", "ipo-allotment", "ltcg-stcg-tax", "sip-calculator", "tax-regime-compare"].includes(selectedCalcId) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Primary Investment / Amount (₹)</label>
                      <input type="number" defaultValue={100000} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Expected Rate of Return (%)</label>
                      <input type="number" step="0.5" defaultValue={12} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Duration (Years / Months)</label>
                      <input type="number" defaultValue={5} className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold" />
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900 text-white space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[11px] text-blue-400 font-extrabold uppercase block">COMPUTED FINANCIAL METRIC</span>
                      <div>
                        <span className="text-slate-400 block">Initial Principal / Cost</span>
                        <strong className="text-lg font-bold">₹1,00,000</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Projected Value / Savings</span>
                        <strong className="text-2xl font-black text-emerald-400">₹1,76,234</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
