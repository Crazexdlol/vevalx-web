"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";

type ClaimStatus = "open" | "pending" | "completed";

type Claim = {
  claimNumber: string;
  owner: string;
  vehicle: string;
  vin: string;
  status: ClaimStatus;
};

const SAMPLE_CLAIMS: Claim[] = [
  {
    claimNumber: "CL-2024-0000004-LONGER-EXAMPLE",
    owner: "Caroline Bowman",
    vehicle: "2021 Tesla Model 3",
    vin: "5YJ3E1EA7MF123456",
    status: "open",
  },
  {
    claimNumber: "CL-2024-001",
    owner: "John Smith",
    vehicle: "2020 Toyota Camry",
    vin: "1HGBH41JXMN109186",
    status: "completed",
  },
  {
    claimNumber: "CL-2024-002",
    owner: "Jane Doe",
    vehicle: "2019 Honda Accord",
    vin: "5FNRL6H70MB123456",
    status: "pending",
  },
  {
    claimNumber: "CL-2024-003",
    owner: "Larry Fairley",
    vehicle: "2018 Ford F-150",
    vin: "1FTFW1E50JKD12345",
    status: "pending",
  },
];

type SortKey = keyof Claim;
type SortDir = "asc" | "desc";

function sortLabel(key: SortKey) {
  switch (key) {
    case "claimNumber":
      return "Claim #";
    case "owner":
      return "Owner";
    case "vehicle":
      return "Vehicle";
    case "vin":
      return "VIN";
    case "status":
      return "Status";
    default:
      return key;
  }
}

function MagnifierIcon() {
  // Plain simple magnifier (no emoji)
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("claimNumber");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // Local, editable data (so status changes persist on screen)
  const [claims, setClaims] = useState<Claim[]>(SAMPLE_CLAIMS);

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = claims.filter((c) => {
      if (!q) return true;
      return (
        c.claimNumber.toLowerCase().includes(q) ||
        c.owner.toLowerCase().includes(q) ||
        c.vehicle.toLowerCase().includes(q) ||
        c.vin.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      const av = String(a[sortKey]).toLowerCase();
      const bv = String(b[sortKey]).toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [claims, query, sortKey, sortDir]);

  function onHeaderClick(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function SortIndicator({ col }: { col: SortKey }) {
    if (sortKey !== col) return <span className="text-gray-300">▲</span>;
    return <span className="text-gray-600">{sortDir === "asc" ? "▲" : "▼"}</span>;
  }

  function updateStatus(claimNumber: string, nextStatus: ClaimStatus) {
    setClaims((prev) =>
      prev.map((c) => (c.claimNumber === claimNumber ? { ...c, status: nextStatus } : c))
    );
  }

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">Claims</h1>

        <button
          className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
          onClick={() => alert("New Claim clicked (we’ll wire this next)")}
        >
          <span className="text-lg leading-none">+</span>
          New Claim
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <MagnifierIcon />
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search claims..."
          className="w-full rounded-lg border bg-white py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="border-b bg-gray-50 text-gray-600">
            <tr>
              <th
                className="w-[260px] cursor-pointer px-4 py-3 text-center font-semibold hover:bg-gray-100"
                onClick={() => onHeaderClick("claimNumber")}
              >
                <div className="flex items-center gap-2">
                  Claim #
                  <SortIndicator col="claimNumber" />
                </div>
              </th>

              <th
                className="cursor-pointer px-4 py-3 font-semibold hover:bg-gray-100"
                onClick={() => onHeaderClick("owner")}
              >
                <div className="flex items-center gap-2">
                  Owner
                  <SortIndicator col="owner" />
                </div>
              </th>

              <th
                className="cursor-pointer px-4 py-3 font-semibold hover:bg-gray-100"
                onClick={() => onHeaderClick("vehicle")}
              >
                <div className="flex items-center gap-2">
                  Vehicle
                  <SortIndicator col="vehicle" />
                </div>
              </th>

              <th
                className="cursor-pointer px-4 py-3 font-semibold hover:bg-gray-100"
                onClick={() => onHeaderClick("vin")}
              >
                <div className="flex items-center gap-2">
                  VIN
                  <SortIndicator col="vin" />
                </div>
              </th>

              <th
                className="w-[160px] cursor-pointer px-4 py-3 text-center font-semibold hover:bg-gray-100"
                onClick={() => onHeaderClick("status")}
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIndicator col="status" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredAndSorted.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No claims found.
                </td>
              </tr>
            ) : (
              filteredAndSorted.map((c) => (
                <tr key={c.claimNumber} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-3 text-center font-medium text-gray-900">
                    <Link
                      href={`/claims/${encodeURIComponent(c.claimNumber)}`}
                      className="mx-auto block max-w-[240px] break-all text-blue-700 underline-offset-2 hover:underline"
                      title="Open claim"
                    >
                      {c.claimNumber}
                    </Link>
                  </td>

                  <td className="px-4 py-3">{c.owner}</td>
                  <td className="px-4 py-3">{c.vehicle}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">{c.vin}</td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge
                      status={c.status}
                      onChange={(next) => updateStatus(c.claimNumber, next)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
