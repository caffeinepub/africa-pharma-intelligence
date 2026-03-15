export interface MainReport {
  id: string;
  name: string;
  price: number;
  pages: string;
  includes: string[];
  description: string;
  downloadRoute: string;
  productEnum: string;
}

export const mainReports: MainReport[] = [
  {
    id: "overview",
    name: "Africa Pharma Entry Overview",
    price: 599,
    pages: "10–12",
    description:
      "Ideal for first-time explorers wanting a quick orientation to the African pharmaceutical landscape.",
    includes: [
      "Africa pharmaceutical market overview",
      "Top 7 easiest countries for market entry",
      "Top demanded OTC medicines",
      "Distributor margin overview",
      "Regulatory difficulty comparison",
      "Basic export checklist",
    ],
    downloadRoute: "/download/overview",
    productEnum: "overview",
  },
  {
    id: "snapshot",
    name: "Africa Pharma Market Snapshot",
    price: 1999,
    pages: "20–25",
    description:
      "A detailed snapshot for entrepreneurs ready to shortlist markets and understand distribution economics.",
    includes: [
      "Major pharmaceutical import markets",
      "Medicine demand statistics by category",
      "Distributor structures and margins",
      "Country comparison matrix",
      "Pricing reference examples",
    ],
    downloadRoute: "/download/snapshot",
    productEnum: "snapshot",
  },
  {
    id: "country-report",
    name: "Country Wise Pharma Intelligence",
    price: 9999,
    pages: "50+",
    description:
      "Deep-dive intelligence across 15 African countries for entrepreneurs with serious expansion plans.",
    includes: [
      "15-country analysis",
      "Medicine demand data per country",
      "Competitor brand analysis",
      "Distributor networks per market",
      "Pricing benchmarks",
      "Regulatory requirements",
    ],
    downloadRoute: "/download/country-report",
    productEnum: "countryKenya",
  },
  {
    id: "master",
    name: "Africa Pharma Entry Master Report",
    price: 24999,
    pages: "80–120",
    description:
      "The most comprehensive report available. Everything you need to enter and scale in African pharma markets.",
    includes: [
      "20+ country analysis",
      "Detailed regulatory processes",
      "Competitor brand analysis",
      "Pricing intelligence",
      "Distributor networks",
      "Logistics routes and costs",
      "Market entry strategies",
    ],
    downloadRoute: "/download/master",
    productEnum: "master",
  },
];

export interface Bundle {
  id: string;
  name: string;
  countries: string[];
  price: number;
  productEnum: string;
  downloadRoute: string;
}

export const bundles: Bundle[] = [
  {
    id: "bundle-east",
    name: "East Africa Bundle",
    countries: ["Kenya", "Tanzania", "Uganda", "Rwanda"],
    price: 4999,
    productEnum: "bundleEast",
    downloadRoute: "/download/bundle-east",
  },
  {
    id: "bundle-west",
    name: "West Africa Bundle",
    countries: ["Nigeria", "Ghana", "Ivory Coast", "Senegal"],
    price: 5999,
    productEnum: "bundleEast",
    downloadRoute: "/download/bundle-west",
  },
  {
    id: "bundle-full",
    name: "Full Africa Bundle",
    countries: ["All 13 Countries"],
    price: 14999,
    productEnum: "bundleEast",
    downloadRoute: "/download/bundle-full",
  },
];

export const faqItems = [
  {
    question:
      "Do I need a pharma license to export medicines from India to Africa?",
    answer:
      "Yes, you need a valid Drug Manufacturing License (Form 25) or a Drug Wholesale License (Form 20B) issued by the State Licensing Authority in India. Additionally, you need an Import Export Code (IEC) from DGFT. For export, your manufacturing facility must hold a WHO-GMP certificate, which is typically recognized by most African regulatory authorities.",
  },
  {
    question: "How long does medicine registration take in African countries?",
    answer:
      "Registration timelines vary by country. Kenya (PPB) takes 6–9 months; Nigeria (NAFDAC) can take 12–18 months; South Africa (SAHPRA) typically takes 18–24 months. Francophone countries like Ivory Coast and Senegal usually require 12–18 months. Rwanda is relatively faster at 6–10 months. Having a well-prepared dossier reduces delays significantly.",
  },
  {
    question:
      "Which African countries are easiest for Indian exporters to enter?",
    answer:
      "Kenya, Ghana, Rwanda, and Uganda are generally considered the easiest entry points. Kenya has a transparent regulatory system (PPB) that is familiar with Indian GMP standards. Rwanda has streamlined processes and a corruption-free business environment. Ghana's FDA is well-organized and has clear timelines. These countries also have English as the official language, reducing labeling adaptation costs.",
  },
  {
    question: "What margins do distributors earn in African markets?",
    answer:
      "Margins vary by country and product type. Typically, an African importer/distributor earns 40–60% margin over the Indian export price (CIF). National distributors then add 20–30% before supplying pharmacy chains. Retail pharmacies add another 30–50% margin. For a product exported at ₹35 from India, the retail price in East Africa often reaches ₹130–160. High-demand OTC products tend to have tighter margins due to competition.",
  },
  {
    question: "Can I sell OTC medicines in Africa without a local distributor?",
    answer:
      "No, in most African countries, a locally registered company must hold the import license and product registration. Indian exporters typically appoint a local agent or distributor who handles registration, importation, and distribution. Direct-to-pharmacy sales are generally not permitted without local licensing. Some entrepreneurs set up local subsidiaries for greater control.",
  },
  {
    question:
      "What documents are required for medicine registration in Africa?",
    answer:
      "Common documents across most African countries include: WHO-GMP Certificate, Certificate of Pharmaceutical Product (CPP) issued by CDSCO India, Manufacturing License, Full product dossier (CTD format), Labeling artwork (in local language if required), Stability data (ICH Zone IVb), and Site Master File. Some countries like Nigeria (NAFDAC) have additional local requirements.",
  },
];
