import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { CheckCircle, Monitor, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { countries } from "../data/countries";
import { bundles, mainReports } from "../data/products";

const UPI_ID = "919188520881@federal";
const PAYEE_NAME = "SBZ%20Enterprises";

function getProductInfo(
  product: string,
): { name: string; price: number } | null {
  const report = mainReports.find((r) => r.id === product);
  if (report) return { name: report.name, price: report.price };

  const bundle = bundles.find((b) => b.id === product);
  if (bundle) return { name: bundle.name, price: bundle.price };

  if (product.startsWith("country-")) {
    const countryId = product.replace("country-", "");
    const country = countries.find((c) => c.id === countryId);
    if (country)
      return {
        name: `${country.name} Pharma Intelligence Report`,
        price: country.price,
      };
  }

  return null;
}

export default function PaymentPage() {
  const { product } = useParams({ strict: false }) as { product?: string };
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent));
  }, []);

  const info = getProductInfo(product || "");

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#0A3D62" }}>
            Product not found
          </h2>
          <Link to="/" className="text-sm" style={{ color: "#16A085" }}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${PAYEE_NAME}&am=${info.price}&cu=INR`;

  const steps = [
    `Pay ₹${info.price.toLocaleString("en-IN")} using UPI to the ID above`,
    "Note your UPI Transaction ID from the payment confirmation",
    "Click \u201cI Have Completed Payment\u201d below",
    "Submit your details with the Transaction ID",
    "Receive instant access to your report download",
  ];

  return (
    <div>
      <div
        style={{ backgroundColor: "#0A3D62" }}
        className="py-12 px-4 sm:px-8"
      >
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="text-blue-300 text-xs hover:text-white mb-4 inline-flex items-center gap-1"
          >
            ← Home
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">
            Complete Your Purchase
          </h1>
          <p className="text-blue-200 text-sm">{info.name}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-10">
        {/* Order summary */}
        <div
          className="bg-white rounded-xl border shadow-sm p-6 mb-6"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div className="text-xs text-gray-500 mb-1">Order Summary</div>
          <div className="flex justify-between items-center">
            <div className="font-semibold" style={{ color: "#0A3D62" }}>
              {info.name}
            </div>
            <div className="text-2xl font-bold" style={{ color: "#0A3D62" }}>
              ₹{info.price.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div
          className="bg-white rounded-xl border shadow-sm p-6 mb-6"
          style={{ borderColor: "#e2e8f0" }}
        >
          <h2 className="font-bold mb-4" style={{ color: "#0A3D62" }}>
            Pay via UPI
          </h2>

          {isMobile ? (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-600">
                <Smartphone size={16} style={{ color: "#16A085" }} />
                <span>Mobile detected — tap to open your UPI app</span>
              </div>
              <a
                href={upiLink}
                className="inline-block px-8 py-3 rounded-lg font-semibold text-sm hover:opacity-90"
                style={{ backgroundColor: "#16A085", color: "white" }}
              >
                Pay ₹{info.price.toLocaleString("en-IN")} via UPI
              </a>
              <div
                className="mt-4 p-3 rounded-lg text-xs text-gray-500"
                style={{ backgroundColor: "#F5F7FA" }}
              >
                UPI ID: <strong>{UPI_ID}</strong>
                <br />
                Amount: <strong>₹{info.price.toLocaleString("en-IN")}</strong>
                <br />
                Payee: SBZ Enterprises
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-5 text-sm text-gray-600">
                <Monitor size={16} style={{ color: "#16A085" }} />
                <span>Scan QR code with your phone UPI app</span>
              </div>
              <div
                className="inline-block border-2 rounded-xl p-6 mb-4"
                style={{ borderColor: "#0A3D62" }}
              >
                <div
                  className="w-48 h-48 flex flex-col items-center justify-center"
                  style={{ backgroundColor: "#F5F7FA", borderRadius: "8px" }}
                >
                  <div className="text-4xl mb-2">&#x25A0;</div>
                  <div
                    className="text-xs font-bold"
                    style={{ color: "#0A3D62" }}
                  >
                    UPI QR
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Scan with any UPI app
                  </div>
                </div>
              </div>
              <div
                className="p-4 rounded-xl text-sm"
                style={{
                  backgroundColor: "#F5F7FA",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div className="grid grid-cols-2 gap-2 text-left">
                  <div>
                    <div className="text-xs text-gray-400">UPI ID</div>
                    <div className="font-semibold" style={{ color: "#0A3D62" }}>
                      {UPI_ID}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Payee Name</div>
                    <div className="font-semibold" style={{ color: "#0A3D62" }}>
                      SBZ Enterprises
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Amount</div>
                    <div
                      className="font-semibold text-lg"
                      style={{ color: "#16A085" }}
                    >
                      ₹{info.price.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Currency</div>
                    <div className="font-semibold" style={{ color: "#0A3D62" }}>
                      INR
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Open any UPI app (GPay, PhonePe, Paytm) and enter the UPI ID
                manually to pay
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div
          className="bg-blue-50 rounded-xl p-5 mb-6 border"
          style={{ borderColor: "#b3d4e8" }}
        >
          <h3
            className="text-sm font-semibold mb-3"
            style={{ color: "#0A3D62" }}
          >
            How to complete your order:
          </h3>
          <ol className="space-y-2">
            {steps.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span
                  className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "#0A3D62", color: "#F1C40F" }}
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <button
          type="button"
          onClick={() => navigate({ to: `/verify-payment/${product}` })}
          className="w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
          style={{ backgroundColor: "#16A085", color: "white" }}
          data-ocid="payment.primary_button"
        >
          <CheckCircle size={18} />I Have Completed Payment
        </button>
      </div>
    </div>
  );
}
