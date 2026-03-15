import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export default function DownloadPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/access", replace: true });
  }, [navigate]);

  return null;
}
