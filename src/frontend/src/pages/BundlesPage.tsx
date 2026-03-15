import { Link } from "@tanstack/react-router";
import { bundles } from "../data/products";

export default function BundlesPage() {
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
          <h1 className="text-3xl font-bold text-white mb-2">Bundle Offers</h1>
          <p className="text-blue-200 text-sm">
            Get multiple country reports at a discounted bundle price
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
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
              {i === 2 && (
                <div
                  className="text-xs font-bold mb-3"
                  style={{ color: "#F1C40F" }}
                >
                  BEST VALUE
                </div>
              )}
              <div
                className="text-lg font-bold mb-3"
                style={{ color: i === 2 ? "#F1C40F" : "#0A3D62" }}
              >
                {bundle.name}
              </div>
              <div className="flex flex-col gap-1.5 mb-5">
                {bundle.countries.map((country) => (
                  <div
                    key={country}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: i === 2 ? "#c5dff0" : "#475569" }}
                  >
                    <span
                      style={{ color: i === 2 ? "#F1C40F" : "#16A085" }}
                      className="text-xs"
                    >
                      •
                    </span>
                    {country}
                  </div>
                ))}
              </div>
              <div
                className="text-3xl font-bold mb-5"
                style={{ color: i === 2 ? "#F1C40F" : "#0A3D62" }}
              >
                ₹{bundle.price.toLocaleString("en-IN")}
              </div>
              <Link
                to={`/payment/${bundle.id}` as any}
                className="block text-center py-3 rounded-lg text-sm font-semibold hover:opacity-90 mt-auto"
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
    </div>
  );
}
