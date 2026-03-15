import { Link } from "@tanstack/react-router";
import { Key, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{ backgroundColor: "#0A3D62" }}
      className="sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" data-ocid="nav.link">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: "#F1C40F" }}
            >
              <span className="text-xs font-bold" style={{ color: "#0A3D62" }}>
                AP
              </span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:block">
              AfricaPharma <span style={{ color: "#F1C40F" }}>Intel</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              data-ocid="nav.link"
            >
              Home
            </Link>
            <Link
              to="/reports"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              data-ocid="nav.link"
            >
              Reports
            </Link>
            <a
              href="/#countries"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              data-ocid="nav.link"
            >
              Countries
            </a>
            <Link
              to="/bundles"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
              data-ocid="nav.link"
            >
              Bundles
            </Link>
            <a
              href="https://wa.me/919400051880?text=I%20am%20interested%20in%20the%20Africa%20pharma%20market%20reports."
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium px-4 py-1.5 rounded transition-colors"
              style={{ backgroundColor: "#16A085", color: "white" }}
              data-ocid="nav.link"
            >
              WhatsApp
            </a>
            <Link
              to="/access"
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: "#F1C40F", color: "#0A3D62" }}
              data-ocid="nav.link"
            >
              <Key size={14} />
              Access Code
            </Link>
            <Link
              to="/admin"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              data-ocid="nav.link"
            >
              Admin
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          style={{ backgroundColor: "#0A3D62" }}
          className="md:hidden px-4 pb-4 border-t border-blue-800"
        >
          <div className="flex flex-col gap-3 pt-3">
            <Link
              to="/"
              className="text-gray-300 hover:text-white text-sm"
              onClick={() => setOpen(false)}
              data-ocid="nav.link"
            >
              Home
            </Link>
            <Link
              to="/reports"
              className="text-gray-300 hover:text-white text-sm"
              onClick={() => setOpen(false)}
              data-ocid="nav.link"
            >
              Reports
            </Link>
            <a
              href="/#countries"
              className="text-gray-300 hover:text-white text-sm"
              data-ocid="nav.link"
            >
              Countries
            </a>
            <Link
              to="/bundles"
              className="text-gray-300 hover:text-white text-sm"
              onClick={() => setOpen(false)}
              data-ocid="nav.link"
            >
              Bundles
            </Link>
            <a
              href="https://wa.me/919400051880?text=I%20am%20interested%20in%20the%20Africa%20pharma%20market%20reports."
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium px-4 py-2 rounded w-fit"
              style={{ backgroundColor: "#16A085", color: "white" }}
              data-ocid="nav.link"
            >
              WhatsApp
            </a>
            <Link
              to="/access"
              className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg w-fit"
              style={{ backgroundColor: "#F1C40F", color: "#0A3D62" }}
              onClick={() => setOpen(false)}
              data-ocid="nav.link"
            >
              <Key size={14} />
              Access Code
            </Link>
            <Link
              to="/admin"
              className="text-xs text-gray-500"
              onClick={() => setOpen(false)}
              data-ocid="nav.link"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
