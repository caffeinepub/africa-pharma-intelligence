import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { mainReports } from "../data/products";

export default function ReportsPage() {
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
          <h1 className="text-3xl font-bold text-white mb-2">
            Market Intelligence Reports
          </h1>
          <p className="text-blue-200 text-sm">
            Choose the right intelligence level for your Africa pharma entry
            strategy
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">
        <div className="space-y-6">
          {mainReports.map((report, i) => (
            <div
              key={report.id}
              className="bg-white rounded-xl border shadow-sm overflow-hidden"
              style={{ borderColor: i === 3 ? "#F1C40F" : "#e2e8f0" }}
              data-ocid={`products.item.${i + 1}`}
            >
              {i === 3 && (
                <div
                  className="text-xs font-bold px-4 py-1.5"
                  style={{ backgroundColor: "#F1C40F", color: "#0A3D62" }}
                >
                  MOST COMPREHENSIVE — RECOMMENDED FOR SERIOUS EXPORTERS
                </div>
              )}
              <div className="p-6 flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText size={18} style={{ color: "#16A085" }} />
                    <span
                      className="text-xs font-medium"
                      style={{ color: "#16A085" }}
                    >
                      {report.pages} pages
                    </span>
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: "#0A3D62" }}
                  >
                    {report.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {report.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {report.includes.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <span
                          style={{ color: "#16A085" }}
                          className="text-xs mt-0.5"
                        >
                          ✓
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sm:w-48 flex flex-col justify-center items-center sm:items-end gap-3">
                  <div
                    className="text-3xl font-bold"
                    style={{ color: "#0A3D62" }}
                  >
                    ₹{report.price.toLocaleString("en-IN")}
                  </div>
                  <Link
                    to={`/payment/${report.id}` as any}
                    className="w-full sm:w-auto text-center px-8 py-3 rounded-lg text-sm font-semibold hover:opacity-90"
                    style={
                      i === 3
                        ? { backgroundColor: "#F1C40F", color: "#0A3D62" }
                        : { backgroundColor: "#0A3D62", color: "white" }
                    }
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
