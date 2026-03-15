import * as Accordion from "@radix-ui/react-accordion";
import { Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle, ChevronRight, Globe } from "lucide-react";
import {
  CountryOpportunityChart,
  ImportGrowthChart,
  OTCDemandChart,
} from "../components/Charts";
import {
  countries,
  tier1Countries,
  tier2Countries,
  tier3Countries,
} from "../data/countries";
import { bundles, faqItems, mainReports } from "../data/products";

const topMedicines = [
  { medicine: "Paracetamol", demand: "Very High" },
  { medicine: "Ibuprofen", demand: "High" },
  { medicine: "ORS", demand: "Very High" },
  { medicine: "Omeprazole", demand: "High" },
  { medicine: "Loperamide", demand: "High" },
  { medicine: "Cetirizine", demand: "High" },
  { medicine: "Metformin", demand: "Moderate" },
  { medicine: "Amoxicillin", demand: "High" },
  { medicine: "Azithromycin", demand: "High" },
  { medicine: "Ciprofloxacin", demand: "Moderate" },
  { medicine: "Metronidazole", demand: "High" },
  { medicine: "Albendazole", demand: "High" },
  { medicine: "Chloroquine", demand: "Moderate" },
  { medicine: "Amlodipine", demand: "Moderate" },
  { medicine: "Atorvastatin", demand: "Moderate" },
  { medicine: "Diclofenac", demand: "High" },
  { medicine: "Ranitidine", demand: "Moderate" },
  { medicine: "Multivitamins", demand: "High" },
  { medicine: "Iron + Folic Acid", demand: "Very High" },
  { medicine: "Zinc Sulfate", demand: "High" },
];

const shippingRoutes = [
  { route: "India → Kenya", cost: "₹120–₹160 per kg" },
  { route: "India → Tanzania", cost: "₹110–₹150 per kg" },
  { route: "India → Nigeria", cost: "₹140–₹200 per kg" },
  { route: "India → Ghana", cost: "₹130–₹170 per kg" },
  { route: "India → South Africa", cost: "₹150–₹210 per kg" },
  { route: "India → Uganda", cost: "₹115–₹155 per kg" },
  { route: "India → Ethiopia", cost: "₹120–₹165 per kg" },
];

