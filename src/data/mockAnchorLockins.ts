import { AnchorLockInItem } from "@/types/ipo";

export const MOCK_ANCHOR_LOCKINS: AnchorLockInItem[] = [
  {
    id: "a1",
    ipoName: "Hyundai Motor India Limited",
    slug: "hyundai-motor-india",
    category: "mainboard",
    listingDate: "2026-06-22",
    totalAnchorShares: 42400000,
    anchorAmountCr: 8315.0,
    lockIn30DaysDate: "2026-07-22",
    lockIn30DaysShares: 21200000,
    lockIn30DaysStatus: "Expiring Soon",
    lockIn90DaysDate: "2026-09-20",
    lockIn90DaysShares: 21200000,
    lockIn90DaysStatus: "Active"
  },
  {
    id: "a2",
    ipoName: "Swiggy Limited",
    slug: "swiggy-limited",
    category: "mainboard",
    listingDate: "2026-06-12",
    totalAnchorShares: 130500000,
    anchorAmountCr: 5085.0,
    lockIn30DaysDate: "2026-07-12",
    lockIn30DaysShares: 65250000,
    lockIn30DaysStatus: "Expired",
    lockIn90DaysDate: "2026-09-10",
    lockIn90DaysShares: 65250000,
    lockIn90DaysStatus: "Active"
  },
  {
    id: "a3",
    ipoName: "Waaree Energies Limited",
    slug: "waaree-energies",
    category: "mainboard",
    listingDate: "2026-05-22",
    totalAnchorShares: 8520000,
    anchorAmountCr: 1277.5,
    lockIn30DaysDate: "2026-06-21",
    lockIn30DaysShares: 4260000,
    lockIn30DaysStatus: "Expired",
    lockIn90DaysDate: "2026-08-20",
    lockIn90DaysShares: 4260000,
    lockIn90DaysStatus: "Expiring Soon"
  },
  {
    id: "a4",
    ipoName: "Shree Balaji (Mala) Textiles",
    slug: "shree-balaji-textiles",
    category: "sme",
    listingDate: "2026-07-29",
    totalAnchorShares: 1200000,
    anchorAmountCr: 8.4,
    lockIn30DaysDate: "2026-08-28",
    lockIn30DaysShares: 600000,
    lockIn30DaysStatus: "Active",
    lockIn90DaysDate: "2026-10-27",
    lockIn90DaysShares: 600000,
    lockIn90DaysStatus: "Active"
  }
];
