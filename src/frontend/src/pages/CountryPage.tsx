import { Link, useParams } from "@tanstack/react-router";
import { ArrowRight, Building2, FileText, Shield } from "lucide-react";
import { getCountryById } from "../data/countries";

export default function CountryPage() {
  const { countryId } = useParams({ strict: false }) as { countryId?: string };
  const country = getCountryById(countryId || "");

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#0A3D62" }}>
            Country not found
          </h2>
          <Link to="/" className="text-sm" style={{ color: "#16A085" }}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const tierColors: Record<
    number,
    { bg: string; text: string; label: string }
  > = {
    1: { bg: "#0A3D62", text: "#F1C40F", label: "Tier 1 — Premium Market" },
    2: { bg: "#16A085", text: "white", label: "Tier 2 — Growth Market" },
    3: { bg: "#64748b", text: "white", label: "Tier 3 — Emerging Market" },
  };
  const tc = tierColors[country.tier];

  const distSteps = [
    "Indian Manufacturer",
    "African Importer",
    "National Distributor",
    "Pharmacy Chain",
    "Retail Pharmacy",
  ];

  return (
    <div>
      <div
        style={{ backgroundColor: "#0A3D62" }}
        className="py-12 px-4 sm:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="text-blue-300 text-xs hover:text-white mb-4 inline-flex items-center gap-1"
          >
            ← Home
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{
                  backgroundColor:
                    tc.bg === "#0A3D62"
                      ? "rgba(241,196,15,0.2)"
                      : "rgba(255,255,255,0.2)",
                  color: tc.text,
                }}
              >
                {tc.label}
              </span>
              <h1 className="text-4xl font-bold text-white mb-2">
                {country.name}
              </h1>
              <p className="text-blue-200 text-sm">
                Pharmaceutical Market Intelligence Report
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-5 text-center">
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: "#F1C40F" }}
              >
                ₹{country.price.toLocaleString("en-IN")}
              </div>
              <div className="text-blue-200 text-xs mb-4">
                Country Intelligence Report
              </div>
              <Link
                to={`/payment/country-${countryId}` as any}
                className="block px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90"
                style={{ backgroundColor: "#F1C40F", color: "#0A3D62" }}
              >
                Buy Full Report
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-10">
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-3" style={{ color: "#0A3D62" }}>
            Market Overview
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {country.marketOverview}
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#0A3D62" }}>
            Most Demanded OTC Medicines
          </h2>
          <div className="flex flex-wrap gap-2">
            {country.demandedMedicines.map((med) => (
              <span
                key={med}
                className="px-3 py-1.5 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: "#E8F4F8",
                  color: "#0A3D62",
                  border: "1px solid #b3d4e8",
                }}
              >
                {med}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-1" style={{ color: "#0A3D62" }}>
            Price Reference Table (INR)
          </h2>
          <p className="text-xs text-gray-400 mb-5">
            * Prices vary by brand, registration status, and import volumes
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#0A3D62" }}>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    Medicine
                  </th>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    Export Price (India)
                  </th>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    Distributor Price
                  </th>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    Retail Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {country.priceTable.map((row, i) => (
                  <tr
                    key={row.medicine}
                    style={{
                      backgroundColor: i % 2 === 0 ? "white" : "#F8FAFC",
                    }}
                  >
                    <td
                      className="px-4 py-3 font-medium"
                      style={{ color: "#2C3E50" }}
                    >
                      {row.medicine}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#16A085" }}>
                      {row.exportPrice}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {row.distributorPrice}
                    </td>
                    <td
                      className="px-4 py-3 font-semibold"
                      style={{ color: "#0A3D62" }}
                    >
                      {row.retailPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Prices shown are for 10-tablet/sachet packs unless noted. Prices
            vary by brand and registration status.
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4" style={{ color: "#0A3D62" }}>
            Competitor Brands
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#16A085" }}>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    Brand
                  </th>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    Company
                  </th>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    Origin
                  </th>
                </tr>
              </thead>
              <tbody>
                {country.competitorBrands.map((brand, i) => (
                  <tr
                    key={brand.brand}
                    style={{
                      backgroundColor: i % 2 === 0 ? "white" : "#F8FAFC",
                    }}
                  >
                    <td
                      className="px-4 py-3 font-semibold"
                      style={{ color: "#0A3D62" }}
                    >
                      {brand.brand}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{brand.company}</td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: "#F0F7FF", color: "#0A3D62" }}
                      >
                        {brand.origin}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-5" style={{ color: "#0A3D62" }}>
            Distribution Structure
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-wrap">
            {distSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-center"
                  style={{
                    backgroundColor: "#E8F4F8",
                    color: "#0A3D62",
                    border: "1px solid #b3d4e8",
                    minWidth: "140px",
                  }}
                >
                  {step}
                </div>
                {i < distSteps.length - 1 && (
                  <ArrowRight
                    size={16}
                    style={{ color: "#16A085" }}
                    className="flex-shrink-0"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-5">
            <h3
              className="text-sm font-semibold mb-2"
              style={{ color: "#0A3D62" }}
            >
              Key Pharmacy Chains
            </h3>
            <div className="flex flex-wrap gap-2">
              {country.pharmacyChains.map((chain) => (
                <span
                  key={chain}
                  className="text-xs px-3 py-1.5 rounded"
                  style={{
                    backgroundColor: "#F5F7FA",
                    color: "#475569",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <Building2 size={10} className="inline mr-1" />
                  {chain}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-5" style={{ color: "#0A3D62" }}>
            Regulatory Requirements
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <Shield
                  size={20}
                  style={{ color: "#16A085" }}
                  className="mt-0.5 flex-shrink-0"
                />
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">
                    Regulatory Authority
                  </div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "#0A3D62" }}
                  >
                    {country.regulatoryAuthority}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <FileText
                  size={20}
                  style={{ color: "#16A085" }}
                  className="mt-0.5 flex-shrink-0"
                />
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">
                    Typical Registration Time
                  </div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "#0A3D62" }}
                  >
                    {country.registrationTime}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-2">
                  Estimated Registration Cost
                </div>
                <div className="text-xl font-bold" style={{ color: "#16A085" }}>
                  {country.registrationCost}
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-2">
                Required Documents
              </div>
              <ul className="space-y-1.5">
                {country.requiredDocuments.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span
                      className="text-xs mt-0.5"
                      style={{ color: "#16A085" }}
                    >
                      •
                    </span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div
          className="rounded-xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #0A3D62, #16A085)" }}
        >
          <h3 className="text-xl font-bold text-white mb-2">
            Get the Full {country.name} Intelligence Report
          </h3>
          <p className="text-blue-100 text-sm mb-6">
            Includes complete distributor contacts, detailed regulatory process,
            and pricing data
          </p>
          <Link
            to={`/payment/country-${countryId}` as any}
            className="inline-block px-8 py-3 rounded-lg font-semibold text-sm hover:opacity-90"
            style={{ backgroundColor: "#F1C40F", color: "#0A3D62" }}
          >
            Buy Full Report — ₹{country.price.toLocaleString("en-IN")}
          </Link>
        </div>
      </div>
    </div>
  );
}
