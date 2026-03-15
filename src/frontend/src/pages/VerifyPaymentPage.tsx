import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { countries } from "../data/countries";
import { bundles, mainReports } from "../data/products";
import { useActor } from "../hooks/useActor";

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
      return { name: `${country.name} Report`, price: country.price };
  }

  return null;
}

export default function VerifyPaymentPage() {
  const { product } = useParams({ strict: false }) as { product?: string };
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    transactionId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const info = getProductInfo(product || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.whatsapp || !form.transactionId) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (actor) {
        await actor.submitPaymentSubmission(
          form.name,
          form.email,
          form.whatsapp,
          form.transactionId,
          product || "",
          BigInt(info?.price || 0),
        );
      }
    } catch {
      // Continue even if recording fails
    }

    const message = [
      "New Payment Submission:",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `WhatsApp: ${form.whatsapp}`,
      `Transaction ID: ${form.transactionId}`,
      `Report: ${info?.name || product}`,
      `Amount: ₹${info?.price || 0}`,
    ].join("\n");

    setSubmitted(true);
    setLoading(false);

    const waUrl = `https://wa.me/919400051880?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

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

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className="bg-white rounded-xl border shadow-sm p-8 max-w-md w-full text-center"
          data-ocid="verify.success_state"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#E8F5E9" }}
          >
            <span style={{ fontSize: 32 }}>✅</span>
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#0A3D62" }}>
            Details Submitted!
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            You'll receive your access code on WhatsApp after payment
            verification. We'll get back to you shortly.
          </p>
          <p className="text-xs text-gray-400 mb-6">
            If WhatsApp didn't open automatically,{" "}
            <a
              href={`https://wa.me/919400051880?text=${encodeURIComponent(
                [
                  "New Payment Submission:",
                  `Name: ${form.name}`,
                  `Email: ${form.email}`,
                  `WhatsApp: ${form.whatsapp}`,
                  `Transaction ID: ${form.transactionId}`,
                  `Report: ${info?.name || product}`,
                  `Amount: ₹${info?.price || 0}`,
                ].join("\n"),
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#16A085" }}
              className="underline"
            >
              click here to open WhatsApp
            </a>
            .
          </p>
          <Link
            to="/access"
            className="inline-block px-6 py-2.5 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: "#16A085", color: "white" }}
            data-ocid="verify.access_link"
          >
            Enter Access Code
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{ backgroundColor: "#0A3D62" }}
        className="py-12 px-4 sm:px-8"
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-1">
            Submit Payment Details
          </h1>
          <p className="text-blue-200 text-sm">{info.name}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-10">
        <div
          className="bg-white rounded-xl border shadow-sm p-6"
          style={{ borderColor: "#e2e8f0" }}
        >
          <p className="text-sm text-gray-600 mb-6">
            Please provide your payment details. After submission, you'll be
            directed to WhatsApp. We'll verify your payment and send your access
            code on WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="verify-name"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#0A3D62" }}
              >
                Full Name *
              </label>
              <input
                id="verify-name"
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: "#e2e8f0" }}
                placeholder="Your full name"
                data-ocid="verify.input"
              />
            </div>
            <div>
              <label
                htmlFor="verify-email"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#0A3D62" }}
              >
                Email Address *
              </label>
              <input
                id="verify-email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: "#e2e8f0" }}
                placeholder="your@email.com"
                data-ocid="verify.input"
              />
            </div>
            <div>
              <label
                htmlFor="verify-whatsapp"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#0A3D62" }}
              >
                WhatsApp Number *
              </label>
              <input
                id="verify-whatsapp"
                type="tel"
                value={form.whatsapp}
                onChange={(e) =>
                  setForm((f) => ({ ...f, whatsapp: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: "#e2e8f0" }}
                placeholder="+91 XXXXXXXXXX"
                data-ocid="verify.input"
              />
            </div>
            <div>
              <label
                htmlFor="verify-txid"
                className="block text-xs font-medium mb-1.5"
                style={{ color: "#0A3D62" }}
              >
                UPI Transaction ID *
              </label>
              <input
                id="verify-txid"
                type="text"
                value={form.transactionId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, transactionId: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: "#e2e8f0" }}
                placeholder="e.g. 123456789012"
                data-ocid="verify.input"
              />
              <p className="text-xs text-gray-400 mt-1">
                Find this in your UPI app payment history
              </p>
            </div>

            {error && (
              <div
                className="p-3 rounded-lg text-sm"
                style={{
                  backgroundColor: "#FEF2F2",
                  color: "#DC2626",
                  border: "1px solid #FECACA",
                }}
                data-ocid="verify.error_state"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#25D366", color: "white" }}
              data-ocid="verify.submit_button"
            >
              {loading ? "Submitting..." : "Submit & Contact on WhatsApp"}
            </button>
          </form>

          <div
            className="mt-6 pt-5 border-t text-center"
            style={{ borderColor: "#f1f5f9" }}
          >
            <p className="text-xs text-gray-400">
              Already have an access code?{" "}
              <Link
                to="/access"
                style={{ color: "#16A085" }}
                className="font-medium"
              >
                Enter it here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
