"use client";

import React, { useState } from "react";
import { Calculator as CalcIcon, Coins, TrendingUp } from "lucide-react";

interface CalculatorProps {
  defaultLotSize?: number;
  defaultPrice?: number;
  defaultGmp?: number;
}

export const Calculator: React.FC<CalculatorProps> = ({
  defaultLotSize = 38,
  defaultPrice = 390,
  defaultGmp = 65
}) => {
  const [lots, setLots] = useState<number>(1);
  const [lotSize, setLotSize] = useState<number>(defaultLotSize);
  const [price, setPrice] = useState<number>(defaultPrice);
  const [gmp, setGmp] = useState<number>(defaultGmp);

  const totalShares = lots * lotSize;
  const totalInvestment = totalShares * price;
  const expectedProfit = totalShares * gmp;
  const returnPercent = price > 0 ? (gmp / price) * 100 : 0;
  const totalValueAtListing = totalInvestment + expectedProfit;

  return (
    <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <CalcIcon className="w-5 h-5 text-blue-700" />
        <div>
          <h3 className="font-bold text-sm text-slate-900">
            IPO Investment &amp; Listing Gain Calculator
          </h3>
          <p className="text-xs text-slate-500">
            Calculate capital required &amp; expected listing gains
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="block text-slate-600 font-semibold mb-1">Lots</label>
          <input
            type="number"
            min={1}
            value={lots}
            onChange={(e) => setLots(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white text-slate-900 font-medium focus:ring-1 focus:ring-blue-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-600 font-semibold mb-1">Shares/Lot</label>
          <input
            type="number"
            min={1}
            value={lotSize}
            onChange={(e) => setLotSize(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white text-slate-900 font-medium focus:ring-1 focus:ring-blue-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-600 font-semibold mb-1">Price (₹)</label>
          <input
            type="number"
            min={1}
            value={price}
            onChange={(e) => setPrice(Math.max(1, parseFloat(e.target.value) || 0))}
            className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white text-slate-900 font-medium focus:ring-1 focus:ring-blue-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-600 font-semibold mb-1">GMP (₹)</label>
          <input
            type="number"
            value={gmp}
            onChange={(e) => setGmp(parseFloat(e.target.value) || 0)}
            className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-white text-slate-900 font-medium focus:ring-1 focus:ring-blue-600 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
        <div>
          <span className="text-slate-500 block">Total Investment</span>
          <strong className="text-sm font-extrabold text-slate-900">₹{totalInvestment.toLocaleString("en-IN")}</strong>
          <span className="text-[11px] text-slate-400 block">{totalShares} Shares total</span>
        </div>

        <div>
          <span className="text-slate-500 block">Expected Profit</span>
          <strong className="text-sm font-extrabold text-emerald-700">+₹{expectedProfit.toLocaleString("en-IN")}</strong>
          <span className="text-[11px] text-emerald-700 font-semibold block">+{returnPercent.toFixed(1)}% Listing gain</span>
        </div>

        <div>
          <span className="text-slate-500 block">Total Listing Value</span>
          <strong className="text-sm font-extrabold text-blue-700">₹{totalValueAtListing.toLocaleString("en-IN")}</strong>
          <span className="text-[11px] text-slate-400 block">₹{price + gmp} / Share</span>
        </div>
      </div>
    </div>
  );
};
