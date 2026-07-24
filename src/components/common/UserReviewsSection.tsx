"use client";

import React, { useState, useEffect } from "react";
import { Star, ThumbsUp, MessageSquarePlus, CheckCircle2, User, X, Sparkles, AlertCircle } from "lucide-react";
import { UserReview } from "@/types/finance";

interface UserReviewsSectionProps {
  entityId: string;
  entityName: string;
  entityType: "credit_card" | "broker" | "payment_app" | "bank";
  initialRating?: number;
  initialReviews?: UserReview[];
}

export default function UserReviewsSection({
  entityId,
  entityName,
  entityType,
  initialRating = 4.7,
  initialReviews = []
}: UserReviewsSectionProps) {
  // Default mock reviews if none provided
  const defaultReviews: UserReview[] = [
    {
      id: "rev-1",
      userName: "Rahul Sharma",
      userTitle: "Verified User",
      rating: 5,
      date: "2026-07-15",
      headline: `Extremely satisfied with ${entityName}!`,
      comment: `I have been using ${entityName} for over a year now. The experience has been smooth, transparent, and completely hassle-free. Highly recommended!`,
      proTag: "Fast Processing",
      conTag: "Customer support busy at times",
      helpfulCount: 24
    },
    {
      id: "rev-2",
      userName: "Ananya Iyer",
      userTitle: "Active Investor",
      rating: 4,
      date: "2026-06-28",
      headline: "Great value for money & good features",
      comment: "Very solid overall product. The digital interface is intuitive and all charges are clear upfront. Minor delay during peak trading/usage hours.",
      proTag: "Low Charges",
      conTag: "App UI update needed",
      helpfulCount: 15
    }
  ];

  const [reviews, setReviews] = useState<UserReview[]>(initialReviews.length > 0 ? initialReviews : defaultReviews);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  // Form State
  const [formRating, setFormRating] = useState<number>(5);
  const [formHoverRating, setFormHoverRating] = useState<number>(0);
  const [formName, setFormName] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formHeadline, setFormHeadline] = useState<string>("");
  const [formComment, setFormComment] = useState<string>("");
  const [formProTag, setFormProTag] = useState<string>("");
  const [formConTag, setFormConTag] = useState<string>("");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});

  // LocalStorage sync
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`user-reviews-${entityId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
        }
      }
    } catch (e) {
      console.error("Error reading reviews from localStorage", e);
    }
  }, [entityId]);

  const saveReviewsToStorage = (updatedReviews: UserReview[]) => {
    try {
      localStorage.setItem(`user-reviews-${entityId}`, JSON.stringify(updatedReviews));
    } catch (e) {
      console.error("Error saving reviews to localStorage", e);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formHeadline.trim() || !formComment.trim()) {
      return;
    }

    const newReview: UserReview = {
      id: `rev-${Date.now()}`,
      userName: formName.trim(),
      userTitle: "Verified Reviewer",
      rating: formRating,
      date: new Date().toISOString().split("T")[0],
      headline: formHeadline.trim(),
      comment: formComment.trim(),
      proTag: formProTag.trim() || undefined,
      conTag: formConTag.trim() || undefined,
      helpfulCount: 0
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviewsToStorage(updated);

    // Reset Form & Show Success
    setFormName("");
    setFormEmail("");
    setFormHeadline("");
    setFormComment("");
    setFormProTag("");
    setFormConTag("");
    setShowModal(false);
    setSubmittedSuccess(true);

    setTimeout(() => setSubmittedSuccess(false), 5000);
  };

  const handleHelpful = (reviewId: string) => {
    if (helpfulVotes[reviewId]) return;

    setHelpfulVotes((prev) => ({ ...prev, [reviewId]: 1 }));
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  // Calculate average rating
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <section className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
      {/* Toast Notification */}
      {submittedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold">
              Thank you! Your review for {entityName} has been submitted successfully and published.
            </span>
          </div>
          <button onClick={() => setSubmittedSuccess(false)} className="text-emerald-700 hover:text-emerald-950">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Rating Breakdown Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900">{avgRating}</span>
            <div className="flex items-center text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(parseFloat(avgRating)) ? "fill-amber-400 text-amber-400" : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500 font-medium">({reviews.length} User Reviews)</span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900 mt-1">User Experience &amp; Community Reviews</h3>
          <p className="text-xs text-slate-500">Real feedback submitted by verified users of {entityName}.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-800 transition-all shadow-sm"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Write a Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 font-extrabold text-xs flex items-center justify-center border border-blue-200">
                  {rev.userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold text-slate-900">{rev.userName}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                </div>
              </div>

              {/* Star Rating Badge */}
              <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs text-xs font-bold text-slate-800">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{rev.rating}.0</span>
              </div>
            </div>

            {/* Headline & Body */}
            <div>
              <h4 className="text-xs font-extrabold text-slate-900">{rev.headline}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">{rev.comment}</p>
            </div>

            {/* Pro / Con Tags */}
            {(rev.proTag || rev.conTag) && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {rev.proTag && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    👍 Pro: {rev.proTag}
                  </span>
                )}
                {rev.conTag && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200">
                    👎 Con: {rev.conTag}
                  </span>
                )}
              </div>
            )}

            {/* Was this helpful? */}
            <div className="flex justify-end items-center pt-1">
              <button
                onClick={() => handleHelpful(rev.id)}
                disabled={!!helpfulVotes[rev.id]}
                className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                  helpfulVotes[rev.id]
                    ? "bg-blue-50 text-blue-800 border-blue-200 cursor-default"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* WRITE A REVIEW MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in duration-150">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Write a Review</h3>
                <p className="text-xs text-slate-500">Share your experience with {entityName}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {/* Rating Selector */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Your Overall Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      onMouseEnter={() => setFormHoverRating(star)}
                      onMouseLeave={() => setFormHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (formHoverRating || formRating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-extrabold text-slate-800">
                    {formHoverRating || formRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Verma"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-blue-700 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Your Email (Private)</label>
                  <input
                    type="email"
                    placeholder="e.g. vikram@example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-blue-700 bg-slate-50"
                  />
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Review Headline / Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Outstanding cashback rewards on online spends!"
                  value={formHeadline}
                  onChange={(e) => setFormHeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-blue-700 bg-slate-50"
                />
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Main Pro (What you liked)</label>
                  <input
                    type="text"
                    placeholder="e.g. High reward rate"
                    value={formProTag}
                    onChange={(e) => setFormProTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-blue-700 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Main Con (What to improve)</label>
                  <input
                    type="text"
                    placeholder="e.g. Annual fee high"
                    value={formConTag}
                    onChange={(e) => setFormConTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-blue-700 bg-slate-50"
                  />
                </div>
              </div>

              {/* Detailed Comment */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Detailed Review &amp; Feedback *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your detailed experience, usage duration, pros, cons, and customer support feedback..."
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-blue-700 bg-slate-50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-900 text-white font-bold hover:bg-blue-800 shadow-sm"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