const demandBadge = (demand: string) => {
  const colors: Record<string, string> = {
    "Very High": "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Moderate: "bg-blue-100 text-blue-700",
  };
  return colors[demand] || "bg-gray-100 text-gray-700";
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <section
        className="relative py-20 px-4 sm:px-8"
        style={{
          background:
            "linear-gradient(135deg, #0A3D62 0%, #0d5a8a 60%, #16A085 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{
              backgroundColor: "rgba(241,196,15,0.2)",
              color: "#F1C40F",
              border: "1px solid rgba(241,196,15,0.4)",
            }}
          >
            <Globe size={12} /> Market Intelligence for Indian Pharma Exporters
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Export Indian Medicines
            <br />
            <span style={{ color: "#F1C40F" }}>to Africa</span>
          </h1>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Market intelligence reports for Indian entrepreneurs exploring
            pharmaceutical distribution opportunities across African markets.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={() => navigate({ to: "/reports" })}
              className="px-8 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: "#F1C40F", color: "#0A3D62" }}
              data-ocid="hero.primary_button"
            >
              View Reports
            </button>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("countries")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 rounded-lg font-semibold text-sm transition-all border-2 text-white hover:bg-white hover:text-blue-900"
              style={{ borderColor: "rgba(255,255,255,0.5)" }}
              data-ocid="hero.secondary_button"
            >
              Explore Country Opportunities
            </button>
          </div>

          {/* Stats bar */}
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/20 pt-10">
            {[
              { label: "African Countries Covered", value: "13+" },
              { label: "Import Dependency", value: "70%+" },
              { label: "Reports Available", value: "4 Types" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-3xl font-bold"
                  style={{ color: "#F1C40F" }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-blue-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY AFRICA */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-10">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "#0A3D62" }}
            >
              Why Africa is a Major Opportunity for Indian Medicines
            </h2>
            <p className="text-gray-600 mb-6">
              Africa imports over{" "}
              <strong>70% of pharmaceutical products</strong> due to limited
              local manufacturing capacity. This creates an extraordinary window
              for Indian generic medicine exporters.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="mb-8">
                <h3 className="font-semibold mb-3" style={{ color: "#0A3D62" }}>
                  Why Indian Generics Dominate
                </h3>
                <ul className="space-y-2">
                  {[
                    "Competitive pricing vs European brands",
                    "WHO-GMP manufacturing standards recognized across Africa",
                    "Strong export supply chains from major pharma hubs",
                    "Established trust in East and West African markets",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle
                        size={16}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "#16A085" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3" style={{ color: "#0A3D62" }}>
                  High Demand OTC Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Fever & Pain",
                    "Gastric Problems",
                    "Diarrhea & ORS",
                    "Antihistamines",
                    "Motion Sickness",
                    "Nutritional Supplements",
                  ].map((cat) => (
                    <span
                      key={cat}
                      className="text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{
                        backgroundColor: "#E8F5E9",
                        color: "#16A085",
                        border: "1px solid #16A085",
                      }}
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <ImportGrowthChart />
            </div>
          </div>
        </div>
      </section>

      {/* MARKET DATA VISUALS */}
      <section
        className="py-16 px-4 sm:px-8"
        style={{ backgroundColor: "#F5F7FA" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#0A3D62" }}>
            Market Data Overview
          </h2>
          <p className="text-gray-500 text-sm mb-10">
            Data-driven insights into African pharmaceutical import trends
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <OTCDemandChart />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <CountryOpportunityChart />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN REPORTS */}
      <section id="reports" className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#0A3D62" }}>
            Market Intelligence Reports
          </h2>
          <p className="text-gray-500 text-sm mb-10">
            Choose the depth of intelligence you need for your market entry
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainReports.map((report, i) => (
              <div
                key={report.id}
                className="rounded-xl border flex flex-col"
                style={{
                  borderColor: i === 3 ? "#F1C40F" : "#e2e8f0",
                  background:
                    i === 3
                      ? "linear-gradient(135deg, #0A3D62, #0d4f7a)"
                      : "white",
                }}
                data-ocid={`products.item.${i + 1}`}
              >
                <div className="p-5 flex-1">
                  {i === 3 && (
                    <div
                      className="text-xs font-bold px-2 py-1 rounded-full w-fit mb-3"
                      style={{ backgroundColor: "#F1C40F", color: "#0A3D62" }}
                    >
                      MOST POPULAR
                    </div>
                  )}
                  <div
                    className="text-xs font-medium mb-1"
                    style={{ color: i === 3 ? "#F1C40F" : "#16A085" }}
                  >
                    {report.pages} pages
                  </div>
                  <h3
                    className="font-bold text-base mb-2"
                    style={{ color: i === 3 ? "white" : "#0A3D62" }}
                  >
                    {report.name}
                  </h3>
                  <p
                    className="text-xs mb-4"
                    style={{ color: i === 3 ? "#a0c4e8" : "#64748b" }}
                  >
                    {report.description}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {report.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-1.5 text-xs"
                        style={{ color: i === 3 ? "#c5dff0" : "#475569" }}
                      >
                        <span
                          className="text-xs mt-0.5"
                          style={{ color: i === 3 ? "#F1C40F" : "#16A085" }}
                        >
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="p-5 border-t"
                  style={{
                    borderColor: i === 3 ? "rgba(255,255,255,0.15)" : "#f1f5f9",
                  }}
                >
                  <div
                    className="text-2xl font-bold mb-3"
                    style={{ color: i === 3 ? "#F1C40F" : "#0A3D62" }}
                  >
                    ₹{report.price.toLocaleString("en-IN")}
                  </div>
                  <Link
                    to={`/payment/${report.id}` as any}
                    className="block text-center py-2.5 px-4 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                    style={
                      i === 3
                        ? { backgroundColor: "#F1C40F", color: "#0A3D62" }
                        : { backgroundColor: "#0A3D62", color: "white" }
                    }
                  >
                    Buy Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP 20 MEDICINES TABLE */}
      <section
        className="py-16 px-4 sm:px-8"
        style={{ backgroundColor: "#F5F7FA" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#0A3D62" }}>
            Top 20 High-Demand OTC Medicines in Africa
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Based on import data and distributor surveys across sub-Saharan
            African markets
          </p>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#0A3D62" }}>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    #
                  </th>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    Medicine
                  </th>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    Demand Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {topMedicines.map((med, i) => (
                  <tr
                    key={med.medicine}
                    style={{
                      backgroundColor: i % 2 === 0 ? "white" : "#F8FAFC",
                    }}
                  >
                    <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                    <td
                      className="px-4 py-3 font-medium"
                      style={{ color: "#2C3E50" }}
                    >
                      {med.medicine}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${demandBadge(med.demand)}`}
                      >
                        {med.demand}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SHIPPING COST TABLE */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#0A3D62" }}>
            Shipping Cost Reference
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Average air freight costs for pharmaceutical shipments from India to
            key African markets
          </p>
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#16A085" }}>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    Shipping Route
                  </th>
                  <th className="text-left px-4 py-3 text-white font-semibold">
                    Average Cost per kg
                  </th>
                </tr>
              </thead>
              <tbody>
                {shippingRoutes.map((r, i) => (
                  <tr
                    key={r.route}
                    style={{
                      backgroundColor: i % 2 === 0 ? "white" : "#F8FAFC",
                    }}
                  >
                    <td
                      className="px-4 py-3 font-medium"
                      style={{ color: "#2C3E50" }}
                    >
                      {r.route}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{ color: "#16A085", fontWeight: 500 }}
                    >
                      {r.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            * Costs are indicative and vary by carrier, season, and shipment
            volume. Sea freight is 3–4x cheaper but has longer transit times.
          </p>
        </div>
      </section>

      {/* COUNTRIES */}
      <section
        id="countries"
        className="py-16 px-4 sm:px-8"
        style={{ backgroundColor: "#F5F7FA" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#0A3D62" }}>
            Individual Country Reports
          </h2>
          <p className="text-gray-500 text-sm mb-10">
            Deep-dive market intelligence for specific African countries
          </p>

          {/* Tier 1 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: "#0A3D62", color: "#F1C40F" }}
              >
                TIER 1
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "#0A3D62" }}
              >
                Premium Markets — ₹1,999 each
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tier1Countries.map((c, i) => (
                <CountryCard
                  key={c.id}
                  country={c}
                  ocid={`countries.item.${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Tier 2 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: "#16A085", color: "white" }}
              >
                TIER 2
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "#0A3D62" }}
              >
                Growth Markets — ₹1,499 each
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {tier2Countries.map((c, i) => (
                <CountryCard
                  key={c.id}
                  country={c}
                  ocid={`countries.item.${i + 5}`}
                />
              ))}
            </div>
          </div>

          {/* Tier 3 */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: "#64748b", color: "white" }}
              >
                TIER 3
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "#0A3D62" }}
              >
                Emerging Markets — ₹999 each
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {tier3Countries.map((c, i) => (
                <CountryCard
                  key={c.id}
                  country={c}
                  ocid={`countries.item.${i + 10}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#0A3D62" }}>
            Bundle Offers
          </h2>
          <p className="text-gray-500 text-sm mb-10">
            Save more with regional bundles
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {bundles.map((bundle, i) => (
              <div
                key={bundle.id}
                className="rounded-xl p-6 border flex flex-col"
                style={{
                  borderColor: i === 2 ? "#F1C40F" : "#e2e8f0",
                  background: i === 2 ? "#0A3D62" : "white",
                }}
                data-ocid={`bundles.item.${i + 1}`}
              >
                <div
                  className="text-sm font-bold mb-2"
                  style={{ color: i === 2 ? "#F1C40F" : "#0A3D62" }}
                >
                  {bundle.name}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {bundle.countries.map((country) => (
                    <span
                      key={country}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        backgroundColor:
                          i === 2 ? "rgba(255,255,255,0.15)" : "#F0F7FF",
                        color: i === 2 ? "#a0c4e8" : "#0A3D62",
                      }}
                    >
                      {country}
                    </span>
                  ))}
                </div>
                <div
                  className="text-2xl font-bold mb-4"
                  style={{ color: i === 2 ? "#F1C40F" : "#0A3D62" }}
                >
                  ₹{bundle.price.toLocaleString("en-IN")}
                </div>
                <Link
                  to={`/payment/${bundle.id}` as any}
                  className="block text-center py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 mt-auto"
                  style={
                    i === 2
                      ? { backgroundColor: "#F1C40F", color: "#0A3D62" }
                      : { backgroundColor: "#0A3D62", color: "white" }
                  }
                >
                  Buy Bundle
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-16 px-4 sm:px-8"
        style={{ backgroundColor: "#F5F7FA" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#0A3D62" }}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm mb-10">
            Common questions from Indian pharma entrepreneurs
          </p>
          <Accordion.Root type="multiple" className="space-y-3">
            {faqItems.map((item, i) => (
              <Accordion.Item
                key={item.question}
                value={`faq-${i}`}
                className="bg-white rounded-xl border overflow-hidden"
                style={{ borderColor: "#e2e8f0" }}
                data-ocid={`faq.item.${i + 1}`}
              >
                <Accordion.Trigger className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span
                    className="font-medium text-sm pr-4"
                    style={{ color: "#0A3D62" }}
                  >
                    {item.question}
                  </span>
                  <ChevronRight
                    size={16}
                    className="flex-shrink-0 transition-transform"
                    style={{ color: "#16A085" }}
                  />
                </Accordion.Trigger>
                <Accordion.Content className="px-5 pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{ backgroundColor: "#0A3D62" }}
        className="py-12 px-4 sm:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: "#F1C40F" }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: "#0A3D62" }}
                  >
                    AP
                  </span>
                </div>
                <span className="text-white font-bold text-lg">
                  AfricaPharma <span style={{ color: "#F1C40F" }}>Intel</span>
                </span>
              </div>
              <p className="text-blue-200 text-sm max-w-xs">
                Helping Indian entrepreneurs explore pharmaceutical export and
                distribution opportunities across African markets.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <div className="text-white font-semibold text-sm mb-3">
                  Reports
                </div>
                <ul className="space-y-2">
                  {mainReports.map((r) => (
                    <li key={r.id}>
                      <Link
                        to={`/payment/${r.id}` as any}
                        className="text-blue-300 text-xs hover:text-white transition-colors"
                      >
                        {r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-white font-semibold text-sm mb-3">
                  Countries
                </div>
                <ul className="space-y-2">
                  {countries.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <Link
                        to={`/country/${c.id}` as any}
                        className="text-blue-300 text-xs hover:text-white transition-colors"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-white font-semibold text-sm mb-3">
                  Contact
                </div>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://wa.me/919400051880"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-300 text-xs hover:text-white transition-colors"
                    >
                      +91 9400051880
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wa.me/919188520881"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-300 text-xs hover:text-white transition-colors"
                    >
                      +91 9188520881
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-blue-400 text-xs">
              African Pharmaceutical Market Intelligence Platform
            </p>
            <p className="text-blue-400 text-xs">
              © 2024 SBZ Enterprises. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CountryCard({
  country,
  ocid,
}: {
  country: { id: string; name: string; tier: number; price: number };
  ocid: string;
}) {
  return (
    <div
      className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow"
      style={{ borderColor: "#e2e8f0" }}
      data-ocid={ocid}
    >
      <div className="font-semibold text-sm mb-1" style={{ color: "#0A3D62" }}>
        {country.name}
      </div>
      <div className="text-lg font-bold mb-3" style={{ color: "#16A085" }}>
        ₹{country.price.toLocaleString("en-IN")}
      </div>
      <div className="flex gap-2">
        <Link
          to={`/country/${country.id}` as any}
          className="flex-1 text-center py-1.5 text-xs rounded border font-medium transition-colors hover:bg-gray-50"
          style={{ borderColor: "#e2e8f0", color: "#0A3D62" }}
        >
          Preview
        </Link>
        <Link
          to={`/payment/country-${country.id}` as any}
          className="flex-1 text-center py-1.5 text-xs rounded font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: "#0A3D62", color: "white" }}
        >
          Buy
        </Link>
      </div>
    </div>
  );
}
