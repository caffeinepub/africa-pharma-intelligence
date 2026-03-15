import { Link } from "@tanstack/react-router";
import { Download, FileText, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

const reportNames: Record<string, string> = {
  overview: "Africa Pharma Entry Overview",
  snapshot: "Africa Pharma Market Snapshot",
  master: "Africa Pharma Entry Master Report",
  "bundle-east": "East Africa Bundle",
  "bundle-west": "West Africa Bundle",
  "bundle-full": "Full Africa Bundle",
  "country-kenya": "Kenya Country Report",
  "country-nigeria": "Nigeria Country Report",
  "country-ethiopia": "Ethiopia Country Report",
  "country-ghana": "Ghana Country Report",
  "country-tanzania": "Tanzania Country Report",
  "country-uganda": "Uganda Country Report",
  "country-rwanda": "Rwanda Country Report",
  "country-zambia": "Zambia Country Report",
  "country-mozambique": "Mozambique Country Report",
  "country-senegal": "Senegal Country Report",
  "country-ivory-coast": "Ivory Coast Country Report",
  "country-cameroon": "Cameroon Country Report",
  "country-south-africa": "South Africa Country Report",
};

function getPdfUrl(reportId: string): string {
  if (reportId.startsWith("country-")) {
    return `/pdfs/${reportId}.pdf`;
  }
  const urls: Record<string, string> = {
    overview: "/pdfs/africa-pharma-overview.pdf",
    snapshot: "/pdfs/africa-pharma-snapshot.pdf",
    master: "/pdfs/africa-pharma-master.pdf",
    "bundle-east": "/pdfs/africa-bundle-east.pdf",
    "bundle-west": "/pdfs/africa-bundle-west.pdf",
    "bundle-full": "/pdfs/africa-bundle-full.pdf",
  };
  return urls[reportId] || `/pdfs/${reportId}.pdf`;
}

export default function AccessCodePage() {
  const { actor, isFetching } = useActor();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    reportId: string;
    subscriberName: string;
    subscriberEmail: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCode = code.trim().toUpperCase();
    if (!trimmedCode) {
      setError("Please enter your access code.");
      return;
    }
    if (!actor) {
      setError("Unable to connect. Please refresh and try again.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await actor.redeemAccessCode(trimmedCode);
      if (res) {
        setResult(res);
      } else {
        setError(
          "Invalid or already used access code. Please check and try again.",
        );
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{ backgroundColor: "#0A3D62" }}
        className="py-12 px-4 sm:px-8"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "rgba(241,196,15,0.2)" }}
          >
            <Lock size={24} style={{ color: "#F1C40F" }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Enter Access Code
          </h1>
          <p className="text-blue-200 text-sm">
            Enter the access code you received on WhatsApp to download your
            report.
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 sm:px-8 py-12">
        {!result ? (
          <div
            className="bg-white rounded-xl border shadow-sm p-8"
            style={{ borderColor: "#e2e8f0" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="access-code"
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#0A3D62" }}
                >
                  Your Access Code
                </label>
                <input
                  id="access-code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-4 rounded-xl border text-center text-2xl font-mono font-bold tracking-widest focus:outline-none focus:ring-2 uppercase"
                  style={{
                    borderColor: "#e2e8f0",
                    color: "#0A3D62",
                    letterSpacing: "0.3em",
                  }}
                  placeholder="XXXXXXXX"
                  maxLength={12}
                  autoComplete="off"
                  spellCheck={false}
                  data-ocid="access.input"
                />
                <p className="text-xs text-gray-400 text-center mt-2">
                  Enter the code exactly as received (case-insensitive)
                </p>
              </div>

              {error && (
                <div
                  className="p-3 rounded-lg text-sm text-center"
                  style={{
                    backgroundColor: "#FEF2F2",
                    color: "#DC2626",
                    border: "1px solid #FECACA",
                  }}
                  data-ocid="access.error_state"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || isFetching}
                className="w-full py-4 rounded-xl text-sm font-bold hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#0A3D62", color: "white" }}
                data-ocid="access.primary_button"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Unlock Download"
                )}
              </button>
            </form>

            <div
              className="mt-6 pt-5 border-t text-center"
              style={{ borderColor: "#f1f5f9" }}
            >
              <p className="text-xs text-gray-400">
                Haven't paid yet?{" "}
                <Link
                  to="/reports"
                  style={{ color: "#16A085" }}
                  className="font-medium"
                >
                  Browse reports
                </Link>
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Issues with your code?{" "}
                <a
                  href="https://wa.me/919400051880?text=I%20have%20an%20issue%20with%20my%20access%20code."
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#16A085" }}
                  className="font-medium"
                >
                  Contact us on WhatsApp
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div
            className="bg-white rounded-xl border shadow-sm p-8 text-center"
            style={{ borderColor: "#e2e8f0" }}
            data-ocid="access.success_state"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#E8F5E9" }}
            >
              <FileText size={28} style={{ color: "#16A085" }} />
            </div>
            <h2 className="text-xl font-bold mb-1" style={{ color: "#0A3D62" }}>
              Access Granted!
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              Welcome, <strong>{result.subscriberName}</strong>
            </p>
            <p className="text-xs text-gray-400 mb-6">
              {result.subscriberEmail}
            </p>

            <div
              className="p-4 rounded-lg mb-6"
              style={{
                backgroundColor: "#F5F7FA",
                border: "1px dashed #b3d4e8",
              }}
            >
              <p className="text-sm font-semibold" style={{ color: "#0A3D62" }}>
                {reportNames[result.reportId] || result.reportId}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Licensed to: {result.subscriberEmail}
              </p>
            </div>

            <a
              href={getPdfUrl(result.reportId)}
              download
              className="w-full py-4 rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 mb-4"
              style={{
                backgroundColor: "#16A085",
                color: "white",
                display: "flex",
              }}
              data-ocid="access.button"
            >
              <Download size={18} />
              Download {reportNames[result.reportId] || "Report"}
            </a>

            <p className="text-xs text-gray-400">
              Note: This code has now been used. Please save your PDF safely.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
