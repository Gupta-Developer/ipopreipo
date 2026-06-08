"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/data/user";

// No static content imports - all product data comes from DB


interface PendingSubmission {
  id: string;
  authorEmail: string;
  name: string;
  ticker: string;
  segment: "Mainboard" | "SME";
  priceBand: string;
  size: string;
  lotSize: number;
  gmp: number;
  gmpAmount: string;
  openDate: string;
  closeDate: string;
  countrySlug: string;
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
}

const getSelectValue = (countriesString: string) => {
  if (!countriesString) return "india";
  const list = countriesString.split(",").map(c => c.trim().toLowerCase()).filter(Boolean);
  if (list.length >= 3 || list.includes("all")) {
    return "india, united-states, united-kingdom";
  }
  return list[0] || "india";
};

export default function AdminConsolePage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const country = (params?.country as string) || "india";

  // Sidebar navigation active tab
  const [activeTab, setActiveTab] = useState("overview");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Initialize tabs depending on role
  useEffect(() => {
    setActiveTab("overview");
  }, [user]);

  // Real Database users state
  const [dbUsers, setDbUsers] = useState<User[]>([]);
  const [dbUsersLoading, setDbUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userActionMessage, setUserActionMessage] = useState("");

  // Submissions and listings state
  const [submissions, setSubmissions] = useState<PendingSubmission[]>([]);
  const [ipoCount, setIpoCount] = useState(0);
  const [liveIpos, setLiveIpos] = useState<any[]>([]);

  // Select products manager state
  const [activeSelectType, setActiveSelectType] = useState<"banks" | "brokers" | "cards" | "payments" | "crypto">("banks");
  const [customBanks, setCustomBanks] = useState<any[]>([]);
  const [customBrokers, setCustomBrokers] = useState<any[]>([]);
  const [customCards, setCustomCards] = useState<any[]>([]);
  const [customPayments, setCustomPayments] = useState<any[]>([]);
  const [customCryptos, setCustomCryptos] = useState<any[]>([]);

  // View & Edit Modal States
  const [viewItem, setViewItem] = useState<any | null>(null);
  const [viewItemType, setViewItemType] = useState<string>("");
  const [editItem, setEditItem] = useState<any | null>(null);
  const [editItemType, setEditItemType] = useState<string>("");

  // Add Product Form State - General Shared Info
  const [prodName, setProdName] = useState("");
  const [prodSlug, setProdSlug] = useState("");
  const [prodCountry, setProdCountry] = useState("India");
  const [prodCountrySlug, setProdCountrySlug] = useState("india");
  const [prodRating, setProdRating] = useState("4.0");
  const [prodType, setProdType] = useState("");
  const [prodActiveUsers, setProdActiveUsers] = useState("10 Million+");
  const [prodLikes, setProdLikes] = useState("120");
  const [prodSummary, setProdSummary] = useState("");
  const [prodLogoColor, setProdLogoColor] = useState("#6366f1");
  const [prodLogoLetter, setProdLogoLetter] = useState("");
  const [prodPlatforms, setProdPlatforms] = useState("Android App, iOS App");
  const [prodPros, setProdPros] = useState("");
  const [prodCons, setProdCons] = useState("");
  const [prodSuccess, setProdSuccess] = useState("");

  // Add Product Form State - Category Specific variables
  // 1. Bank Accounts
  const [bankFeatOnboarding, setBankFeatOnboarding] = useState(true);
  const [bankFeatMobileApp, setBankFeatMobileApp] = useState(true);
  const [bankFeatFreeDebit, setBankFeatFreeDebit] = useState(true);
  const [bankFeatHighInterest, setBankFeatHighInterest] = useState(false);
  const [bankFeatZeroBalance, setBankFeatZeroBalance] = useState(false);
  const [bankChargeMinBal, setBankChargeMinBal] = useState("₹0");
  const [bankChargeMaint, setBankChargeMaint] = useState("₹150/year");
  const [bankChargeAtm, setBankChargeAtm] = useState("5 free withdrawals/month");
  const [bankChargeFx, setBankChargeFx] = useState("3.5% markup");
  const [bankInterestRate, setBankInterestRate] = useState("3.00% p.a.");

  // 2. Brokers
  const [brokerDepository, setBrokerDepository] = useState("CDSL");
  const [brokerSegEquity, setBrokerSegEquity] = useState(true);
  const [brokerSegCommodity, setBrokerSegCommodity] = useState(false);
  const [brokerSegCurrency, setBrokerSegCurrency] = useState(false);
  const [brokerSegFutures, setBrokerSegFutures] = useState(true);
  const [brokerSegOptions, setBrokerSegOptions] = useState(true);
  const [brokerChargeOpening, setBrokerChargeOpening] = useState("₹0");
  const [brokerChargeAmc, setBrokerChargeAmc] = useState("₹0");
  const [brokerChargeCallTrade, setBrokerChargeCallTrade] = useState("₹20 per order");
  const [brokerageDelivery, setBrokerageDelivery] = useState("0.05% or ₹20 max");
  const [brokerageIntraday, setBrokerageIntraday] = useState("0.05% or ₹20 max");
  const [brokerageFutures, setBrokerageFutures] = useState("₹20 flat");
  const [brokerageOptions, setBrokerageOptions] = useState("₹20 flat");
  const [brokerMarginDelivery, setBrokerMarginDelivery] = useState("1x");
  const [brokerMarginIntraday, setBrokerMarginIntraday] = useState("Up to 5x");

  // 3. Credit Cards
  const [cardBestFor, setCardBestFor] = useState("Cashback");
  const [cardIssuer, setCardIssuer] = useState("SBI Card");
  const [cardIssuerCode, setCardIssuerCode] = useState("sbi");
  const [cardNetwork, setCardNetwork] = useState("Visa");
  const [cardFeatWelcomeBonus, setCardFeatWelcomeBonus] = useState(false);
  const [cardFeatTravel, setCardFeatTravel] = useState(false);
  const [cardFeatFuel, setCardFeatFuel] = useState(true);
  const [cardFeatRewards, setCardFeatRewards] = useState(false);
  const [cardFeatShopping, setCardFeatShopping] = useState(true);
  const [cardFeatCashback, setCardFeatCashback] = useState(true);
  const [cardFeatDining, setCardFeatDining] = useState(false);
  const [cardFeatInsurance, setCardFeatInsurance] = useState(false);
  const [cardFeatInterest, setCardFeatInterest] = useState(false);
  const [cardFeatLounge, setCardFeatLounge] = useState(false);
  const [cardChargeJoining, setCardChargeJoining] = useState("₹999");
  const [cardChargeAnnual, setCardChargeAnnual] = useState("₹999");
  const [cardChargeApr, setCardChargeApr] = useState("42%");
  const [cardPerksDetails, setCardPerksDetails] = useState("5% cashback on online purchases\n1% cashback on offline purchases");

  // 4. Payment Apps
  const [payFeatUpi, setPayFeatUpi] = useState(true);
  const [payFeatWallet, setPayFeatWallet] = useState(true);
  const [payFeatBankTransfer, setPayFeatBankTransfer] = useState(true);
  const [payFeatCards, setPayFeatCards] = useState(true);
  const [payFeatInternational, setPayFeatInternational] = useState(false);
  const [payChargeWallet, setPayChargeWallet] = useState("Free (via UPI/Debit)");
  const [payChargeBank, setPayChargeBank] = useState("0% (Direct via UPI)");
  const [payChargeCards, setPayChargeCards] = useState("Free for personal transfers");
  const [payLimitDaily, setPayLimitDaily] = useState("₹1,00,000 max");
  const [payLimitTransaction, setPayLimitTransaction] = useState("₹1,00,000");

  // 5. Crypto Apps
  const [cryptoFeatSpot, setCryptoFeatSpot] = useState(true);
  const [cryptoFeatFutures, setCryptoFeatFutures] = useState(false);
  const [cryptoFeatStaking, setCryptoFeatStaking] = useState(false);
  const [cryptoFeatWallet, setCryptoFeatWallet] = useState(true);
  const [cryptoFeatFiat, setCryptoFeatFiat] = useState(true);
  const [cryptoChargeMaker, setCryptoChargeMaker] = useState("0.20% flat rate");
  const [cryptoChargeTaker, setCryptoChargeTaker] = useState("0.20% flat rate");
  const [cryptoChargeWithdrawal, setCryptoChargeWithdrawal] = useState("Varies by network");
  const [cryptoLimitWithdrawal, setCryptoLimitWithdrawal] = useState("₹10,00,000 / day");
  const [cryptoLimitMinDeposit, setCryptoLimitMinDeposit] = useState("₹100");

  // Detailed Reviews text blocks
  const [revRating1, setRevRating1] = useState("4.0"); // Rates/Fees/Charges
  const [revRating2, setRevRating2] = useState("4.0"); // Usability/Rewards
  const [revRating3, setRevRating3] = useState("4.0"); // Service/Security
  const [revBlock1, setRevBlock1] = useState(""); // Onboarding / Interface
  const [revBlock2, setRevBlock2] = useState(""); // Fees / Charges / Brokerage
  const [revBlock3, setRevBlock3] = useState(""); // Features / Usability / Selection
  const [revBlock4, setRevBlock4] = useState(""); // Service / Support / Security

  // Detailed Article Editor States
  const [artTitle, setArtTitle] = useState("");
  const [artIntro, setArtIntro] = useState("");
  const [artSec1Heading, setArtSec1Heading] = useState("");
  const [artSec1Content, setArtSec1Content] = useState("");
  const [artSec1Items, setArtSec1Items] = useState("");
  const [artSec2Heading, setArtSec2Heading] = useState("");
  const [artSec2Content, setArtSec2Content] = useState("");
  const [artSec2Items, setArtSec2Items] = useState("");
  const [artSec3Heading, setArtSec3Heading] = useState("");
  const [artSec3Content, setArtSec3Content] = useState("");
  const [artSec3Items, setArtSec3Items] = useState("");

  // Credit Cards extra fees
  const [cardRewardPointValue, setCardRewardPointValue] = useState("1%");
  const [cardAddonFee, setCardAddonFee] = useState("Free");
  const [cardMinimumRepayment, setCardMinimumRepayment] = useState("5%");
  const [cardCashWithdrawalFee, setCardCashWithdrawalFee] = useState("2.5% or ₹500");
  const [cardCashAdvanceLimit, setCardCashAdvanceLimit] = useState("40%");
  const [cardReplacementFee, setCardReplacementFee] = useState("₹100");
  const [cardForeignTransactionFee, setCardForeignTransactionFee] = useState("3.5%");
  const [cardOverLimitPenalty, setCardOverLimitPenalty] = useState("2.5%");
  const [cardFuelSurcharge, setCardFuelSurcharge] = useState("1%");

  // Broker extra taxes and charges
  const [brokerDpCharges, setBrokerDpCharges] = useState("₹13.5 + GST");
  const [brokerTaxSttDelivery, setBrokerTaxSttDelivery] = useState("0.1%");
  const [brokerTaxSttIntraday, setBrokerTaxSttIntraday] = useState("0.025%");
  const [brokerTaxSttFutures, setBrokerTaxSttFutures] = useState("0.0125%");
  const [brokerTaxSttOptions, setBrokerTaxSttOptions] = useState("0.0625%");
  const [brokerTaxStampDelivery, setBrokerTaxStampDelivery] = useState("0.015%");
  const [brokerTaxStampIntraday, setBrokerTaxStampIntraday] = useState("0.003%");
  const [brokerTaxStampFutures, setBrokerTaxStampFutures] = useState("0.002%");
  const [brokerTaxStampOptions, setBrokerTaxStampOptions] = useState("0.003%");
  const [brokerTaxExchangeDelivery, setBrokerTaxExchangeDelivery] = useState("0.003%");
  const [brokerTaxExchangeIntraday, setBrokerTaxExchangeIntraday] = useState("0.003%");
  const [brokerTaxExchangeFutures, setBrokerTaxExchangeFutures] = useState("0.002%");
  const [brokerTaxExchangeOptions, setBrokerTaxExchangeOptions] = useState("0.05%");
  const [brokerTaxSebiDelivery, setBrokerTaxSebiDelivery] = useState("₹10/Cr");
  const [brokerTaxSebiIntraday, setBrokerTaxSebiIntraday] = useState("₹10/Cr");
  const [brokerTaxSebiFutures, setBrokerTaxSebiFutures] = useState("₹10/Cr");
  const [brokerTaxSebiOptions, setBrokerTaxSebiOptions] = useState("₹10/Cr");
  const [brokerTaxGstDelivery, setBrokerTaxGstDelivery] = useState("18%");
  const [brokerTaxGstIntraday, setBrokerTaxGstIntraday] = useState("18%");
  const [brokerTaxGstFutures, setBrokerTaxGstFutures] = useState("18%");
  const [brokerTaxGstOptions, setBrokerTaxGstOptions] = useState("18%");

  // Form State (Author Submit Listing)
  const [companyName, setCompanyName] = useState("");
  const [ticker, setTicker] = useState("");
  const [segment, setSegment] = useState<"Mainboard" | "SME">("Mainboard");
  const [priceBand, setPriceBand] = useState("");
  const [issueSize, setIssueSize] = useState("");
  const [lotSize, setLotSize] = useState(1);
  const [gmpPercent, setGmpPercent] = useState(0);
  const [gmpAmount, setGmpAmount] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [closeDate, setCloseDate] = useState("");
  const [targetCountry, setTargetCountry] = useState("india");
  const [formSuccess, setFormSuccess] = useState("");
  const [formError, setFormError] = useState("");

  // Collaborator editing states (Admin)
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState<"USER" | "PRO" | "ADMIN" | "AUTHOR">("USER");
  const [editingCountries, setEditingCountries] = useState("");

  // Fetch db users
  const fetchDbUsers = async () => {
    setDbUsersLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setDbUsers(data.users);
      }
    } catch (err) {
      console.error("Failed to load db users");
    } finally {
      setDbUsersLoading(false);
    }
  };

  const fetchPaymentApps = async () => {
    try {
      const res = await fetch("/api/admin/payment-apps");
      const data = await res.json();
      if (data.success) { setCustomPayments(data.paymentApps); }
    } catch (err) { console.error("Failed to fetch payment apps from database:", err); }
  };

  const fetchBanks = async () => {
    try {
      const res = await fetch("/api/admin/banks");
      const data = await res.json();
      if (data.success) { setCustomBanks(data.banks); }
    } catch (err) { console.error("Failed to fetch banks from database:", err); }
  };

  const fetchBrokers = async () => {
    try {
      const res = await fetch("/api/admin/brokers");
      const data = await res.json();
      if (data.success) { setCustomBrokers(data.brokers); }
    } catch (err) { console.error("Failed to fetch brokers from database:", err); }
  };

  const fetchCards = async () => {
    try {
      const res = await fetch("/api/admin/credit-cards");
      const data = await res.json();
      if (data.success) { setCustomCards(data.creditCards); }
    } catch (err) { console.error("Failed to fetch credit cards from database:", err); }
  };

  const fetchCryptos = async () => {
    try {
      const res = await fetch("/api/admin/crypto-apps");
      const data = await res.json();
      if (data.success) { setCustomCryptos(data.cryptoApps); }
    } catch (err) { console.error("Failed to fetch crypto apps from database:", err); }
  };

  // Sync databases on mount
  useEffect(() => {
    if (user && (user.role === "ADMIN" || user.role === "AUTHOR")) {
      fetchDbUsers();
      syncLocalData();
    }
  }, [user]);

  const syncLocalData = () => {
    // 1. Fetch submissions
    const subs = localStorage.getItem("pending_submissions");
    if (subs) setSubmissions(JSON.parse(subs));

    // 2. Fetch live IPOs list
    const ipos = localStorage.getItem("ipo_database");
    if (ipos) {
      const parsed = JSON.parse(ipos);
      setLiveIpos(parsed);
      setIpoCount(parsed.length);
    } else {
      setLiveIpos([]);
      setIpoCount(0);
    }

    // 3. Fetch all select products from database
    fetchPaymentApps();
    fetchBanks();
    fetchBrokers();
    fetchCards();
    fetchCryptos();
  };

  if (loading) {
    return (
      <div className="app-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
          <h2>Loading Session Integrity...</h2>
        </div>
      </div>
    );
  }

  // Guard: Not logged in
  if (!user) {
    return (
      <div className="app-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="card" style={{ padding: "3rem", textAlign: "center", maxWidth: "450px", border: "1px solid var(--border-color)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Admin Access Restricted</h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "0.88rem", lineHeight: 1.45 }}>
            Please sign in with a verified regional editor or administrator account to view the command console.
          </p>
          <Link href={`/${country}/login`} className="btn btn-primary" style={{ marginTop: "1.5rem", width: "100%" }}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Guard: Unauthorized role (only ADMIN allowed)
  if (user.role !== "ADMIN") {
    return (
      <div className="app-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="card" style={{ padding: "3rem", textAlign: "center", maxWidth: "450px", border: "1px solid var(--border-color)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚫</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Access Denied</h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "0.88rem", lineHeight: 1.45 }}>
            Your account role (<strong>{user.role}</strong>) does not have permission to view this panel.
          </p>
          <Link href="/" className="btn btn-secondary" style={{ marginTop: "1.5rem", width: "100%" }}>
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const allowedCountries = user.assignedCountries || ["india", "united-states", "united-kingdom"];

  // Handle Save User Permissions in Database
  const handleSaveUserEdit = async (userId: string) => {
    setUserActionMessage("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          role: editingRole,
          assignedCountries: editingCountries ? editingCountries.split(",").map(c => c.trim().toLowerCase()) : [],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDbUsers(dbUsers.map(u => u.id === userId ? data.user : u));
        setEditingUserId(null);
        setUserActionMessage("User updated successfully in Database.");
      } else {
        alert(data.error || "Failed to update user");
      }
    } catch (err) {
      alert("Error updating user.");
    }
  };

  // Handle Delete User from Database
  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to permanently delete this user from the database?")) {
      setUserActionMessage("");
      try {
        const res = await fetch("/api/admin/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId }),
        });
        const data = await res.json();
        if (data.success) {
          setDbUsers(dbUsers.filter(u => u.id !== userId));
          setUserActionMessage("User deleted successfully from Database.");
        } else {
          alert(data.error || "Failed to delete user");
        }
      } catch (err) {
        alert("Error deleting user.");
      }
    }
  };

  // Handle Draft Submission (Author)
  const handleDraftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess("");
    setFormError("");

    if (!companyName.trim() || !ticker.trim() || !priceBand.trim() || !issueSize.trim() || !openDate || !closeDate) {
      setFormError("Please fill in all required fields.");
      return;
    }

    const newDraft: PendingSubmission = {
      id: "sub_" + Date.now(),
      authorEmail: user.email,
      name: companyName.trim(),
      ticker: ticker.trim().toUpperCase(),
      segment,
      priceBand,
      size: issueSize,
      gmp: gmpPercent,
      gmpAmount: gmpAmount || "₹0",
      lotSize,
      openDate,
      closeDate,
      countrySlug: targetCountry,
      status: "Pending",
      submittedAt: new Date().toISOString()
    };

    const updatedSubs = [newDraft, ...submissions];
    localStorage.setItem("pending_submissions", JSON.stringify(updatedSubs));
    setSubmissions(updatedSubs);

    // Reset Form
    setCompanyName("");
    setTicker("");
    setPriceBand("");
    setIssueSize("");
    setLotSize(1);
    setGmpPercent(0);
    setGmpAmount("");
    setOpenDate("");
    setCloseDate("");

    setFormSuccess("Draft submitted successfully! Waiting for Admin approval.");
  };

  // Handle Editorial Review (Admin)
  const handleReviewDecision = (id: string, decision: "Approved" | "Rejected") => {
    const updatedSubs = submissions.map((sub) => {
      if (sub.id === id) {
        return { ...sub, status: decision };
      }
      return sub;
    });

    localStorage.setItem("pending_submissions", JSON.stringify(updatedSubs));
    setSubmissions(updatedSubs);

    // If approved, commit to live IPO database
    if (decision === "Approved") {
      const selectedSub = submissions.find((sub) => sub.id === id);
      if (selectedSub) {
        const ipoDb = localStorage.getItem("ipo_database");
        const iposList = ipoDb ? JSON.parse(ipoDb) : [];

        const newIpo = {
          id: "ipo_" + Date.now(),
          name: selectedSub.name,
          ticker: selectedSub.ticker,
          status: "active" as const,
          priceBand: selectedSub.priceBand,
          gmp: selectedSub.gmp,
          gmpAmount: selectedSub.gmpAmount,
          openDate: selectedSub.openDate,
          closeDate: selectedSub.closeDate,
          size: selectedSub.size,
          lotSize: selectedSub.lotSize,
          subscription: { qib: 0, nii: 0, retail: 0, total: 0 },
          segment: selectedSub.segment,
          logoLetter: selectedSub.name.charAt(0).toUpperCase(),
          logoColor: "#" + Math.floor(Math.random()*16777215).toString(16),
          description: `Newly approved IPO listing managed by ${selectedSub.authorEmail}. Registered details are currently active for trading bidding.`,
          offerPriceNum: parseFloat(selectedSub.priceBand.replace(/[^0-9.]/g, "")) || 100,
          countrySlug: selectedSub.countrySlug
        };

        const updatedIpos = [newIpo, ...iposList];
        localStorage.setItem("ipo_database", JSON.stringify(updatedIpos));
        setLiveIpos(updatedIpos);
        setIpoCount(updatedIpos.length);
      }
    }
  };

  // Delete live IPO listing
  const handleDeleteLiveIpo = (ipoId: string) => {
    if (confirm("Are you sure you want to delete this live IPO listing?")) {
      const updated = liveIpos.filter(ipo => ipo.id !== ipoId);
      localStorage.setItem("ipo_database", JSON.stringify(updated));
      setLiveIpos(updated);
      setIpoCount(updated.length);
    }
  };

  const handleApproveRejectProduct = async (id: string, decision: "approved" | "rejected", type: "payments" | "banks" | "brokers" | "cards" | "crypto") => {
    const endpointMap: Record<string, { endpoint: string; fetchFn: () => void }> = {
      payments: { endpoint: "/api/admin/payment-apps", fetchFn: fetchPaymentApps },
      banks: { endpoint: "/api/admin/banks", fetchFn: fetchBanks },
      brokers: { endpoint: "/api/admin/brokers", fetchFn: fetchBrokers },
      cards: { endpoint: "/api/admin/credit-cards", fetchFn: fetchCards },
      crypto: { endpoint: "/api/admin/crypto-apps", fetchFn: fetchCryptos },
    };
    const config = endpointMap[type];
    if (!config) return;
    try {
      const res = await fetch(config.endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: decision })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Product successfully ${decision}.`);
        config.fetchFn();
      } else {
        alert(data.error || "Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating product status:", err);
      alert("Error occurred while updating.");
    }
  };

  // Keep backward-compatible payment app handler
  const handleApproveRejectPaymentApp = (id: string, decision: "approved" | "rejected") =>
    handleApproveRejectProduct(id, decision, "payments");



  // Add custom Select Category product listing
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setProdSuccess("");

    if (!prodName.trim() || !prodSlug.trim() || !prodSummary.trim()) {
      alert("Please enter Name, Slug and Summary details.");
      return;
    }

    let compiledProduct: any = {
      id: "prod_" + Date.now(),
      slug: prodSlug.trim().toLowerCase(),
      name: prodName.trim(),
      rating: parseFloat(prodRating) || 4.0,
      type: prodType.trim() || "Standard Option",
      activeUsers: prodActiveUsers.trim(),
      likes: parseInt(prodLikes) || 120,
      country: prodCountry.trim(),
      countrySlug: prodCountrySlug.trim().toLowerCase(),
      logoColor: prodLogoColor,
      logoLetter: prodLogoLetter.trim() || prodName.trim().charAt(0).toUpperCase(),
      summary: prodSummary.trim(),
      platforms: prodPlatforms.split(",").map(p => p.trim()).filter(Boolean),
      pros: prodPros.split("\n").map(p => p.trim()).filter(Boolean),
      cons: prodCons.split("\n").map(c => c.trim()).filter(Boolean),
      addedBy: user.email,
      addedAt: new Date().toISOString()
    };

    // Category Specific Field Compilation mapping exactly to existing templates
    if (activeSelectType === "banks") {
      compiledProduct.interestRate = bankInterestRate;
      compiledProduct.features = {
        digitalOnboarding: bankFeatOnboarding,
        mobileApp: bankFeatMobileApp,
        freeDebitCard: bankFeatFreeDebit,
        highInterest: bankFeatHighInterest,
        zeroBalance: bankFeatZeroBalance
      };
      compiledProduct.charges = {
        minimumBalance: bankChargeMinBal,
        maintenanceFee: bankChargeMaint,
        atmWithdrawal: bankChargeAtm,
        foreignExchange: bankChargeFx
      };
      compiledProduct.categoryRatings = {
        rates: parseFloat(revRating1) || 4.0,
        usability: parseFloat(revRating2) || 4.0,
        customerService: parseFloat(revRating3) || 4.0
      };
      compiledProduct.detailedReview = {
        onboarding: revBlock1 || "Standard onboarding description.",
        fees: revBlock2 || "Fees summary details.",
        features: revBlock3 || "Features highlights review.",
        service: revBlock4 || "Customer support analysis."
      };
    } else if (activeSelectType === "brokers") {
      compiledProduct.country = prodCountry.trim() === "India" ? "IN" : prodCountry.trim() === "United States" ? "US" : "UK";
      compiledProduct.countryName = prodCountry.trim();
      compiledProduct.depository = brokerDepository;
      compiledProduct.activeClients = prodActiveUsers;
      compiledProduct.segments = {
        equity: brokerSegEquity,
        commodity: brokerSegCommodity,
        currency: brokerSegCurrency,
        futures: brokerSegFutures,
        options: brokerSegOptions
      };
      compiledProduct.charges = {
        opening: brokerChargeOpening,
        amc: brokerChargeAmc,
        callTrade: brokerChargeCallTrade
      };
      compiledProduct.brokerage = {
        delivery: brokerageDelivery,
        intraday: brokerageIntraday,
        futures: brokerageFutures,
        options: brokerageOptions
      };
      compiledProduct.margins = {
        delivery: brokerMarginDelivery,
        intraday: brokerMarginIntraday
      };
      compiledProduct.categoryRatings = {
        charges: parseFloat(revRating1) || 4.0,
        usability: parseFloat(revRating2) || 4.0,
        customerService: parseFloat(revRating3) || 4.0
      };
      compiledProduct.detailedReviews = {
        charges: revBlock2 || "Brokerage fee details.",
        usability: revBlock3 || "Trading platforms usability analysis.",
        service: revBlock4 || "Customer helpdesk efficiency.",
        opening: revBlock1 || "InstantDematapp KYC setup process."
      };
      compiledProduct.taxes = {
        stt: { delivery: "0.1%", intraday: "0.025%", futures: "0.0125%", options: "0.0625%" },
        stampDuty: { delivery: "0.015%", intraday: "0.003%", futures: "0.002%", options: "0.003%" },
        exchangeCharges: { delivery: "0.003%", intraday: "0.003%", futures: "0.002%", options: "0.05%" },
        sebiFees: { delivery: "₹10/Cr", intraday: "₹10/Cr", futures: "₹10/Cr", options: "₹10/Cr" },
        gst: { delivery: "18%", intraday: "18%", futures: "18%", options: "18%" },
        dpCharges: "₹13.5 + GST"
      };
    } else if (activeSelectType === "cards") {
      compiledProduct.overallRating = parseFloat(prodRating) || 4.0;
      compiledProduct.bestFor = cardBestFor;
      compiledProduct.issuer = cardIssuer;
      compiledProduct.issuerCode = cardIssuerCode;
      compiledProduct.network = cardNetwork;
      compiledProduct.description = prodSummary;
      compiledProduct.featuresChecklist = {
        welcomeBonus: cardFeatWelcomeBonus,
        travel: cardFeatTravel,
        fuel: cardFeatFuel,
        rewards: cardFeatRewards,
        shopping: cardFeatShopping,
        cashback: cardFeatCashback,
        dining: cardFeatDining,
        insurance: cardFeatInsurance,
        interest: cardFeatInterest,
        lounge: cardFeatLounge
      };
      compiledProduct.perks = [
        {
          title: "Primary Reward Perks",
          category: cardBestFor.toLowerCase().includes("cashback") ? "cashback" : "rewards",
          details: cardPerksDetails.split("\n").map(d => d.trim()).filter(Boolean)
        }
      ];
      compiledProduct.fees = {
        joiningFee: cardChargeJoining,
        annualFee: cardChargeAnnual,
        apr: cardChargeApr,
        addonFee: "Free",
        minimumRepayment: "5%",
        cashWithdrawalFee: "2.5% or ₹500",
        cashAdvanceLimit: "40%",
        cardReplacementFee: "₹100",
        foreignTransactionFee: "3.5%",
        overLimitPenalty: "2.5%",
        fuelSurcharge: "1%",
        rewardPointValue: "1%"
      };
      compiledProduct.latePaymentCharges = [
        { range: "Standard Slab Outstanding", fee: "₹0 to ₹1300" }
      ];
      compiledProduct.ratingsBreakdown = {
        charges: parseFloat(revRating1) || 4.0,
        rewards: parseFloat(revRating2) || 4.0,
        customerService: parseFloat(revRating3) || 4.0
      };
      compiledProduct.reviewTitle = `${prodName} In-depth Review`;
      compiledProduct.reviewContent = revBlock1 || "Full detailed credit card analysis review.";
      compiledProduct.reviewOverviewTable = [
        { label: "Joining Fees", value: cardChargeJoining },
        { label: "Annual Fees", value: cardChargeAnnual },
        { label: "Best For", value: cardBestFor }
      ];
    } else if (activeSelectType === "payments") {
      compiledProduct.features = {
        upi: payFeatUpi,
        wallet: payFeatWallet,
        bankTransfer: payFeatBankTransfer,
        cards: payFeatCards,
        international: payFeatInternational
      };
      compiledProduct.charges = {
        walletLoading: payChargeWallet,
        bankTransfer: payChargeBank,
        cardPayments: payChargeCards
      };
      compiledProduct.limits = {
        dailyLimit: payLimitDaily,
        transactionLimit: payLimitTransaction
      };
      compiledProduct.categoryRatings = {
        speed: parseFloat(revRating1) || 4.0,
        usability: parseFloat(revRating2) || 4.0,
        security: parseFloat(revRating3) || 4.0
      };
      compiledProduct.detailedReview = {
        interface: revBlock1 || "User interface overview.",
        charges: revBlock2 || "Wallet transactions charges review.",
        onboarding: revBlock3 || "Mobile verification onboarding.",
        security: revBlock4 || "Security encryption locks."
      };
    } else if (activeSelectType === "crypto") {
      compiledProduct.features = {
        spotTrading: cryptoFeatSpot,
        futuresTrading: cryptoFeatFutures,
        staking: cryptoFeatStaking,
        wallet: cryptoFeatWallet,
        fiatDeposit: cryptoFeatFiat
      };
      compiledProduct.charges = {
        makerFee: cryptoChargeMaker,
        takerFee: cryptoChargeTaker,
        withdrawalFee: cryptoChargeWithdrawal
      };
      compiledProduct.limits = {
        dailyWithdrawal: cryptoLimitWithdrawal,
        minimumDeposit: cryptoLimitMinDeposit
      };
      compiledProduct.categoryRatings = {
        speed: parseFloat(revRating1) || 4.0,
        usability: parseFloat(revRating2) || 4.0,
        security: parseFloat(revRating3) || 4.0
      };
      compiledProduct.detailedReview = {
        interface: revBlock1 || "Trading screen dashboard overview.",
        fees: revBlock2 || "Maker and taker transaction margins.",
        onboarding: revBlock3 || "FIU identity verification.",
        security: revBlock4 || "Multi-sig cold storage wallet protection."
      };
    }

    const resetAdminForm = () => {
      setProdName(""); setProdSlug(""); setProdSummary(""); setProdPros(""); setProdCons("");
      setRevBlock1(""); setRevBlock2(""); setRevBlock3(""); setRevBlock4("");
    };

    const submitToAPI = (endpoint: string, fetchAfter: () => void) => {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...compiledProduct, addedBy: user.email, userRole: user.role })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProdSuccess("Product published directly to database!");
          resetAdminForm();
          fetchAfter();
        } else {
          alert(data.error || "Failed to submit product.");
        }
      })
      .catch(err => { console.error("Error submitting:", err); alert("An error occurred during submission."); });
    };

    if (activeSelectType === "payments") submitToAPI("/api/payment-apps", fetchPaymentApps);
    else if (activeSelectType === "banks") submitToAPI("/api/banks", fetchBanks);
    else if (activeSelectType === "brokers") submitToAPI("/api/brokers", fetchBrokers);
    else if (activeSelectType === "cards") submitToAPI("/api/credit-cards", fetchCards);
    else if (activeSelectType === "crypto") submitToAPI("/api/crypto-apps", fetchCryptos);
  };

  // Delete custom Select Product
  const handleDeleteProduct = (prodId: string, type: string) => {
    if (confirm("Are you sure you want to delete this product listing?")) {
      const endpointMap: Record<string, { endpoint: string; fetchFn: () => void }> = {
        payments: { endpoint: "/api/admin/payment-apps", fetchFn: fetchPaymentApps },
        banks: { endpoint: "/api/admin/banks", fetchFn: fetchBanks },
        brokers: { endpoint: "/api/admin/brokers", fetchFn: fetchBrokers },
        cards: { endpoint: "/api/admin/credit-cards", fetchFn: fetchCards },
        crypto: { endpoint: "/api/admin/crypto-apps", fetchFn: fetchCryptos },
      };
      const config = endpointMap[type];
      if (config) {
        fetch(config.endpoint, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: prodId })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) { alert("Product deleted successfully."); config.fetchFn(); }
          else { alert(data.error || "Failed to delete product."); }
        })
        .catch(err => { console.error("Error deleting:", err); alert("Error occurred while deleting."); });
      }
    }
  };



  // Reset local cache databases helper
  const handleRestoreSeeds = () => {
    if (confirm("Restore all systems to fresh default mock data?")) {
      localStorage.removeItem("ipo_database");
      localStorage.removeItem("pending_submissions");
      localStorage.removeItem("custom_banks");
      localStorage.removeItem("custom_brokers");
      localStorage.removeItem("custom_cards");
      localStorage.removeItem("custom_payments");
      localStorage.removeItem("custom_cryptos");
      syncLocalData();
      alert("System caches restored successfully!");
    }
  };

  // Handle Save Edited Submission/Product
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;

    if (editItemType === "ipos") {
      const updatedSubs = submissions.map((sub) => {
        if (sub.id === editItem.id) {
          return { ...sub, ...editItem };
        }
        return sub;
      });
      localStorage.setItem("pending_submissions", JSON.stringify(updatedSubs));
      setSubmissions(updatedSubs);
      
      // Also update in live ipos if it was already approved/live
      const ipoDb = localStorage.getItem("ipo_database");
      if (ipoDb) {
        const parsed = JSON.parse(ipoDb);
        const updatedIpos = parsed.map((ipo: any) => {
          if (ipo.name === editItem.name || ipo.ticker === editItem.ticker) {
            return {
              ...ipo,
              name: editItem.name,
              ticker: editItem.ticker,
              segment: editItem.segment,
              priceBand: editItem.priceBand,
              size: editItem.size,
              lotSize: editItem.lotSize,
              gmp: editItem.gmp,
              gmpAmount: editItem.gmpAmount,
              openDate: editItem.openDate,
              closeDate: editItem.closeDate,
            };
          }
          return ipo;
        });
        localStorage.setItem("ipo_database", JSON.stringify(updatedIpos));
        setLiveIpos(updatedIpos);
      }
      
      alert("IPO details updated successfully.");
      setEditItem(null);
    } else {
      const endpointMap: Record<string, { endpoint: string; fetchFn: () => void }> = {
        banks: { endpoint: "/api/admin/banks", fetchFn: fetchBanks },
        brokers: { endpoint: "/api/admin/brokers", fetchFn: fetchBrokers },
        cards: { endpoint: "/api/admin/credit-cards", fetchFn: fetchCards },
        payments: { endpoint: "/api/admin/payment-apps", fetchFn: fetchPaymentApps },
        crypto: { endpoint: "/api/admin/crypto-apps", fetchFn: fetchCryptos },
      };
      const config = endpointMap[editItemType];
      if (config) {
        try {
          const res = await fetch(config.endpoint, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editItem)
          });
          const data = await res.json();
          if (data.success) {
            alert("Product details updated successfully.");
            setEditItem(null);
            config.fetchFn();
          } else {
            alert(data.error || "Failed to update product details.");
          }
        } catch (err) {
          console.error("Error updating product:", err);
          alert("Error updating product.");
        }
      }
    }
  };

  // Filtered db users list
  const filteredUsers = dbUsers.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Role Breakdown Stats
  const adminCount = dbUsers.filter(u => u.role === "ADMIN").length;
  const authorCount = dbUsers.filter(u => u.role === "AUTHOR").length;
  const proCount = dbUsers.filter(u => u.role === "PRO").length;
  const regularCount = dbUsers.filter(u => u.role === "USER").length;
  const googleOauthCount = dbUsers.filter(u => u.picture).length;
  const emailAuthCount = dbUsers.length - googleOauthCount;

  return (
    <div className="app-container" style={{ padding: "0", maxWidth: "100%", margin: "0" }}>
      
      {/* ── Outer Re-Architected Admin Flex Layout ── */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        
        {/* ── 1. Vertical Sidebar Navigation ── */}
        <aside style={{
          width: isCollapsed ? "76px" : "260px",
          background: "var(--card-bg)",
          borderRight: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          padding: "1.75rem 1rem",
          gap: "1.5rem",
          transition: "width 0.2s ease",
          position: "relative"
        }}>
          {/* Console Branding */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: isCollapsed ? "center" : "flex-start", gap: "0.25rem", minHeight: "44px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.3rem" }} title="Control Center">🛡️</span>
              {!isCollapsed && <span style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.02em" }}>Control Center</span>}
            </div>
            {!isCollapsed && (
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                Logged in as: <strong style={{ color: "var(--primary)" }}>{user.role}</strong>
              </p>
            )}
          </div>

          <hr style={{ border: "none", borderTop: "1px solid var(--border-color)", margin: "0" }} />

          {/* Navigation Links Group */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>
            
            {user.role === "ADMIN" && (
              <button 
                onClick={() => setActiveTab("overview")}
                title="Overview"
                style={{
                  display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "flex-start", gap: "0.75rem", width: "100%",
                  padding: "0.7rem 0.85rem", borderRadius: "8px", border: "none",
                  background: activeTab === "overview" ? "rgba(var(--primary-rgb), 0.08)" : "transparent",
                  color: activeTab === "overview" ? "var(--primary)" : "var(--text-secondary)",
                  fontWeight: activeTab === "overview" ? 700 : 500, fontSize: "0.85rem",
                  textAlign: "left", cursor: "pointer", transition: "all 0.15s"
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>📊</span> {!isCollapsed && "Overview"}
              </button>
            )}

            {user.role === "ADMIN" && (
              <button 
                onClick={() => setActiveTab("users")}
                title="Users Directory"
                style={{
                  display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "flex-start", gap: "0.75rem", width: "100%",
                  padding: "0.7rem 0.85rem", borderRadius: "8px", border: "none",
                  background: activeTab === "users" ? "rgba(var(--primary-rgb), 0.08)" : "transparent",
                  color: activeTab === "users" ? "var(--primary)" : "var(--text-secondary)",
                  fontWeight: activeTab === "users" ? 700 : 500, fontSize: "0.85rem",
                  textAlign: "left", cursor: "pointer", transition: "all 0.15s"
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>👥</span> {!isCollapsed && "Users Directory"}
              </button>
            )}

            {user.role === "ADMIN" && (
              <button 
                onClick={() => setActiveTab("authors")}
                title="Authors & Editors"
                style={{
                  display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "flex-start", gap: "0.75rem", width: "100%",
                  padding: "0.7rem 0.85rem", borderRadius: "8px", border: "none",
                  background: activeTab === "authors" ? "rgba(var(--primary-rgb), 0.08)" : "transparent",
                  color: activeTab === "authors" ? "var(--primary)" : "var(--text-secondary)",
                  fontWeight: activeTab === "authors" ? 700 : 500, fontSize: "0.85rem",
                  textAlign: "left", cursor: "pointer", transition: "all 0.15s"
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>✍️</span> {!isCollapsed && "Authors & Editors"}
              </button>
            )}

            <button 
              onClick={() => setActiveTab("queue")}
              title={`Review Queue (${submissions.filter(s => s.status === "Pending").length})`}
              style={{
                display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "flex-start", gap: "0.75rem", width: "100%",
                padding: "0.7rem 0.85rem", borderRadius: "8px", border: "none",
                background: activeTab === "queue" ? "rgba(var(--primary-rgb), 0.08)" : "transparent",
                color: activeTab === "queue" ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: activeTab === "queue" ? 700 : 500, fontSize: "0.85rem",
                textAlign: "left", cursor: "pointer", transition: "all 0.15s"
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>📥</span> {!isCollapsed && `Review Queue (${submissions.filter(s => s.status === "Pending").length})`}
            </button>

            <button 
              onClick={() => setActiveTab("ipos")}
              title="IPO Listings"
              style={{
                display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "flex-start", gap: "0.75rem", width: "100%",
                padding: "0.7rem 0.85rem", borderRadius: "8px", border: "none",
                background: activeTab === "ipos" ? "rgba(var(--primary-rgb), 0.08)" : "transparent",
                color: activeTab === "ipos" ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: activeTab === "ipos" ? 700 : 500, fontSize: "0.85rem",
                textAlign: "left", cursor: "pointer", transition: "all 0.15s"
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>📂</span> {!isCollapsed && "IPO Listings"}
            </button>

            <button 
              onClick={() => setActiveTab("products")}
              title="Select Products"
              style={{
                display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "flex-start", gap: "0.75rem", width: "100%",
                padding: "0.7rem 0.85rem", borderRadius: "8px", border: "none",
                background: activeTab === "products" ? "rgba(var(--primary-rgb), 0.08)" : "transparent",
                color: activeTab === "products" ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: activeTab === "products" ? 700 : 500, fontSize: "0.85rem",
                textAlign: "left", cursor: "pointer", transition: "all 0.15s"
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>🛍️</span> {!isCollapsed && "Select Products"}
            </button>

            <button 
              onClick={() => setActiveTab("config")}
              title="System Config"
              style={{
                display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "flex-start", gap: "0.75rem", width: "100%",
                padding: "0.7rem 0.85rem", borderRadius: "8px", border: "none",
                background: activeTab === "config" ? "rgba(var(--primary-rgb), 0.08)" : "transparent",
                color: activeTab === "config" ? "var(--primary)" : "var(--text-secondary)",
                fontWeight: activeTab === "config" ? 700 : 500, fontSize: "0.85rem",
                textAlign: "left", cursor: "pointer", transition: "all 0.15s"
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>⚙️</span> {!isCollapsed && "System Config"}
            </button>

          </div>

          {/* Sidebar Collapse Button */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "100%", padding: "0.6rem", borderRadius: "8px",
              background: "var(--spec-bg)", border: "1px solid var(--border-color)",
              color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.85rem",
              fontFamily: "inherit", fontWeight: "bold"
            }}
          >
            {isCollapsed ? "▶" : "◀ Collapse"}
          </button>

          {/* Sidebar Footer Info */}
          {!isCollapsed && (
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", background: "var(--spec-bg)", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
              🌐 Scope: <span style={{ color: "var(--text-primary)", fontWeight: "600", textTransform: "capitalize" }}>{country}</span>
            </div>
          )}

        </aside>

        {/* ── 2. Content Pane with dynamic Light/Dark mode backgrounds ── */}
        <main className="admin-content-pane" style={{
          flex: 1,
          padding: "2.5rem",
          overflowY: "auto",
          maxHeight: "calc(100vh - 60px)",
          color: "var(--text-primary)"
        }}>

          {/* ── TAB: OVERVIEW (ADMIN ONLY) ── */}
          {activeTab === "overview" && user.role === "ADMIN" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
              <div>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>Global System Status</h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Welcome back, {user.name}. Here is an overview of active catalogs and roles.</p>
              </div>

              {/* KPI Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                <div className="card" style={{ padding: "1.5rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Live IPOs</span>
                  <div style={{ fontSize: "2rem", fontWeight: 900, margin: "0.25rem 0", color: "var(--primary)" }}>{liveIpos.length} Active</div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Across all country portals</span>
                </div>
                <div className="card" style={{ padding: "1.5rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Database Users</span>
                  <div style={{ fontSize: "2rem", fontWeight: 900, margin: "0.25rem 0", color: "var(--success)" }}>{dbUsers.length} Users</div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Connected to Neon Live SQL</span>
                </div>
                <div className="card" style={{ padding: "1.5rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Bidding Reviews</span>
                  <div style={{ fontSize: "2rem", fontWeight: 900, margin: "0.25rem 0", color: "var(--warning)" }}>
                    {submissions.filter(s => s.status === "Pending").length} Pending
                  </div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Requires admin confirmation</span>
                </div>
              </div>

              {/* Advanced statistics panels */}
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
                
                {/* Database role breakdowns */}
                <div className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>👥 Real-Time User Roles Allocation</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                    
                    <div>
                      <div className="flex-between" style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
                        <span style={{ color: "var(--text-secondary)" }}>🛡️ Global Administrators</span>
                        <strong style={{ color: "var(--text-primary)" }}>{adminCount} ({dbUsers.length ? Math.round((adminCount/dbUsers.length)*100) : 0}%)</strong>
                      </div>
                      <div style={{ height: "6px", background: "var(--border-color)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ width: `${dbUsers.length ? (adminCount/dbUsers.length)*100 : 0}%`, height: "100%", background: "#ef4444" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex-between" style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
                        <span style={{ color: "var(--text-secondary)" }}>✍️ Regional Editors / Authors</span>
                        <strong style={{ color: "var(--text-primary)" }}>{authorCount} ({dbUsers.length ? Math.round((authorCount/dbUsers.length)*100) : 0}%)</strong>
                      </div>
                      <div style={{ height: "6px", background: "var(--border-color)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ width: `${dbUsers.length ? (authorCount/dbUsers.length)*100 : 0}%`, height: "100%", background: "rgb(var(--primary-rgb))" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex-between" style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
                        <span style={{ color: "var(--text-secondary)" }}>⭐ Premium PRO Members</span>
                        <strong style={{ color: "var(--text-primary)" }}>{proCount} ({dbUsers.length ? Math.round((proCount/dbUsers.length)*100) : 0}%)</strong>
                      </div>
                      <div style={{ height: "6px", background: "var(--border-color)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ width: `${dbUsers.length ? (proCount/dbUsers.length)*100 : 0}%`, height: "100%", background: "#10b981" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex-between" style={{ fontSize: "0.82rem", marginBottom: "0.3rem" }}>
                        <span style={{ color: "var(--text-secondary)" }}>👤 Regular Users</span>
                        <strong style={{ color: "var(--text-primary)" }}>{regularCount} ({dbUsers.length ? Math.round((regularCount/dbUsers.length)*100) : 0}%)</strong>
                      </div>
                      <div style={{ height: "6px", background: "var(--border-color)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ width: `${dbUsers.length ? (regularCount/dbUsers.length)*100 : 0}%`, height: "100%", background: "#64748b" }} />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Login Method Breakdown */}
                <div className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>🔑 Authentications Source</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--spec-bg)", padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                        </svg>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>Google OAuth</span>
                      </div>
                      <span style={{ fontWeight: 800, color: "var(--primary)", fontSize: "1.1rem" }}>{googleOauthCount}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--spec-bg)", padding: "1rem", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span style={{ fontSize: "1.2rem" }}>✉️</span>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>Standard Email</span>
                      </div>
                      <span style={{ fontWeight: 800, color: "var(--text-secondary)", fontSize: "1.1rem" }}>{emailAuthCount}</span>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ── TAB: USERS DIRECTORY (ADMIN ONLY) ── */}
          {activeTab === "users" && user.role === "ADMIN" && (
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>👥 Real-Time User Accounts</h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Direct connection to Neon PostgreSQL table `public.users`.</p>
                </div>
                
                {/* Search */}
                <input 
                  type="text" 
                  placeholder="Search users by name or email..." 
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="input-field"
                  style={{ maxWidth: "300px", background: "var(--spec-bg)" }}
                />
              </div>

              {userActionMessage && (
                <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.82rem", color: "var(--success)", marginBottom: "1.5rem" }}>
                  ✓ {userActionMessage}
                </div>
              )}

              {dbUsersLoading ? (
                <div style={{ textAlign: "center", padding: "3rem" }}>Loading database entries...</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-color)", opacity: 0.8 }}>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>User Info</th>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Method</th>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Role</th>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Scope Permission</th>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center", color: "var(--text-secondary)", padding: "2rem" }}>
                            No users found matching query.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((colUser) => (
                          <tr key={colUser.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                            <td style={{ padding: "1.25rem 0.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              {/* Avatar */}
                              <span className="nb-avatar" style={{ width: 34, height: 34, borderRadius: "50%" }}>
                                {colUser.picture ? (
                                  <img 
                                    src={colUser.picture} 
                                    alt={colUser.name} 
                                    referrerPolicy="no-referrer"
                                    style={{ width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" }} 
                                  />
                                ) : (
                                  colUser.name.charAt(0).toUpperCase()
                                )}
                              </span>
                              <div>
                                <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)", display: "block" }}>{colUser.name}</strong>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{colUser.email}</span>
                              </div>
                            </td>
                            <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.8rem", color: "var(--text-primary)" }}>
                              {colUser.picture ? "Google Auth" : "Email / Pass"}
                            </td>
                            <td style={{ padding: "1.25rem 0.5rem" }}>
                              <span className={`badge ${colUser.role === "ADMIN" ? "badge-danger" : colUser.role === "AUTHOR" ? "badge-primary" : colUser.role === "PRO" ? "badge-success" : "badge-secondary"}`} style={{ fontSize: "0.62rem" }}>
                                {colUser.role}
                              </span>
                            </td>
                            <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                              {colUser.role === "ADMIN" ? "All Portals (*)" : colUser.assignedCountries && colUser.assignedCountries.length > 0 ? colUser.assignedCountries.join(", ").toUpperCase() : "None"}
                            </td>
                            <td style={{ padding: "1.25rem 0.5rem", textAlign: "right" }}>
                              {editingUserId === colUser.id ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                                  <div style={{ display: "flex", gap: "0.35rem" }}>
                                    <select value={editingRole} onChange={(e) => setEditingRole(e.target.value as any)} className="input-field" style={{ padding: "0.25rem", fontSize: "0.78rem", width: "90px", background: "var(--card-bg)" }}>
                                      <option value="USER">USER</option>
                                      <option value="PRO">PRO</option>
                                      <option value="AUTHOR">AUTHOR</option>
                                      <option value="ADMIN">ADMIN</option>
                                    </select>
                                    <select
                                      value={getSelectValue(editingCountries)}
                                      onChange={(e) => setEditingCountries(e.target.value)}
                                      className="input-field"
                                      style={{ padding: "0.25rem", fontSize: "0.78rem", width: "130px", background: "var(--card-bg)" }}
                                    >
                                      <option value="india, united-states, united-kingdom">All Countries</option>
                                      <option value="india">India</option>
                                      <option value="united-states">United States</option>
                                      <option value="united-kingdom">United Kingdom</option>
                                    </select>
                                  </div>
                                  <div style={{ display: "flex", gap: "0.35rem" }}>
                                    <button onClick={() => handleSaveUserEdit(colUser.id)} style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700, padding: "0.2rem 0.5rem", border: "1px solid #10b981", borderRadius: "4px", background: "none", cursor: "pointer" }}>Save</button>
                                    <button onClick={() => setEditingUserId(null)} style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, padding: "0.2rem 0.5rem", border: "1px solid var(--border-color)", borderRadius: "4px", background: "none", cursor: "pointer" }}>Cancel</button>
                                  </div>
                                </div>
                              ) : (
                                <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                                  <button
                                    onClick={() => {
                                      setEditingUserId(colUser.id);
                                      setEditingRole(colUser.role);
                                      setEditingCountries(colUser.assignedCountries ? colUser.assignedCountries.join(", ") : "");
                                    }}
                                    className="btn btn-secondary"
                                    style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem", borderRadius: "6px" }}
                                  >
                                    ⚙️ Scope
                                  </button>
                                  {colUser.email !== user.email && (
                                    <button
                                      onClick={() => handleDeleteUser(colUser.id)}
                                      className="btn btn-secondary"
                                      style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem", borderRadius: "6px", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}
                                    >
                                      ✕ Delete
                                    </button>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── TAB: AUTHORS & EDITORS DIRECTORY (ADMIN ONLY) ── */}
          {activeTab === "authors" && user.role === "ADMIN" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              {/* Quick Promote Panel */}
              <div className="card" style={{ padding: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--text-primary)" }}>✍️ Promote User to Author / Editor</h3>
                <div style={{ background: "var(--spec-bg)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                  Provide an existing user's details to grant them editorial access and assign specific country portal permissions.
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.5fr 1fr", gap: "1rem", alignItems: "end" }}>
                  <div>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Select Registered User</label>
                    <select 
                      className="input-field" 
                      style={{ background: "var(--spec-bg)" }}
                      onChange={(e) => {
                        const targetUser = dbUsers.find(u => u.id === e.target.value);
                        if (targetUser) {
                          setEditingUserId(targetUser.id);
                          setEditingRole("AUTHOR");
                          setEditingCountries(targetUser.assignedCountries ? targetUser.assignedCountries.join(", ") : "india");
                        }
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>-- Choose User --</option>
                      {dbUsers.filter(u => u.role !== "AUTHOR" && u.role !== "ADMIN").map(u => (
                        <option key={u.id} value={u.id}>{u.name} ({u.email}) [{u.role}]</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Assigned Country Portal</label>
                    <select
                      value={editingUserId && dbUsers.find(u => u.id === editingUserId)?.role !== "AUTHOR" ? getSelectValue(editingCountries) : "india, united-states, united-kingdom"}
                      onChange={(e) => setEditingCountries(e.target.value)}
                      className="input-field"
                    >
                      <option value="india, united-states, united-kingdom">All Countries</option>
                      <option value="india">India</option>
                      <option value="united-states">United States</option>
                      <option value="united-kingdom">United Kingdom</option>
                    </select>
                  </div>

                  <button 
                    onClick={() => {
                      if (!editingUserId) {
                        alert("Please select a user to promote first.");
                        return;
                      }
                      handleSaveUserEdit(editingUserId);
                    }}
                    className="btn btn-primary"
                    style={{ width: "100%", height: "42px" }}
                  >
                    Grant Author Access
                  </button>
                </div>
              </div>

              {/* Authors List */}
              <div className="card" style={{ padding: "2rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>✍️ Editorial & Publishing Team</h2>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Users with role AUTHOR or ADMIN who have publishing and directory submission access.</p>
                  </div>
                  
                  {/* Search */}
                  <input 
                    type="text" 
                    placeholder="Search authors..." 
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="input-field"
                    style={{ maxWidth: "300px", background: "var(--spec-bg)" }}
                  />
                </div>

                {userActionMessage && (
                  <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.82rem", color: "var(--success)", marginBottom: "1.5rem" }}>
                    ✓ {userActionMessage}
                  </div>
                )}

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-color)", opacity: 0.8 }}>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Author Info</th>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Role</th>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Assigned Portals</th>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dbUsers.filter(u => (u.role === "AUTHOR" || u.role === "ADMIN") && (
                        u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                        u.email.toLowerCase().includes(userSearch.toLowerCase())
                      )).length === 0 ? (
                        <tr>
                          <td colSpan={4} style={{ textAlign: "center", color: "var(--text-secondary)", padding: "2rem" }}>
                            No authors or editors found.
                          </td>
                        </tr>
                      ) : (
                        dbUsers.filter(u => (u.role === "AUTHOR" || u.role === "ADMIN") && (
                          u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.email.toLowerCase().includes(userSearch.toLowerCase())
                        )).map((colUser) => (
                          <tr key={colUser.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                            <td style={{ padding: "1.25rem 0.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              <span className="nb-avatar" style={{ width: 34, height: 34, borderRadius: "50%" }}>
                                {colUser.picture ? (
                                  <img 
                                    src={colUser.picture} 
                                    alt={colUser.name} 
                                    referrerPolicy="no-referrer"
                                    style={{ width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" }} 
                                  />
                                ) : (
                                  colUser.name.charAt(0).toUpperCase()
                                )}
                              </span>
                              <div>
                                <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)", display: "block" }}>{colUser.name}</strong>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{colUser.email}</span>
                              </div>
                            </td>
                            <td style={{ padding: "1.25rem 0.5rem" }}>
                              <span className={`badge ${colUser.role === "ADMIN" ? "badge-danger" : "badge-primary"}`} style={{ fontSize: "0.62rem" }}>
                                {colUser.role}
                              </span>
                            </td>
                            <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                              {colUser.role === "ADMIN" ? "All Portals (*)" : colUser.assignedCountries && colUser.assignedCountries.length > 0 ? colUser.assignedCountries.join(", ").toUpperCase() : "None"}
                            </td>
                            <td style={{ padding: "1.25rem 0.5rem", textAlign: "right" }}>
                              {editingUserId === colUser.id && colUser.role === "AUTHOR" ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                                  <div style={{ display: "flex", gap: "0.35rem" }}>
                                    <select value={editingRole} onChange={(e) => setEditingRole(e.target.value as any)} className="input-field" style={{ padding: "0.25rem", fontSize: "0.78rem", width: "90px", background: "var(--card-bg)" }}>
                                      <option value="USER">USER (Revoke)</option>
                                      <option value="AUTHOR">AUTHOR</option>
                                      <option value="ADMIN">ADMIN</option>
                                    </select>
                                    <select
                                      value={getSelectValue(editingCountries)}
                                      onChange={(e) => setEditingCountries(e.target.value)}
                                      className="input-field"
                                      style={{ padding: "0.25rem", fontSize: "0.78rem", width: "130px", background: "var(--card-bg)" }}
                                    >
                                      <option value="india, united-states, united-kingdom">All Countries</option>
                                      <option value="india">India</option>
                                      <option value="united-states">United States</option>
                                      <option value="united-kingdom">United Kingdom</option>
                                    </select>
                                  </div>
                                  <div style={{ display: "flex", gap: "0.35rem" }}>
                                    <button onClick={() => handleSaveUserEdit(colUser.id)} style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700, padding: "0.2rem 0.5rem", border: "1px solid #10b981", borderRadius: "4px", background: "none", cursor: "pointer" }}>Save</button>
                                    <button onClick={() => setEditingUserId(null)} style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, padding: "0.2rem 0.5rem", border: "1px solid var(--border-color)", borderRadius: "4px", background: "none", cursor: "pointer" }}>Cancel</button>
                                  </div>
                                </div>
                              ) : (
                                <div style={{ display: "inline-flex", gap: "0.5rem" }}>
                                  {colUser.role === "AUTHOR" && (
                                    <button
                                      onClick={() => {
                                        setEditingUserId(colUser.id);
                                        setEditingRole(colUser.role);
                                        setEditingCountries(colUser.assignedCountries ? colUser.assignedCountries.join(", ") : "");
                                      }}
                                      className="btn btn-secondary"
                                      style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem", borderRadius: "6px" }}
                                    >
                                      ⚙️ Edit Scope
                                    </button>
                                  )}
                                  {colUser.email !== user.email && (
                                    <button
                                      onClick={() => {
                                        if (confirm(`Revoke editorial permissions for ${colUser.name}?`)) {
                                          setEditingUserId(colUser.id);
                                          setEditingRole("USER");
                                          setEditingCountries("");
                                          // Trigger update
                                          fetch("/api/admin/users", {
                                            method: "PUT",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                              id: colUser.id,
                                              role: "USER",
                                              assignedCountries: []
                                            }),
                                          }).then(res => res.json()).then(data => {
                                            if (data.success) {
                                              setDbUsers(dbUsers.map(u => u.id === colUser.id ? data.user : u));
                                              setUserActionMessage("Author role revoked successfully.");
                                              setEditingUserId(null);
                                            }
                                          });
                                        }
                                      }}
                                      className="btn btn-secondary"
                                      style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem", borderRadius: "6px", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}
                                    >
                                      ✕ Revoke Role
                                    </button>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}



          {/* ── TAB: EDITORIAL APPROVAL QUEUE (ADMIN ONLY) ── */}
          {activeTab === "queue" && user.role === "ADMIN" && (
            <div className="card" style={{ padding: "2rem" }}>
              <h2 style={{ fontSize: "1.35rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>📥 Pending Submissions Queue</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                
                {/* Syndicate IPO Submissions */}
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem", color: "var(--primary)" }}>Syndicate IPO Submissions</h3>
                  {submissions.filter(s => s.status === "Pending").length === 0 ? (
                    <div style={{ padding: "1.5rem", border: "1px dashed var(--border-color)", borderRadius: "8px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      No pending IPO submissions.
                    </div>
                  ) : (
                    submissions.filter(s => s.status === "Pending").map((sub) => (
                      <div key={sub.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid var(--border-color)", padding: "1.5rem", borderRadius: "12px", background: "var(--spec-bg)", marginBottom: "1rem" }}>
                        <div className="flex-between">
                          <div>
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Submitted by: {sub.authorEmail}</span>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-primary)" }}>{sub.name} ({sub.ticker})</h3>
                          </div>
                          <span className="badge badge-primary" style={{ textTransform: "uppercase" }}>{sub.countrySlug}</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", fontSize: "0.82rem" }}>
                          <div>
                            <span style={{ color: "var(--text-secondary)" }}>Segment:</span>
                            <strong style={{ display: "block", color: "var(--text-primary)", marginTop: "2px" }}>{sub.segment}</strong>
                          </div>
                          <div>
                            <span style={{ color: "var(--text-secondary)" }}>Price Band:</span>
                            <strong style={{ display: "block", color: "var(--text-primary)", marginTop: "2px" }}>{sub.priceBand}</strong>
                          </div>
                          <div>
                            <span style={{ color: "var(--text-secondary)" }}>Issue Size:</span>
                            <strong style={{ display: "block", color: "var(--text-primary)", marginTop: "2px" }}>{sub.size}</strong>
                          </div>
                          <div>
                            <span style={{ color: "var(--text-secondary)" }}>GMP Forecast:</span>
                            <strong style={{ display: "block", color: "var(--success)", marginTop: "2px" }}>{sub.gmpAmount} ({sub.gmp}%)</strong>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", flexWrap: "wrap" }}>
                          <button onClick={() => handleReviewDecision(sub.id, "Approved")} className="btn btn-primary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px" }}>
                            ✓ Approve
                          </button>
                          <button onClick={() => { setEditItem(sub); setEditItemType("ipos"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--primary)", border: "1px solid rgba(99, 102, 241, 0.25)", cursor: "pointer" }}>
                            ✏️ Edit details
                          </button>
                          <button onClick={() => { setViewItem(sub); setViewItemType("ipos"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.05)", color: "var(--text-secondary)", border: "1px solid var(--border-color)", cursor: "pointer" }}>
                            👁 View Details
                          </button>
                          <button onClick={() => handleReviewDecision(sub.id, "Rejected")} className="btn btn-secondary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
                            ✕ Reject Draft
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Bank Account Submissions */}
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem", color: "var(--primary)" }}>Bank Account Submissions</h3>
                  {customBanks.filter(b => b.status === "pending").length === 0 ? (
                    <div style={{ padding: "1.5rem", border: "1px dashed var(--border-color)", borderRadius: "8px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      No pending Bank Account submissions.
                    </div>
                  ) : (
                    customBanks.filter(b => b.status === "pending").map((bank) => (
                      <div key={bank.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid var(--border-color)", padding: "1.5rem", borderRadius: "12px", background: "var(--spec-bg)", marginBottom: "1rem" }}>
                        <div className="flex-between">
                          <div>
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Submitted by: {bank.addedBy}</span>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-primary)" }}>{bank.name} ({bank.slug})</h3>
                          </div>
                          <span className="badge badge-primary" style={{ textTransform: "uppercase" }}>{bank.countrySlug}</span>
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                          {bank.summary}
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", flexWrap: "wrap" }}>
                          <button onClick={() => handleApproveRejectProduct(bank.id, "approved", "banks")} className="btn btn-primary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px" }}>
                            ✓ Approve
                          </button>
                          <button onClick={() => { setEditItem(bank); setEditItemType("banks"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--primary)", border: "1px solid rgba(99, 102, 241, 0.25)", cursor: "pointer" }}>
                            ✏️ Edit details
                          </button>
                          <button onClick={() => { setViewItem(bank); setViewItemType("banks"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.05)", color: "var(--text-secondary)", border: "1px solid var(--border-color)", cursor: "pointer" }}>
                            👁 View Details
                          </button>
                          <button onClick={() => handleApproveRejectProduct(bank.id, "rejected", "banks")} className="btn btn-secondary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
                            ✕ Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Broker Submissions */}
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem", color: "var(--primary)" }}>Stock Broker Submissions</h3>
                  {customBrokers.filter(b => b.status === "pending").length === 0 ? (
                    <div style={{ padding: "1.5rem", border: "1px dashed var(--border-color)", borderRadius: "8px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      No pending Broker submissions.
                    </div>
                  ) : (
                    customBrokers.filter(b => b.status === "pending").map((broker) => (
                      <div key={broker.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid var(--border-color)", padding: "1.5rem", borderRadius: "12px", background: "var(--spec-bg)", marginBottom: "1rem" }}>
                        <div className="flex-between">
                          <div>
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Submitted by: {broker.addedBy}</span>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-primary)" }}>{broker.name} ({broker.slug})</h3>
                          </div>
                          <span className="badge badge-primary" style={{ textTransform: "uppercase" }}>{broker.country}</span>
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                          {broker.summary}
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", flexWrap: "wrap" }}>
                          <button onClick={() => handleApproveRejectProduct(broker.id, "approved", "brokers")} className="btn btn-primary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px" }}>
                            ✓ Approve
                          </button>
                          <button onClick={() => { setEditItem(broker); setEditItemType("brokers"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--primary)", border: "1px solid rgba(99, 102, 241, 0.25)", cursor: "pointer" }}>
                            ✏️ Edit details
                          </button>
                          <button onClick={() => { setViewItem(broker); setViewItemType("brokers"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.05)", color: "var(--text-secondary)", border: "1px solid var(--border-color)", cursor: "pointer" }}>
                            👁 View Details
                          </button>
                          <button onClick={() => handleApproveRejectProduct(broker.id, "rejected", "brokers")} className="btn btn-secondary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
                            ✕ Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Credit Card Submissions */}
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem", color: "var(--primary)" }}>Credit Card Submissions</h3>
                  {customCards.filter(c => c.status === "pending").length === 0 ? (
                    <div style={{ padding: "1.5rem", border: "1px dashed var(--border-color)", borderRadius: "8px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      No pending Credit Card submissions.
                    </div>
                  ) : (
                    customCards.filter(c => c.status === "pending").map((card) => (
                      <div key={card.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid var(--border-color)", padding: "1.5rem", borderRadius: "12px", background: "var(--spec-bg)", marginBottom: "1rem" }}>
                        <div className="flex-between">
                          <div>
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Submitted by: {card.addedBy}</span>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-primary)" }}>{card.name} ({card.slug})</h3>
                          </div>
                          <span className="badge badge-primary" style={{ textTransform: "uppercase" }}>{card.country}</span>
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                          {card.description}
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", flexWrap: "wrap" }}>
                          <button onClick={() => handleApproveRejectProduct(card.id, "approved", "cards")} className="btn btn-primary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px" }}>
                            ✓ Approve
                          </button>
                          <button onClick={() => { setEditItem(card); setEditItemType("cards"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--primary)", border: "1px solid rgba(99, 102, 241, 0.25)", cursor: "pointer" }}>
                            ✏️ Edit details
                          </button>
                          <button onClick={() => { setViewItem(card); setViewItemType("cards"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.05)", color: "var(--text-secondary)", border: "1px solid var(--border-color)", cursor: "pointer" }}>
                            👁 View Details
                          </button>
                          <button onClick={() => handleApproveRejectProduct(card.id, "rejected", "cards")} className="btn btn-secondary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
                            ✕ Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Crypto App Submissions */}
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem", color: "var(--primary)" }}>Crypto App Submissions</h3>
                  {customCryptos.filter(c => c.status === "pending").length === 0 ? (
                    <div style={{ padding: "1.5rem", border: "1px dashed var(--border-color)", borderRadius: "8px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      No pending Crypto App submissions.
                    </div>
                  ) : (
                    customCryptos.filter(c => c.status === "pending").map((crypto) => (
                      <div key={crypto.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid var(--border-color)", padding: "1.5rem", borderRadius: "12px", background: "var(--spec-bg)", marginBottom: "1rem" }}>
                        <div className="flex-between">
                          <div>
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Submitted by: {crypto.addedBy}</span>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-primary)" }}>{crypto.name} ({crypto.slug})</h3>
                          </div>
                          <span className="badge badge-primary" style={{ textTransform: "uppercase" }}>{crypto.countrySlug}</span>
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                          {crypto.summary}
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", flexWrap: "wrap" }}>
                          <button onClick={() => handleApproveRejectProduct(crypto.id, "approved", "crypto")} className="btn btn-primary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px" }}>
                            ✓ Approve
                          </button>
                          <button onClick={() => { setEditItem(crypto); setEditItemType("crypto"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--primary)", border: "1px solid rgba(99, 102, 241, 0.25)", cursor: "pointer" }}>
                            ✏️ Edit details
                          </button>
                          <button onClick={() => { setViewItem(crypto); setViewItemType("crypto"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.05)", color: "var(--text-secondary)", border: "1px solid var(--border-color)", cursor: "pointer" }}>
                            👁 View Details
                          </button>
                          <button onClick={() => handleApproveRejectProduct(crypto.id, "rejected", "crypto")} className="btn btn-secondary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
                            ✕ Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Payment App Submissions */}
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "1rem", color: "var(--success)" }}>Payment App Submissions</h3>
                  {customPayments.filter(p => p.status === "pending").length === 0 ? (
                    <div style={{ padding: "1.5rem", border: "1px dashed var(--border-color)", borderRadius: "8px", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      No pending Payment App submissions.
                    </div>
                  ) : (
                    customPayments.filter(p => p.status === "pending").map((app) => (
                      <div key={app.id} style={{ display: "flex", flexDirection: "column", gap: "1rem", border: "1px solid var(--border-color)", padding: "1.5rem", borderRadius: "12px", background: "var(--spec-bg)", marginBottom: "1rem" }}>
                        <div className="flex-between">
                          <div>
                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Submitted by: {app.addedBy}</span>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-primary)" }}>{app.name} ({app.slug})</h3>
                          </div>
                          <span className="badge badge-success" style={{ textTransform: "uppercase" }}>{app.country}</span>
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                          {app.summary}
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", flexWrap: "wrap" }}>
                          <button onClick={() => handleApproveRejectProduct(app.id, "approved", "payments")} className="btn btn-primary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px" }}>
                            ✓ Approve
                          </button>
                          <button onClick={() => { setEditItem(app); setEditItemType("payments"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--primary)", border: "1px solid rgba(99, 102, 241, 0.25)", cursor: "pointer" }}>
                            ✏️ Edit details
                          </button>
                          <button onClick={() => { setViewItem(app); setViewItemType("payments"); }} style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.05)", color: "var(--text-secondary)", border: "1px solid var(--border-color)", cursor: "pointer" }}>
                            👁 View Details
                          </button>
                          <button onClick={() => handleApproveRejectProduct(app.id, "rejected", "payments")} className="btn btn-secondary" style={{ padding: "0.45rem 1.25rem", fontSize: "0.78rem", borderRadius: "6px", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
                            ✕ Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ── TAB: LIVE IPO LISTINGS MANAGER ── */}
          {activeTab === "ipos" && (
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>📂 Active Syndicate IPO Database</h2>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Currently active listings displaying on live country directories.</p>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--border-color)", opacity: 0.8 }}>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Company / Ticker</th>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Country Portal</th>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Segment</th>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Price Band</th>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>GMP</th>
                      <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", textAlign: "right" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveIpos.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", color: "var(--text-secondary)", padding: "2rem" }}>
                          No active IPOs found in listings database.
                        </td>
                      </tr>
                    ) : (
                      liveIpos.map((ipo) => (
                        <tr key={ipo.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                          <td style={{ padding: "1.25rem 0.5rem" }}>
                            <strong style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{ipo.name}</strong>
                            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{ipo.ticker}</div>
                          </td>
                          <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.82rem", textTransform: "capitalize", color: "var(--text-primary)" }}>
                            {ipo.countrySlug.replace("-", " ")}
                          </td>
                          <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.82rem", color: "var(--text-primary)" }}>
                            {ipo.segment}
                          </td>
                          <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                            {ipo.priceBand}
                          </td>
                          <td style={{ padding: "1.25rem 0.5rem", fontSize: "0.85rem", color: "var(--success)", fontWeight: 700 }}>
                            {ipo.gmpAmount} ({ipo.gmp}%)
                          </td>
                          <td style={{ padding: "1.25rem 0.5rem", textAlign: "right" }}>
                            <button
                              onClick={() => handleDeleteLiveIpo(ipo.id)}
                              className="btn btn-secondary"
                              style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem", borderRadius: "6px", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}
                            >
                              ✕ Delete Listing
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── TAB: SELECT PRODUCTS MANAGER (DYNAMIC FOR EACH SPECIFIC REQUIREMENTS) ── */}
          {activeTab === "products" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              
              {/* Selector Bar */}
              <div className="card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>🛍️ Directory Catalog Manager</h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Choose a Select Category directory to manage listings.</p>
                </div>
                
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {(["banks", "brokers", "cards", "payments", "crypto"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setActiveSelectType(type);
                        setProdSuccess("");
                      }}
                      className={`tab-btn ${activeSelectType === type ? "active" : ""}`}
                      style={{ fontSize: "0.78rem", padding: "0.45rem 1rem", borderRadius: "6px" }}
                    >
                      {type.toUpperCase().replace("BANKS", "BANK ACCOUNTS").replace("CARDS", "CREDIT CARDS").replace("PAYMENTS", "PAYMENT APPS").replace("CRYPTO", "CRYPTO APPS")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add New Product Form - Highly Detailed & customized for each product */}
              <div className="card" style={{ padding: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", color: "var(--text-primary)" }}>
                  ➕ Add New {activeSelectType.replace("banks", "Bank Account").replace("brokers", "Broker").replace("cards", "Credit Card").replace("payments", "Payment App").replace("crypto", "Crypto App")}
                </h3>

                {prodSuccess && (
                  <div style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", padding: "0.75rem 1rem", fontSize: "0.82rem", color: "var(--success)", marginBottom: "1.5rem" }}>
                    ✓ {prodSuccess}
                  </div>
                )}

                <form onSubmit={handleAddProduct} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  
                  {/* --- SECTION 1: General Shared Info --- */}
                  <div>
                    <h4 style={{ fontSize: "0.85rem", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.03em", fontWeight: 700, marginBottom: "1rem" }}>Section 1: General Product Information</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Product Name</label>
                        <input type="text" placeholder="e.g. Chase Sapphire Savings" value={prodName} onChange={(e) => setProdName(e.target.value)} className="input-field" required />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Slug URL suffix</label>
                        <input type="text" placeholder="e.g. chase-sapphire-savings" value={prodSlug} onChange={(e) => setProdSlug(e.target.value)} className="input-field" required />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Overall Rating (1.0 to 5.0)</label>
                        <input type="number" step="0.1" value={prodRating} onChange={(e) => setProdRating(e.target.value)} className="input-field" min="1.0" max="5.0" required />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Active User Count</label>
                        <input type="text" placeholder="e.g. 60 Million+" value={prodActiveUsers} onChange={(e) => setProdActiveUsers(e.target.value)} className="input-field" />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Initial Likes</label>
                        <input type="number" value={prodLikes} onChange={(e) => setProdLikes(e.target.value)} className="input-field" min="0" />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Type (Label)</label>
                        <input type="text" placeholder="e.g. Discount Broker, Neobank" value={prodType} onChange={(e) => setProdType(e.target.value)} className="input-field" required />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Target Country</label>
                        <input type="text" placeholder="e.g. India, United States" value={prodCountry} onChange={(e) => setProdCountry(e.target.value)} className="input-field" required />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Target Country Slug</label>
                        <input type="text" placeholder="e.g. india, united-states" value={prodCountrySlug} onChange={(e) => setProdCountrySlug(e.target.value)} className="input-field" required />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Logo Hex Color</label>
                        <input type="text" placeholder="e.g. #0052ff" value={prodLogoColor} onChange={(e) => setProdLogoColor(e.target.value)} className="input-field" />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Logo Letter (Initials)</label>
                        <input type="text" placeholder="e.g. C" value={prodLogoLetter} onChange={(e) => setProdLogoLetter(e.target.value)} className="input-field" maxLength={2} />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 700, display: "block", marginBottom: "0.35rem" }}>Summary Short Description</label>
                      <textarea rows={2} placeholder="Brief summary of the product..." value={prodSummary} onChange={(e) => setProdSummary(e.target.value)} className="input-field" style={{ fontFamily: "inherit" }} required />
                    </div>
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid var(--border-color)", margin: "0.5rem 0" }} />

                  {/* --- SECTION 2: Dynamic Category Specific Requirements --- */}
                  <div>
                    <h4 style={{ fontSize: "0.85rem", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.03em", fontWeight: 700, marginBottom: "1rem" }}>
                      Section 2: Category Details ({activeSelectType.toUpperCase().replace("BANKS", "BANK ACCOUNTS").replace("CARDS", "CREDIT CARDS").replace("PAYMENTS", "PAYMENT APPS").replace("CRYPTO", "CRYPTO APPS")})
                    </h4>

                    {/* DYNAMIC FORM: BANKS */}
                    {activeSelectType === "banks" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Interest Yield Rate</label>
                            <input type="text" placeholder="e.g. 4.25% APY" value={bankInterestRate} onChange={(e) => setBankInterestRate(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Minimum Balance Limit</label>
                            <input type="text" placeholder="e.g. $300 minimum daily" value={bankChargeMinBal} onChange={(e) => setBankChargeMinBal(e.target.value)} className="input-field" />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Maintenance Fee</label>
                            <input type="text" value={bankChargeMaint} onChange={(e) => setBankChargeMaint(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>ATM Withdrawal Fee</label>
                            <input type="text" value={bankChargeAtm} onChange={(e) => setBankChargeAtm(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Foreign FX Markup</label>
                            <input type="text" value={bankChargeFx} onChange={(e) => setBankChargeFx(e.target.value)} className="input-field" />
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Features checklist</label>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.5rem" }}>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={bankFeatOnboarding} onChange={(e) => setBankFeatOnboarding(e.target.checked)} />
                              Digital Onboarding
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={bankFeatMobileApp} onChange={(e) => setBankFeatMobileApp(e.target.checked)} />
                              Mobile App Available
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={bankFeatFreeDebit} onChange={(e) => setBankFeatFreeDebit(e.target.checked)} />
                              Free Debit Card
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={bankFeatHighInterest} onChange={(e) => setBankFeatHighInterest(e.target.checked)} />
                              High Interest Yield
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={bankFeatZeroBalance} onChange={(e) => setBankFeatZeroBalance(e.target.checked)} />
                              Zero Balance Demands
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DYNAMIC FORM: BROKERS */}
                    {activeSelectType === "brokers" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Depository Partner</label>
                            <input type="text" placeholder="e.g. CDSL, Self-Clearing" value={brokerDepository} onChange={(e) => setBrokerDepository(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Account Opening Fees</label>
                            <input type="text" value={brokerChargeOpening} onChange={(e) => setBrokerChargeOpening(e.target.value)} className="input-field" />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Annual AMC Charges</label>
                            <input type="text" value={brokerChargeAmc} onChange={(e) => setBrokerChargeAmc(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Call & Trade Fee</label>
                            <input type="text" value={brokerChargeCallTrade} onChange={(e) => setBrokerChargeCallTrade(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>dp charges</label>
                            <input type="text" placeholder="₹13.5 per company debit" className="input-field" disabled value="₹13.5 + GST" />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Delivery Brokerage</label>
                            <input type="text" value={brokerageDelivery} onChange={(e) => setBrokerageDelivery(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Intraday Brokerage</label>
                            <input type="text" value={brokerageIntraday} onChange={(e) => setBrokerageIntraday(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Futures Trading</label>
                            <input type="text" value={brokerageFutures} onChange={(e) => setBrokerageFutures(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Options Brokerage</label>
                            <input type="text" value={brokerageOptions} onChange={(e) => setBrokerageOptions(e.target.value)} className="input-field" />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Delivery Margin</label>
                            <input type="text" value={brokerMarginDelivery} onChange={(e) => setBrokerMarginDelivery(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Intraday Margin</label>
                            <input type="text" value={brokerMarginIntraday} onChange={(e) => setBrokerMarginIntraday(e.target.value)} className="input-field" />
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Trading Segments</label>
                          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={brokerSegEquity} onChange={(e) => setBrokerSegEquity(e.target.checked)} />
                              Equity Demat
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={brokerSegCommodity} onChange={(e) => setBrokerSegCommodity(e.target.checked)} />
                              Commodities
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={brokerSegCurrency} onChange={(e) => setBrokerSegCurrency(e.target.checked)} />
                              Currencies
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={brokerSegFutures} onChange={(e) => setBrokerSegFutures(e.target.checked)} />
                              Futures
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={brokerSegOptions} onChange={(e) => setBrokerSegOptions(e.target.checked)} />
                              Options
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DYNAMIC FORM: CREDIT CARDS */}
                    {activeSelectType === "cards" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Card Best For</label>
                            <input type="text" placeholder="e.g. Travel, Shopping" value={cardBestFor} onChange={(e) => setCardBestFor(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Card Issuer</label>
                            <input type="text" placeholder="e.g. Axis Bank" value={cardIssuer} onChange={(e) => setCardIssuer(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Issuer Code suffix</label>
                            <input type="text" placeholder="e.g. axis" value={cardIssuerCode} onChange={(e) => setCardIssuerCode(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Card Network</label>
                            <input type="text" placeholder="e.g. Mastercard" value={cardNetwork} onChange={(e) => setCardNetwork(e.target.value)} className="input-field" />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Joining Fee</label>
                            <input type="text" value={cardChargeJoining} onChange={(e) => setCardChargeJoining(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Annual Fee</label>
                            <input type="text" value={cardChargeAnnual} onChange={(e) => setCardChargeAnnual(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Card APR (Interest Rate)</label>
                            <input type="text" value={cardChargeApr} onChange={(e) => setCardChargeApr(e.target.value)} className="input-field" />
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Card Perks Details (line separated list)</label>
                          <textarea rows={2} placeholder="e.g. 5% cashback on online purchases" value={cardPerksDetails} onChange={(e) => setCardPerksDetails(e.target.value)} className="input-field" style={{ fontFamily: "inherit" }} />
                        </div>

                        <div>
                          <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Card Features Checklist</label>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem" }}>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cardFeatWelcomeBonus} onChange={(e) => setCardFeatWelcomeBonus(e.target.checked)} />
                              Welcome Bonus
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cardFeatTravel} onChange={(e) => setCardFeatTravel(e.target.checked)} />
                              Travel Benefits
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cardFeatFuel} onChange={(e) => setCardFeatFuel(e.target.checked)} />
                              Fuel Waivers
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cardFeatRewards} onChange={(e) => setCardFeatRewards(e.target.checked)} />
                              Accelerated Rewards
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cardFeatShopping} onChange={(e) => setCardFeatShopping(e.target.checked)} />
                              Shopping Discounts
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cardFeatCashback} onChange={(e) => setCardFeatCashback(e.target.checked)} />
                              Cashback Returns
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cardFeatDining} onChange={(e) => setCardFeatDining(e.target.checked)} />
                              Dining Offers
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cardFeatInsurance} onChange={(e) => setCardFeatInsurance(e.target.checked)} />
                              Insurance Covers
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cardFeatLounge} onChange={(e) => setCardFeatLounge(e.target.checked)} />
                              Airport Lounges
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DYNAMIC FORM: PAYMENT APPS */}
                    {activeSelectType === "payments" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Wallet Loading Fee</label>
                            <input type="text" value={payChargeWallet} onChange={(e) => setPayChargeWallet(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Bank Transfer Fee</label>
                            <input type="text" value={payChargeBank} onChange={(e) => setPayChargeBank(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Card Payment Fee</label>
                            <input type="text" value={payChargeCards} onChange={(e) => setPayChargeCards(e.target.value)} className="input-field" />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Daily Transaction Limit</label>
                            <input type="text" value={payLimitDaily} onChange={(e) => setPayLimitDaily(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Single Transaction Ticket Cap</label>
                            <input type="text" value={payLimitTransaction} onChange={(e) => setPayLimitTransaction(e.target.value)} className="input-field" />
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Payment App Features</label>
                          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={payFeatUpi} onChange={(e) => setPayFeatUpi(e.target.checked)} />
                              UPI Payment Support
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={payFeatWallet} onChange={(e) => setPayFeatWallet(e.target.checked)} />
                              Native Prepaid Wallet
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={payFeatBankTransfer} onChange={(e) => setPayFeatBankTransfer(e.target.checked)} />
                              Direct Bank Transfer
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={payFeatCards} onChange={(e) => setPayFeatCards(e.target.checked)} />
                              Link Credit/Debit Cards
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={payFeatInternational} onChange={(e) => setPayFeatInternational(e.target.checked)} />
                              International Payments
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DYNAMIC FORM: CRYPTO APPS */}
                    {activeSelectType === "crypto" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Maker Fee</label>
                            <input type="text" value={cryptoChargeMaker} onChange={(e) => setCryptoChargeMaker(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Taker Fee</label>
                            <input type="text" value={cryptoChargeTaker} onChange={(e) => setCryptoChargeTaker(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Withdrawal Fee Suffix</label>
                            <input type="text" value={cryptoChargeWithdrawal} onChange={(e) => setCryptoChargeWithdrawal(e.target.value)} className="input-field" />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Daily Withdrawal limit</label>
                            <input type="text" value={cryptoLimitWithdrawal} onChange={(e) => setCryptoLimitWithdrawal(e.target.value)} className="input-field" />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Minimum Deposit amount</label>
                            <input type="text" value={cryptoLimitMinDeposit} onChange={(e) => setCryptoLimitMinDeposit(e.target.value)} className="input-field" />
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Crypto Features Checklist</label>
                          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cryptoFeatSpot} onChange={(e) => setCryptoFeatSpot(e.target.checked)} />
                              Spot Trading
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cryptoFeatFutures} onChange={(e) => setCryptoFeatFutures(e.target.checked)} />
                              Futures / Margins
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cryptoFeatStaking} onChange={(e) => setCryptoFeatStaking(e.target.checked)} />
                              Staking Yields
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cryptoFeatWallet} onChange={(e) => setCryptoFeatWallet(e.target.checked)} />
                              Private Wallet Keys
                            </label>
                            <label style={{ fontSize: "0.8rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                              <input type="checkbox" checked={cryptoFeatFiat} onChange={(e) => setCryptoFeatFiat(e.target.checked)} />
                              Fiat Card Deposits
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid var(--border-color)", margin: "0.5rem 0" }} />

                  {/* --- SECTION 3: Detailed Review Writing Fields (The Blog / Review Article) --- */}
                  <div>
                    <h4 style={{ fontSize: "0.85rem", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.03em", fontWeight: 700, marginBottom: "1rem" }}>
                      Section 3: Detailed Editorial Review (Blog Post content)
                    </h4>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Charges Rating Score (1-5)</label>
                        <input type="number" step="0.1" value={revRating1} onChange={(e) => setRevRating1(e.target.value)} className="input-field" min="1" max="5" />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Usability Rating Score (1-5)</label>
                        <input type="number" step="0.1" value={revRating2} onChange={(e) => setRevRating2(e.target.value)} className="input-field" min="1" max="5" />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem" }}>Service Rating Score (1-5)</label>
                        <input type="number" step="0.1" value={revRating3} onChange={(e) => setRevRating3(e.target.value)} className="input-field" min="1" max="5" />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>Pros List (Enter one bullet per line)</label>
                        <textarea rows={3} placeholder="e.g. Free virtual card&#10;Zero balance requirement" value={prodPros} onChange={(e) => setProdPros(e.target.value)} className="input-field" style={{ fontFamily: "inherit" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.35rem" }}>Cons List (Enter one bullet per line)</label>
                        <textarea rows={3} placeholder="e.g. Physical card is charged&#10;No physical branch network" value={prodCons} onChange={(e) => setProdCons(e.target.value)} className="input-field" style={{ fontFamily: "inherit" }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem", fontWeight: 700 }}>Review Part 1: Onboarding / Interface</label>
                        <textarea rows={4} placeholder="Review text regarding sign up, onboarding KYC experience, and user interface..." value={revBlock1} onChange={(e) => setRevBlock1(e.target.value)} className="input-field" style={{ fontFamily: "inherit" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem", fontWeight: 700 }}>Review Part 2: Fees & Service Charges</label>
                        <textarea rows={4} placeholder="Detailed analysis review of monthly fees, penalty charges, and FX commissions..." value={revBlock2} onChange={(e) => setRevBlock2(e.target.value)} className="input-field" style={{ fontFamily: "inherit" }} />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem", fontWeight: 700 }}>Review Part 3: Key Features & Usability</label>
                        <textarea rows={4} placeholder="Expert assessment of app features, debit card limits, investment options, or transaction speeds..." value={revBlock3} onChange={(e) => setRevBlock3(e.target.value)} className="input-field" style={{ fontFamily: "inherit" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.72rem", color: "var(--text-secondary)", display: "block", marginBottom: "0.25rem", fontWeight: 700 }}>Review Part 4: Helpdesk & Security Shields</label>
                        <textarea rows={4} placeholder="Evaluation of customer support desk response times, regulatory licensing safety, and 2FA logins..." value={revBlock4} onChange={(e) => setRevBlock4(e.target.value)} className="input-field" style={{ fontFamily: "inherit" }} />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 2rem", fontSize: "0.85rem", alignSelf: "flex-end", marginTop: "1rem" }}>
                    🚀 Publish Product & Detailed Review
                  </button>
                </form>
              </div>

              {/* Listings Catalog table */}
              <div className="card" style={{ padding: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--text-primary)" }}>
                  📂 Current Catalog Listings — Database
                </h3>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-color)", opacity: 0.8 }}>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Name</th>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Slug</th>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Country</th>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase" }}>Status</th>
                        <th style={{ color: "var(--text-secondary)", fontSize: "0.75rem", padding: "1rem 0.5rem", fontWeight: "700", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(
                        activeSelectType === "banks" ? customBanks :
                        activeSelectType === "brokers" ? customBrokers :
                        activeSelectType === "cards" ? customCards :
                        activeSelectType === "payments" ? customPayments :
                        customCryptos
                      ).map((item: any) => (
                        <tr key={item.id || item.slug} style={{ borderBottom: "1px solid var(--border-color)" }}>
                          <td style={{ padding: "1.1rem 0.5rem" }}>
                            <strong style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>{item.name}</strong>
                            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", maxWidth: "350px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.summary || item.description}</div>
                          </td>
                          <td style={{ padding: "1.1rem 0.5rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                            <code>{item.slug}</code>
                          </td>
                          <td style={{ padding: "1.1rem 0.5rem", fontSize: "0.82rem", color: "var(--text-primary)" }}>
                            {item.countrySlug || item.country_slug || item.country || "—"}
                          </td>
                          <td style={{ padding: "1.1rem 0.5rem" }}>
                            <span className={`badge ${item.status === "approved" ? "badge-success" : "badge-warning"}`} style={{ fontSize: "0.6rem" }}>
                              {item.status || "approved"}
                            </span>
                          </td>
                          <td style={{ padding: "1.1rem 0.5rem", textAlign: "right" }}>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", flexWrap: "wrap" }}>
                              {item.status === "pending" && (
                                <>
                                  <button
                                    onClick={() => handleApproveRejectProduct(String(item.id), "approved", activeSelectType)}
                                    className="btn btn-secondary"
                                    style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", borderRadius: "6px", color: "var(--success)", borderColor: "rgba(16, 185, 129, 0.25)" }}
                                  >
                                    ✓ Approve
                                  </button>
                                  <button
                                    onClick={() => handleApproveRejectProduct(String(item.id), "rejected", activeSelectType)}
                                    className="btn btn-secondary"
                                    style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", borderRadius: "6px", color: "var(--warning)", borderColor: "rgba(245, 158, 11, 0.25)" }}
                                  >
                                    ✕ Reject
                                  </button>
                                </>
                              )}
                              <button
                                 onClick={() => { setViewItem(item); setViewItemType(activeSelectType); }}
                                 className="btn btn-secondary"
                                 style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", borderRadius: "6px" }}
                               >
                                 👁 View
                               </button>
                               <button
                                 onClick={() => { setEditItem(item); setEditItemType(activeSelectType); }}
                                 className="btn btn-secondary"
                                 style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", borderRadius: "6px" }}
                               >
                                 ✏️ Edit
                               </button>
                              <button
                                onClick={() => handleDeleteProduct(String(item.id), activeSelectType)}
                                className="btn btn-secondary"
                                style={{ padding: "0.3rem 0.65rem", fontSize: "0.72rem", borderRadius: "6px", color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}
                              >
                                🗑 Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {(
                        activeSelectType === "banks" ? customBanks :
                        activeSelectType === "brokers" ? customBrokers :
                        activeSelectType === "cards" ? customCards :
                        activeSelectType === "payments" ? customPayments :
                        customCryptos
                      ).length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center", color: "var(--text-secondary)", padding: "2rem" }}>
                            No listings found in database for this category.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* ── TAB: SYSTEM CONFIG ── */}
          {activeTab === "config" && (
            <div className="card" style={{ maxWidth: "600px", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>⚙️ System Settings & Reset Cache</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                Manage local listings caching, restore seeded databases, or trigger local schema migrations.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ background: "var(--spec-bg)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-color)", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  <strong>Important Notice:</strong> Seeding modifications and user permissions in the database are permanent on the Neon server. Resetting system caches will only restore IPOs and select custom catalogs back to their seeded state on your client local cache.
                </div>

                <button 
                  onClick={handleRestoreSeeds} 
                  className="btn btn-secondary" 
                  style={{ width: "100%", color: "var(--danger)", border: "1px solid rgba(239, 68, 68, 0.2)", background: "rgba(239, 68, 68, 0.05)", fontWeight: 700 }}
                >
                  ♻️ Clear Cache & Restore Seed Catalogs
                </button>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ── VIEW DETAILS MODAL ── */}
      {viewItem && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 1000,
          display: "flex", justifyContent: "center", alignItems: "center",
          backdropFilter: "blur(5px)", padding: "1rem"
        }}>
          <div style={{
            backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)",
            borderRadius: "16px", padding: "2rem", maxWidth: "800px", width: "100%",
            maxHeight: "90vh", overflowY: "auto", position: "relative"
          }}>
            <button 
              onClick={() => setViewItem(null)} 
              style={{
                position: "absolute", top: "1rem", right: "1rem", background: "none",
                border: "none", color: "var(--text-secondary)", fontSize: "1.5rem",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem", color: "var(--primary)" }}>
              👁 View Details: {viewItem.name}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "0.88rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", background: "var(--spec-bg)", padding: "1rem", borderRadius: "8px" }}>
                <div><strong>Slug:</strong> <code>{viewItem.slug || viewItem.ticker}</code></div>
                <div><strong>Category/Type:</strong> {viewItem.type || viewItem.segment || "IPO Submission"}</div>
                <div><strong>Status:</strong> <span className={`badge ${viewItem.status === "approved" || viewItem.status === "Approved" ? "badge-success" : "badge-warning"}`}>{viewItem.status}</span></div>
                <div><strong>Submitted By:</strong> {viewItem.addedBy || viewItem.authorEmail || "seed"}</div>
              </div>

              {viewItemType === "ipos" ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                  <div><strong>Price Band:</strong> {viewItem.priceBand}</div>
                  <div><strong>Size:</strong> {viewItem.size}</div>
                  <div><strong>Lot Size:</strong> {viewItem.lotSize}</div>
                  <div><strong>GMP Forecast:</strong> {viewItem.gmpAmount} ({viewItem.gmp}%)</div>
                  <div><strong>Open Date:</strong> {viewItem.openDate}</div>
                  <div><strong>Close Date:</strong> {viewItem.closeDate}</div>
                </div>
              ) : (
                <>
                  <div>
                    <strong>Summary / Description:</strong>
                    <p style={{ marginTop: "0.25rem", color: "var(--text-secondary)" }}>{viewItem.summary || viewItem.description}</p>
                  </div>
                  
                  {viewItem.features && (
                    <div>
                      <strong>Features Checklist:</strong>
                      <ul style={{ margin: "0.25rem 0 0 1.25rem", padding: 0 }}>
                        {Object.entries(viewItem.features).map(([key, val]) => (
                          <li key={key} style={{ textTransform: "capitalize", color: val ? "var(--success)" : "var(--text-muted)" }}>
                            {key.replace(/([A-Z])/g, ' $1')}: {val ? "✓ Enabled" : "✗ Disabled"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {viewItem.charges && (
                    <div>
                      <strong>Fees & Charges:</strong>
                      <ul style={{ margin: "0.25rem 0 0 1.25rem", padding: 0 }}>
                        {Object.entries(viewItem.charges).map(([key, val]: any) => (
                          <li key={key} style={{ textTransform: "capitalize" }}>
                            <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {val}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(viewItem.pros && viewItem.pros.length > 0) && (
                    <div>
                      <strong>Pros:</strong>
                      <ul style={{ margin: "0.25rem 0 0 1.25rem", color: "var(--success)" }}>
                        {viewItem.pros.map((pro: string, idx: number) => <li key={idx}>{pro}</li>)}
                      </ul>
                    </div>
                  )}

                  {(viewItem.cons && viewItem.cons.length > 0) && (
                    <div>
                      <strong>Cons:</strong>
                      <ul style={{ margin: "0.25rem 0 0 1.25rem", color: "var(--danger)" }}>
                        {viewItem.cons.map((con: string, idx: number) => <li key={idx}>{con}</li>)}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setViewItem(null)} className="btn btn-secondary" style={{ padding: "0.5rem 1.5rem" }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT DETAILS MODAL ── */}
      {editItem && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 1000,
          display: "flex", justifyContent: "center", alignItems: "center",
          backdropFilter: "blur(5px)", padding: "1rem"
        }}>
          <form onSubmit={handleSaveEdit} style={{
            backgroundColor: "var(--card-bg)", border: "1px solid var(--border-color)",
            borderRadius: "16px", padding: "2rem", maxWidth: "800px", width: "100%",
            maxHeight: "90vh", overflowY: "auto", position: "relative",
            display: "flex", flexDirection: "column", gap: "1.25rem"
          }}>
            <button 
              type="button"
              onClick={() => setEditItem(null)} 
              style={{
                position: "absolute", top: "1rem", right: "1rem", background: "none",
                border: "none", color: "var(--text-secondary)", fontSize: "1.5rem",
                cursor: "pointer"
              }}
            >
              ✕
            </button>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)" }}>
              ✏️ Edit Details: {editItem.name}
            </h2>

            {/* General Shared Inputs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700 }}>Name</label>
                <input type="text" value={editItem.name || ""} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} className="input-field" required />
              </div>
              {editItemType === "ipos" ? (
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700 }}>Ticker</label>
                  <input type="text" value={editItem.ticker || ""} onChange={(e) => setEditItem({ ...editItem, ticker: e.target.value })} className="input-field" required />
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 700 }}>Slug</label>
                  <input type="text" value={editItem.slug || ""} onChange={(e) => setEditItem({ ...editItem, slug: e.target.value })} className="input-field" required />
                </div>
              )}
            </div>

            {/* IPO Fields */}
            {editItemType === "ipos" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Segment</label>
                    <select value={editItem.segment || "Mainboard"} onChange={(e) => setEditItem({ ...editItem, segment: e.target.value })} className="input-field">
                      <option value="Mainboard">Mainboard</option>
                      <option value="SME">SME</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Price Band</label>
                    <input type="text" value={editItem.priceBand || ""} onChange={(e) => setEditItem({ ...editItem, priceBand: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Issue Size</label>
                    <input type="text" value={editItem.size || ""} onChange={(e) => setEditItem({ ...editItem, size: e.target.value })} className="input-field" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Lot Size</label>
                    <input type="number" value={editItem.lotSize || 1} onChange={(e) => setEditItem({ ...editItem, lotSize: parseInt(e.target.value) || 1 })} className="input-field" />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>GMP Forecast Amount</label>
                    <input type="text" value={editItem.gmpAmount || ""} onChange={(e) => setEditItem({ ...editItem, gmpAmount: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>GMP Forecast %</label>
                    <input type="number" value={editItem.gmp || 0} onChange={(e) => setEditItem({ ...editItem, gmp: parseInt(e.target.value) || 0 })} className="input-field" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Open Date</label>
                    <input type="date" value={editItem.openDate || ""} onChange={(e) => setEditItem({ ...editItem, openDate: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Close Date</label>
                    <input type="date" value={editItem.closeDate || ""} onChange={(e) => setEditItem({ ...editItem, closeDate: e.target.value })} className="input-field" />
                  </div>
                </div>
              </div>
            )}

            {/* Product Fields */}
            {editItemType !== "ipos" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Summary / Description</label>
                  <textarea rows={2} value={editItem.summary || editItem.description || ""} onChange={(e) => setEditItem({ ...editItem, summary: e.target.value, description: e.target.value })} className="input-field" style={{ fontFamily: "inherit" }} required />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Rating</label>
                    <input type="number" step="0.1" value={editItem.rating || editItem.overallRating || "4.0"} onChange={(e) => setEditItem({ ...editItem, rating: parseFloat(e.target.value) || 4.0, overallRating: parseFloat(e.target.value) || 4.0 })} className="input-field" />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Users/Clients</label>
                    <input type="text" value={editItem.activeUsers || editItem.activeClients || ""} onChange={(e) => setEditItem({ ...editItem, activeUsers: e.target.value, activeClients: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Category Type (Label)</label>
                    <input type="text" value={editItem.type || ""} onChange={(e) => setEditItem({ ...editItem, type: e.target.value })} className="input-field" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Pros (one per line)</label>
                    <textarea rows={2} value={editItem.pros ? editItem.pros.join("\n") : ""} onChange={(e) => setEditItem({ ...editItem, pros: e.target.value.split("\n") })} className="input-field" style={{ fontFamily: "inherit" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Cons (one per line)</label>
                    <textarea rows={2} value={editItem.cons ? editItem.cons.join("\n") : ""} onChange={(e) => setEditItem({ ...editItem, cons: e.target.value.split("\n") })} className="input-field" style={{ fontFamily: "inherit" }} />
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
              <button type="button" onClick={() => setEditItem(null)} className="btn btn-secondary" style={{ padding: "0.5rem 1.5rem" }}>Cancel</button>
              <button type="submit" className="btn btn-primary" style={{ padding: "0.5rem 1.5rem" }}>Save Changes</button>
            </div>
          </form>
        </div>
      )}

      {/* ── Dynamic Light/Dark Mode Contrast Styling ── */}
      <style>{`
        .admin-content-pane {
          background: #090d16; /* Dark mode fallback */
        }
        [data-theme="light"] .admin-content-pane {
          background: #f8fafc !important; /* Clean Slate-50 background for Light Mode */
        }
      `}</style>

    </div>
  );
}
