import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import AccessCodePage from "./pages/AccessCodePage";
import AdminPage from "./pages/AdminPage";
import BundlesPage from "./pages/BundlesPage";
import CountryPage from "./pages/CountryPage";
import DownloadPage from "./pages/DownloadPage";
import HomePage from "./pages/HomePage";
import PaymentPage from "./pages/PaymentPage";
import ReportsPage from "./pages/ReportsPage";
import VerifyPaymentPage from "./pages/VerifyPaymentPage";

function Layout() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F5F7FA", fontFamily: "Inter, sans-serif" }}
    >
      <Navbar />
      <Outlet />
      <WhatsAppButton />
    </div>
  );
}

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: ReportsPage,
});
const countryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/country/$countryId",
  component: CountryPage,
});
const bundlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bundles",
  component: BundlesPage,
});
const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment/$product",
  component: PaymentPage,
});
const verifyPaymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify-payment/$product",
  component: VerifyPaymentPage,
});
const downloadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/download/$reportType",
  component: DownloadPage,
});
const accessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/access",
  component: AccessCodePage,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  reportsRoute,
  countryRoute,
  bundlesRoute,
  paymentRoute,
  verifyPaymentRoute,
  downloadRoute,
  accessRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
