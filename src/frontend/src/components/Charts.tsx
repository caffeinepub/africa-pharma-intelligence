import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BLUE = "#0A3D62";
const TEAL = "#16A085";
const GOLD = "#F1C40F";

export function ImportGrowthChart() {
  const data = [
    { year: "2018", value: 2.1 },
    { year: "2019", value: 2.4 },
    { year: "2020", value: 2.7 },
    { year: "2021", value: 3.1 },
    { year: "2022", value: 3.5 },
    { year: "2023", value: 3.9 },
    { year: "2024", value: 4.4 },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold mb-3" style={{ color: "#0A3D62" }}>
        Africa Pharma Import Growth (USD Billion)
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={36}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e2e8f0"
          />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 5]}
            tickFormatter={(v: number) => `$${v}B`}
          />
          <Tooltip formatter={(v: number) => [`$${v}B`, "Import Value"]} />
          <Bar dataKey="value" fill={TEAL} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OTCDemandChart() {
  const data = [
    { category: "Analgesics", share: 35 },
    { category: "Anti-diarrheal", share: 20 },
    { category: "Antacids", share: 18 },
    { category: "Antihistamines", share: 15 },
    { category: "Vitamins", share: 12 },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold mb-3" style={{ color: "#0A3D62" }}>
        OTC Demand Category Share (%)
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" barSize={22}>
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke="#e2e8f0"
          />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}%`}
          />
          <YAxis
            type="category"
            dataKey="category"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            width={100}
          />
          <Tooltip formatter={(v: number) => [`${v}%`, "Share"]} />
          <Bar dataKey="share" radius={[0, 4, 4, 0]}>
            {data.map((item) => (
              <Cell
                key={item.category}
                fill={
                  ["Analgesics", "Antacids"].includes(item.category)
                    ? BLUE
                    : TEAL
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CountryOpportunityChart() {
  const data = [
    { country: "Nigeria", score: 95 },
    { country: "Kenya", score: 88 },
    { country: "South Africa", score: 82 },
    { country: "Ghana", score: 78 },
    { country: "Tanzania", score: 72 },
    { country: "Uganda", score: 68 },
    { country: "Ethiopia", score: 65 },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold mb-3" style={{ color: "#0A3D62" }}>
        Country Opportunity Ranking (Score/100)
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" barSize={22}>
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke="#e2e8f0"
          />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          <YAxis
            type="category"
            dataKey="country"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Tooltip
            formatter={(v: number) => [`${v}/100`, "Opportunity Score"]}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]}>
            {data.map((item, i) => (
              <Cell
                key={item.country}
                fill={i === 0 ? GOLD : i < 3 ? BLUE : TEAL}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
