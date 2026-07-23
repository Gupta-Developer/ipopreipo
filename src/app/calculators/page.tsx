"use client";

import React, { useState } from "react";
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
  RefreshCw,
  Info,
  Sliders,
  DollarSign
} from "lucide-react";

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<"ipo" | "allotment" | "preipo" | "creditcard" | "broker">("ipo");

  // 1. IPO Listing Gain Calculator State
  const [ipoLots, setIpoLots] = useState<number>(1);
  const [ipoLotSize, setIpoLotSize] = useState<number>(35);
  const [ipoPrice, setIpoPrice] = useState<number>(425);
  const [ipoGmp, setIpoGmp] = useState<number>(65);
  const [taxRate, setTaxRate] = useState<number>(20); // 20% STCG

  const ipoTotalShares = ipoLots * ipoLotSize;
  const ipoInvestment = ipoTotalShares * ipoPrice;
  const ipoGrossGain = ipoTotalShares * ipoGmp;
  const ipoTaxAmount = Math.max(0, ipoGrossGain * (taxRate / 100));
  const ipoNetGain = ipoGrossGain - ipoTaxAmount;
  const ipoListingPrice = ipoPrice + ipoGmp;
  const ipoRoi = ipoPrice > 0 ? (ipoGmp / ipoPrice) * 100 : 0;

  // 2. IPO Allotment Probability Estimator State
  const [retailSubTimes, setRetailSubTimes] = useState<number>(28.5);
  const [numAccounts, setNumAccounts] = useState<number>(3);
  const [categoryType, setCategoryType] = useState<"retail" | "shni" | "bhni">("retail");

  const singleProbPercent = retailSubTimes > 0 ? Math.min(100, (1 / retailSubTimes) * 100) : 0;
  // Probability of getting at least 1 allotment across N distinct PAN accounts: 1 - (1 - p)^N
  const pSingle = singleProbPercent / 100;
  const multiAccountProb = (1 - Math.pow(1 - pSingle, numAccounts)) * 100;

  // 3. Pre-IPO Equity Return Calculator State
  const [preIpoBuyPrice, setPreIpoBuyPrice] = useState<number>(250);
  const [preIpoShares, setPreIpoShares] = useState<number>(500);
  const [preIpoTargetPrice, setPreIpoTargetPrice] = useState<number>(450);
  const [holdingMonths, setHoldingMonths] = useState<number>(18);

  const preIpoTotalCost = preIpoBuyPrice * preIpoShares;
  const preIpoTargetValue = preIpoTargetPrice * preIpoShares;
  const preIpoGain = preIpoTargetValue - preIpoTotalCost;
  const preIpoReturnPercent = preIpoTotalCost > 0 ? (preIpoGain / preIpoTotalCost) * 100 : 0;
  const annualizedReturn = holdingMonths > 0 
    ? (Math.pow(1 + preIpoReturnPercent / 100, 12 / holdingMonths) - 1) * 100 
    : 0;

  // 4. Credit Card Cashback Calculator State
  const [monthlyOnlineSpend, setMonthlyOnlineSpend] = useState<number>(25000);
  const [monthlyUtilitySpend, setMonthlyUtilitySpend] = useState<number>(10000);
  const [monthlyTravelSpend, setMonthlyTravelSpend] = useState<number>(15000);
  const [cardSelected, setCardSelected] = useState<string>("sbi_cashback");

  const getCashbackRates = (card: string) => {
    switch (card) {
      case "sbi_cashback": return { online: 0.05, utility: 0.01, travel: 0.05, fee: 999 };
      case "hdfc_millennia": return { online: 0.05, utility: 0.01, travel: 0.01, fee: 1000 };
      case "amazon_pay_icici": return { online: 0.05, utility: 0.02, travel: 0.02, fee: 0 };
      case "axis_ace": return { online: 0.015, utility: 0.05, travel: 0.015, fee: 499 };
      default: return { online: 0.05, utility: 0.01, travel: 0.05, fee: 999 };
    }
  };

  const rates = getCashbackRates(cardSelected);
  const monthlyCashback = (monthlyOnlineSpend * rates.online) + (monthlyUtilitySpend * rates.utility) + (monthlyTravelSpend * rates.travel);
  const annualCashback = monthlyCashback * 12;
  const netAnnualBenefit = annualCashback - rates.fee;

  // 5. Broker Brokerage Savings Calculator State
  const [monthlyTrades, setMonthlyTrades] = useState<number>(20);
  const [avgTradeValue, setAvgTradeValue] = useState<number>(50000);
  const [brokerType, setBrokerType] = useState<"discount" | "traditional">("discount");

  // Discount brokers charge flat ₹20/order, Traditional brokers charge ~0.45% of trade value
  const discountCostPerTrade = 20;
  const traditionalCostPerTrade = avgTradeValue * 0.0045;
  const currentCostPerTrade = brokerType === "discount" ? discountCostPerTrade : traditionalCostPerTrade;

  const annualBrokerageCurrent = monthlyTrades * 12 * currentCostPerTrade;
  const annualBrokerageDiscount = monthlyTrades * 12 * discountCostPerTrade;
  const annualSavings = Math.max(0, annualBrokerageCurrent - annualBrokerageDiscount);

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-8">
      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200 py-10 px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
            <CalcIcon className="w-3.5 h-3.5 text-blue-700" />
            Financial Decision Tools
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Financial &amp; IPO Investment Calculators
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
            Institutional-grade calculators for IPO Listing Gains, Allotment Probability Estimations, Pre-IPO Unlisted Share Valuation, Credit Card Cashback Optimization, and Stockbroker Fee Comparisons.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Calculator Selector Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-bold">
          <button
            onClick={() => setActiveTab("ipo")}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "ipo"
                ? "bg-blue-900 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            IPO Listing Gain Calculator
          </button>

          <button
            onClick={() => setActiveTab("allotment")}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "allotment"
                ? "bg-purple-900 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Zap className="w-4 h-4 text-purple-400" />
            Allotment Probability Estimator
          </button>

          <button
            onClick={() => setActiveTab("preipo")}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "preipo"
                ? "bg-amber-800 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Percent className="w-4 h-4 text-amber-400" />
            Pre-IPO ROI &amp; CAGR Calculator
          </button>

          <button
            onClick={() => setActiveTab("creditcard")}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "creditcard"
                ? "bg-emerald-800 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            Credit Card Cashback Calculator
          </button>

          <button
            onClick={() => setActiveTab("broker")}
            className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "broker"
                ? "bg-slate-800 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Briefcase className="w-4 h-4 text-slate-300" />
            Broker Fee Savings Calculator
          </button>
        </div>

        {/* TAB 1: IPO Listing Gain Calculator */}
        {activeTab === "ipo" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-700" />
                    IPO Lot Cost &amp; Listing Gain Calculator
                  </h2>
                  <p className="text-xs text-slate-500">Estimate total capital, expected listing gains, and net profit after STCG tax.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Number of Lots</label>
                  <input
                    type="number"
                    min={1}
                    value={ipoLots}
                    onChange={(e) => setIpoLots(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Retail limit: 13 Lots</span>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Shares per Lot</label>
                  <input
                    type="number"
                    min={1}
                    value={ipoLotSize}
                    onChange={(e) => setIpoLotSize(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Cutoff Issue Price (₹)</label>
                  <input
                    type="number"
                    min={1}
                    value={ipoPrice}
                    onChange={(e) => setIpoPrice(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Expected Grey Market Premium GMP (₹)</label>
                  <input
                    type="number"
                    value={ipoGmp}
                    onChange={(e) => setIpoGmp(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1.5">Short Term Capital Gains (STCG) Tax Bracket (%)</label>
                  <div className="flex gap-3">
                    {[0, 15, 20].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setTaxRate(rate)}
                        className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${
                          taxRate === rate
                            ? "bg-blue-900 text-white border-blue-900"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {rate === 20 ? "20% (Budget 2024)" : rate === 15 ? "15% (Old Rate)" : "0% (Exempt)"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs text-blue-400 font-extrabold uppercase tracking-wider block">PROJECTED RETURN SUMMARY</span>

                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-400 block">Total Capital Investment</span>
                  <strong className="text-2xl font-black text-white">₹{ipoInvestment.toLocaleString("en-IN")}</strong>
                  <span className="text-[11px] text-slate-400 block">{ipoTotalShares.toLocaleString("en-IN")} total shares</span>
                </div>

                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-400 block">Expected Listing Price</span>
                  <strong className="text-xl font-bold text-blue-400">₹{ipoListingPrice.toLocaleString("en-IN")} / share</strong>
                  <span className="text-[11px] text-emerald-400 font-semibold block">+{ipoRoi.toFixed(1)}% expected listing gain</span>
                </div>

                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-400 block">Gross Profit</span>
                  <strong className="text-xl font-extrabold text-emerald-400">+₹{ipoGrossGain.toLocaleString("en-IN")}</strong>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">Net Gain (After {taxRate}% STCG Tax)</span>
                  <strong className="text-2xl font-black text-emerald-300">+₹{ipoNetGain.toLocaleString("en-IN")}</strong>
                  <span className="text-[11px] text-slate-400 block">Estimated Tax: ₹{ipoTaxAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <Link
                href="/"
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                Browse Live Mainboard IPOs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: IPO Allotment Probability Estimator */}
        {activeTab === "allotment" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-700" />
                    IPO Allotment Odds &amp; Multi-Account Estimator
                  </h2>
                  <p className="text-xs text-slate-500">Calculate mathematical odds of allotment when applying across multiple family PAN accounts.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Application Category</label>
                  <select
                    value={categoryType}
                    onChange={(e) => setCategoryType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-purple-600 outline-none"
                  >
                    <option value="retail">Retail Investor (&lt; ₹2 Lakhs)</option>
                    <option value="shni">Small HNI / sNII (₹2L - ₹10L)</option>
                    <option value="bhni">Big HNI / bNII (&gt; ₹10L)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Category Subscription Multiplier (x)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    value={retailSubTimes}
                    onChange={(e) => setRetailSubTimes(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-purple-600 outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">e.g. 28.5x Retail subscription</span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1.5">Number of Distinct PAN Demat Accounts (Family Accounts)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={numAccounts}
                      onChange={(e) => setNumAccounts(parseInt(e.target.value))}
                      className="w-full accent-purple-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <span className="px-3 py-1 bg-purple-100 text-purple-900 font-black rounded-lg text-sm shrink-0">
                      {numAccounts} Accounts
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Applying 1 lot per account maximizes draw probability in oversubscribed retail issues.</span>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="p-6 rounded-2xl bg-purple-950 text-white shadow-xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs text-purple-300 font-extrabold uppercase tracking-wider block">ALLOTMENT PROBABILITY MATRIX</span>

                <div className="border-b border-purple-900 pb-3">
                  <span className="text-xs text-purple-200 block">Single Account Probability</span>
                  <strong className="text-2xl font-black text-purple-300">{singleProbPercent.toFixed(2)}%</strong>
                  <span className="text-[11px] text-purple-300 block">1 in {retailSubTimes.toFixed(1)} applicants get allotment</span>
                </div>

                <div className="border-b border-purple-900 pb-3">
                  <span className="text-xs text-purple-200 block">Combined Probability across {numAccounts} Accounts</span>
                  <strong className="text-3xl font-black text-emerald-400">{multiAccountProb.toFixed(2)}%</strong>
                  <span className="text-[11px] text-emerald-300 font-semibold block">Using 1 lot per PAN account</span>
                </div>

                <div className="p-3 rounded-xl bg-purple-900/60 border border-purple-800 text-xs text-purple-200 space-y-1">
                  <strong className="text-white block font-bold">Pro Tip for Retail Investors:</strong>
                  <p className="text-[11px]">In oversubscribed IPOs, applying 1 lot across {numAccounts} different PAN cards gives you a <strong>{multiAccountProb.toFixed(1)}% chance</strong> vs only {singleProbPercent.toFixed(1)}% if you apply multiple lots on 1 account.</p>
                </div>
              </div>

              <Link
                href="/allotment"
                className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                Check Allotment Status <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 3: Pre-IPO Return & CAGR Calculator */}
        {activeTab === "preipo" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Percent className="w-5 h-5 text-amber-600" />
                    Pre-IPO Unlisted Share Return &amp; CAGR Calculator
                  </h2>
                  <p className="text-xs text-slate-500">Calculate projected returns and annualized (CAGR) yields for unlisted pre-IPO equity investments.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Purchase Price per Share (₹)</label>
                  <input
                    type="number"
                    min={1}
                    value={preIpoBuyPrice}
                    onChange={(e) => setPreIpoBuyPrice(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-amber-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Number of Shares Purchased</label>
                  <input
                    type="number"
                    min={1}
                    value={preIpoShares}
                    onChange={(e) => setPreIpoShares(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-amber-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Target IPO Listing Price (₹)</label>
                  <input
                    type="number"
                    min={1}
                    value={preIpoTargetPrice}
                    onChange={(e) => setPreIpoTargetPrice(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-amber-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Investment Holding Period (Months)</label>
                  <input
                    type="number"
                    min={1}
                    value={holdingMonths}
                    onChange={(e) => setHoldingMonths(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-amber-600 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="p-6 rounded-2xl bg-amber-950 text-white shadow-xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs text-amber-300 font-extrabold uppercase tracking-wider block">PRE-IPO INVESTMENT YIELD</span>

                <div className="border-b border-amber-900 pb-3">
                  <span className="text-xs text-amber-200 block">Total Invested Capital</span>
                  <strong className="text-2xl font-black text-white">₹{preIpoTotalCost.toLocaleString("en-IN")}</strong>
                </div>

                <div className="border-b border-amber-900 pb-3">
                  <span className="text-xs text-amber-200 block">Projected Value at IPO</span>
                  <strong className="text-2xl font-black text-amber-300">₹{preIpoTargetValue.toLocaleString("en-IN")}</strong>
                  <span className="text-[11px] text-emerald-400 font-semibold block">+₹{preIpoGain.toLocaleString("en-IN")} net gain</span>
                </div>

                <div>
                  <span className="text-xs text-amber-200 block">Annualized Return (CAGR / XIRR)</span>
                  <strong className="text-3xl font-black text-emerald-400">{annualizedReturn.toFixed(1)}% p.a.</strong>
                  <span className="text-[11px] text-amber-200 block">Absolute Return: +{preIpoReturnPercent.toFixed(1)}% over {holdingMonths} months</span>
                </div>
              </div>

              <Link
                href="/pre-ipo"
                className="w-full py-3 rounded-xl bg-amber-700 hover:bg-amber-600 text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                Browse Pre-IPO Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 4: Credit Card Cashback Calculator */}
        {activeTab === "creditcard" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-700" />
                    Credit Card Reward &amp; Cashback Optimizer
                  </h2>
                  <p className="text-xs text-slate-500">Calculate annual cashback savings based on your monthly spending profile across categories.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1.5">Select Credit Card</label>
                  <select
                    value={cardSelected}
                    onChange={(e) => setCardSelected(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 outline-none text-sm"
                  >
                    <option value="sbi_cashback">SBI Cashback Credit Card (5% Online)</option>
                    <option value="hdfc_millennia">HDFC Millennia Credit Card (5% Cashback)</option>
                    <option value="amazon_pay_icici">Amazon Pay ICICI Card (5% Uncapped)</option>
                    <option value="axis_ace">Axis Bank ACE Credit Card (5% Utilities)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Monthly Online Shopping (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={monthlyOnlineSpend}
                    onChange={(e) => setMonthlyOnlineSpend(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Monthly Utilities &amp; Bills (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={monthlyUtilitySpend}
                    onChange={(e) => setMonthlyUtilitySpend(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Monthly Travel &amp; Dining (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={monthlyTravelSpend}
                    onChange={(e) => setMonthlyTravelSpend(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-600 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="p-6 rounded-2xl bg-emerald-950 text-white shadow-xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs text-emerald-300 font-extrabold uppercase tracking-wider block">ANNUAL CASHBACK SAVINGS</span>

                <div className="border-b border-emerald-900 pb-3">
                  <span className="text-xs text-emerald-200 block">Monthly Cashback Earned</span>
                  <strong className="text-2xl font-black text-white">₹{monthlyCashback.toLocaleString("en-IN")} / mo</strong>
                </div>

                <div className="border-b border-emerald-900 pb-3">
                  <span className="text-xs text-emerald-200 block">Gross Annual Cashback</span>
                  <strong className="text-2xl font-black text-emerald-300">₹{annualCashback.toLocaleString("en-IN")} / yr</strong>
                </div>

                <div>
                  <span className="text-xs text-emerald-200 block">Net Savings (After ₹{rates.fee} Annual Fee)</span>
                  <strong className="text-3xl font-black text-emerald-400">₹{netAnnualBenefit.toLocaleString("en-IN")} / yr</strong>
                </div>
              </div>

              <Link
                href="/credit-cards"
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                Compare Credit Cards <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 5: Stockbroker Fee Savings Calculator */}
        {activeTab === "broker" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-slate-700" />
                    Stockbroker Brokerage &amp; Fee Savings Calculator
                  </h2>
                  <p className="text-xs text-slate-500">Calculate how much brokerage you save by switching to zero-brokerage discount stockbrokers.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Current Broker Type</label>
                  <select
                    value={brokerType}
                    onChange={(e) => setBrokerType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  >
                    <option value="traditional">Traditional Bank Broker (0.45% Brokerage)</option>
                    <option value="discount">Flat Discount Broker (₹20/Order)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Average Monthly Executed Trades</label>
                  <input
                    type="number"
                    min={1}
                    value={monthlyTrades}
                    onChange={(e) => setMonthlyTrades(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1.5">Average Trade Turnover Value (₹)</label>
                  <input
                    type="number"
                    min={1000}
                    value={avgTradeValue}
                    onChange={(e) => setAvgTradeValue(Math.max(1000, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs text-blue-400 font-extrabold uppercase tracking-wider block">ANNUAL BROKERAGE BREAKDOWN</span>

                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-400 block">Annual Brokerage at Flat ₹20</span>
                  <strong className="text-2xl font-black text-white">₹{annualBrokerageDiscount.toLocaleString("en-IN")} / yr</strong>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block">Annual Savings vs Traditional Broker</span>
                  <strong className="text-3xl font-black text-emerald-400">₹{annualSavings.toLocaleString("en-IN")} / yr</strong>
                  <span className="text-[11px] text-emerald-400 font-semibold block">0% brokerage on Delivery stocks</span>
                </div>
              </div>

              <Link
                href="/brokers"
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                Compare Top Stockbrokers <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
