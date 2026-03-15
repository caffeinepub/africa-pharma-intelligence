import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const REPORT_OPTIONS = [
  { id: "overview", name: "Africa Pharma Entry Overview" },
  { id: "snapshot", name: "Africa Pharma Market Snapshot" },
  { id: "master", name: "Africa Pharma Entry Master Report" },
  { id: "bundle-east", name: "East Africa Bundle" },
  { id: "bundle-west", name: "West Africa Bundle" },
  { id: "bundle-full", name: "Full Africa Bundle" },
  { id: "country-kenya", name: "Kenya Country Report" },
  { id: "country-nigeria", name: "Nigeria Country Report" },
  { id: "country-ethiopia", name: "Ethiopia Country Report" },
  { id: "country-ghana", name: "Ghana Country Report" },
  { id: "country-tanzania", name: "Tanzania Country Report" },
  { id: "country-uganda", name: "Uganda Country Report" },
  { id: "country-rwanda", name: "Rwanda Country Report" },
  { id: "country-zambia", name: "Zambia Country Report" },
  { id: "country-mozambique", name: "Mozambique Country Report" },
  { id: "country-senegal", name: "Senegal Country Report" },
  { id: "country-ivory-coast", name: "Ivory Coast Country Report" },
  { id: "country-cameroon", name: "Cameroon Country Report" },
  { id: "country-south-africa", name: "South Africa Country Report" },
];

function randomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

function formatDate(ts: bigint) {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const qc = useQueryClient();

  const isAuthenticated = !!identity;
  const claimAttemptedRef = useRef(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimError, setClaimError] = useState(false);

  const adminCheck = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    retry: false,
  });

  // After authentication + actor ready, attempt claimFirstAdmin once per session
  useEffect(() => {
    if (
      !actor ||
      isFetching ||
      !isAuthenticated ||
      adminCheck.isLoading ||
      adminCheck.isPending ||
      adminCheck.data === true ||
      claimAttemptedRef.current
    ) {
      return;
    }
    claimAttemptedRef.current = true;
    setIsClaiming(true);
    actor
      .claimFirstAdmin()
      .then((result: boolean) => {
        if (result) {
          qc.invalidateQueries({ queryKey: ["isAdmin"] });
        } else {
          // Admin already assigned and caller is not admin
          setClaimError(true);
        }
      })
      .catch(() => {
        setClaimError(true);
      })
      .finally(() => {
        setIsClaiming(false);
      });
  }, [
    actor,
    isFetching,
    isAuthenticated,
    adminCheck.isLoading,
    adminCheck.isPending,
    adminCheck.data,
    qc,
  ]);

  const codesQuery = useQuery({
    queryKey: ["allAccessCodes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAccessCodes();
    },
    enabled: !!actor && !isFetching && adminCheck.data === true,
  });

  const submissionsQuery = useQuery({
    queryKey: ["allSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPaymentSubmissions();
    },
    enabled: !!actor && !isFetching && adminCheck.data === true,
  });

  const deleteMutation = useMutation({
    mutationFn: async (code: string) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteAccessCode(code);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["allAccessCodes"] }),
  });

  const createMutation = useMutation({
    mutationFn: async (data: {
      code: string;
      reportId: string;
      subscriberName: string;
      subscriberEmail: string;
      subscriberWhatsapp: string;
      transactionId: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createAccessCode(
        data.code,
        data.reportId,
        data.subscriberName,
        data.subscriberEmail,
        data.subscriberWhatsapp,
        data.transactionId,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["allAccessCodes"] });
      setDialogOpen(false);
      setNewCode({
        code: randomCode(),
        reportId: "",
        subscriberName: "",
        subscriberEmail: "",
        subscriberWhatsapp: "",
        transactionId: "",
      });
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCode, setNewCode] = useState({
    code: randomCode(),
    reportId: "",
    subscriberName: "",
    subscriberEmail: "",
    subscriberWhatsapp: "",
    transactionId: "",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div
          className="bg-white rounded-xl border shadow-sm p-10 max-w-sm w-full text-center"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "rgba(10,61,98,0.1)" }}
          >
            <span style={{ fontSize: 28 }}>🔐</span>
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#0A3D62" }}>
            Admin Dashboard
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Please log in to access the admin dashboard.
          </p>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full"
            style={{ backgroundColor: "#0A3D62", color: "white" }}
            data-ocid="admin.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" /> Logging
                in...
              </>
            ) : (
              "Login with Internet Identity"
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Show spinner while checking admin status or claiming
  if (
    adminCheck.isLoading ||
    adminCheck.isPending ||
    isFetching ||
    isClaiming
  ) {
    return (
      <div
        className="min-h-screen flex items-center justify-center flex-col gap-3"
        data-ocid="admin.loading_state"
      >
        <Loader2
          size={32}
          className="animate-spin"
          style={{ color: "#0A3D62" }}
        />
        <p className="text-sm text-gray-500">
          {isClaiming ? "Verifying admin access..." : "Loading..."}
        </p>
      </div>
    );
  }

  // Access denied
  if (claimError || adminCheck.data === false) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        data-ocid="admin.error_state"
      >
        <div
          className="bg-white rounded-xl border shadow-sm p-10 max-w-sm w-full text-center"
          style={{ borderColor: "#e2e8f0" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "rgba(220,38,38,0.08)" }}
          >
            <span style={{ fontSize: 28 }}>🚫</span>
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#DC2626" }}>
            Access Denied
          </h2>
          <p className="text-sm text-gray-500">
            An admin has already been assigned. Contact the site owner for
            access.
          </p>
        </div>
      </div>
    );
  }

  if (adminCheck.data !== true) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2
          size={32}
          className="animate-spin"
          style={{ color: "#0A3D62" }}
        />
      </div>
    );
  }

  const codes = codesQuery.data || [];
  const submissions = submissionsQuery.data || [];
  const totalCodes = codes.length;
  const usedCodes = codes.filter((c) => c.isUsed).length;
  const activeCodes = totalCodes - usedCodes;

  return (
    <div style={{ backgroundColor: "#F5F7FA", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#0A3D62" }} className="py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-blue-200 text-sm mt-1">
            Manage access codes and view payment submissions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div
            className="bg-white rounded-xl border p-5 shadow-sm"
            style={{ borderColor: "#e2e8f0" }}
          >
            <p className="text-xs text-gray-500 mb-1">Total Codes</p>
            <p className="text-3xl font-bold" style={{ color: "#0A3D62" }}>
              {totalCodes}
            </p>
          </div>
          <div
            className="bg-white rounded-xl border p-5 shadow-sm"
            style={{ borderColor: "#e2e8f0" }}
          >
            <p className="text-xs text-gray-500 mb-1">Active</p>
            <p className="text-3xl font-bold" style={{ color: "#16A085" }}>
              {activeCodes}
            </p>
          </div>
          <div
            className="bg-white rounded-xl border p-5 shadow-sm"
            style={{ borderColor: "#e2e8f0" }}
          >
            <p className="text-xs text-gray-500 mb-1">Used</p>
            <p className="text-3xl font-bold" style={{ color: "#F1C40F" }}>
              {usedCodes}
            </p>
          </div>
        </div>

        <Tabs defaultValue="codes">
          <TabsList className="mb-6">
            <TabsTrigger value="codes" data-ocid="admin.tab">
              Access Codes
            </TabsTrigger>
            <TabsTrigger value="submissions" data-ocid="admin.tab">
              Payment Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="codes">
            <div
              className="bg-white rounded-xl border shadow-sm"
              style={{ borderColor: "#e2e8f0" }}
            >
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: "#e2e8f0" }}
              >
                <h2 className="font-semibold" style={{ color: "#0A3D62" }}>
                  Access Codes
                </h2>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      style={{ backgroundColor: "#0A3D62", color: "white" }}
                      data-ocid="admin.open_modal_button"
                    >
                      <Plus size={16} className="mr-1" /> Create New Code
                    </Button>
                  </DialogTrigger>
                  <DialogContent data-ocid="admin.dialog">
                    <DialogHeader>
                      <DialogTitle>Create Access Code</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div>
                        <Label htmlFor="nc-code">Access Code</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            id="nc-code"
                            value={newCode.code}
                            onChange={(e) =>
                              setNewCode((p) => ({
                                ...p,
                                code: e.target.value.toUpperCase(),
                              }))
                            }
                            className="font-mono uppercase tracking-widest"
                            data-ocid="admin.input"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setNewCode((p) => ({ ...p, code: randomCode() }))
                            }
                          >
                            <Copy size={14} />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="nc-report">Report</Label>
                        <Select
                          value={newCode.reportId}
                          onValueChange={(v) =>
                            setNewCode((p) => ({ ...p, reportId: v }))
                          }
                        >
                          <SelectTrigger
                            className="mt-1"
                            data-ocid="admin.select"
                          >
                            <SelectValue placeholder="Select report" />
                          </SelectTrigger>
                          <SelectContent>
                            {REPORT_OPTIONS.map((r) => (
                              <SelectItem key={r.id} value={r.id}>
                                {r.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="nc-name">Subscriber Name</Label>
                        <Input
                          id="nc-name"
                          className="mt-1"
                          value={newCode.subscriberName}
                          onChange={(e) =>
                            setNewCode((p) => ({
                              ...p,
                              subscriberName: e.target.value,
                            }))
                          }
                          data-ocid="admin.input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nc-email">Subscriber Email</Label>
                        <Input
                          id="nc-email"
                          type="email"
                          className="mt-1"
                          value={newCode.subscriberEmail}
                          onChange={(e) =>
                            setNewCode((p) => ({
                              ...p,
                              subscriberEmail: e.target.value,
                            }))
                          }
                          data-ocid="admin.input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nc-wa">Subscriber WhatsApp</Label>
                        <Input
                          id="nc-wa"
                          type="tel"
                          className="mt-1"
                          value={newCode.subscriberWhatsapp}
                          onChange={(e) =>
                            setNewCode((p) => ({
                              ...p,
                              subscriberWhatsapp: e.target.value,
                            }))
                          }
                          data-ocid="admin.input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nc-txid">Transaction ID</Label>
                        <Input
                          id="nc-txid"
                          className="mt-1"
                          value={newCode.transactionId}
                          onChange={(e) =>
                            setNewCode((p) => ({
                              ...p,
                              transactionId: e.target.value,
                            }))
                          }
                          data-ocid="admin.input"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                        data-ocid="admin.cancel_button"
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={
                          createMutation.isPending ||
                          !newCode.code ||
                          !newCode.reportId ||
                          !newCode.subscriberName
                        }
                        onClick={() => createMutation.mutate(newCode)}
                        style={{ backgroundColor: "#0A3D62", color: "white" }}
                        data-ocid="admin.confirm_button"
                      >
                        {createMutation.isPending ? (
                          <>
                            <Loader2 size={14} className="animate-spin mr-1" />{" "}
                            Creating...
                          </>
                        ) : (
                          "Create Code"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {codesQuery.isLoading ? (
                <div
                  className="flex items-center justify-center py-12"
                  data-ocid="admin.loading_state"
                >
                  <Loader2
                    size={24}
                    className="animate-spin"
                    style={{ color: "#0A3D62" }}
                  />
                </div>
              ) : codes.length === 0 ? (
                <div
                  className="text-center py-12 text-gray-400"
                  data-ocid="admin.empty_state"
                >
                  No access codes yet. Create one above.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Report</TableHead>
                        <TableHead>Subscriber</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>WhatsApp</TableHead>
                        <TableHead>Txn ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {codes.map((ac, i) => (
                        <TableRow
                          key={ac.code}
                          data-ocid={`admin.row.${i + 1}`}
                        >
                          <TableCell
                            className="font-mono font-bold text-sm"
                            style={{ color: "#0A3D62" }}
                          >
                            {ac.code}
                          </TableCell>
                          <TableCell className="text-xs text-gray-600">
                            {REPORT_OPTIONS.find((r) => r.id === ac.reportId)
                              ?.name || ac.reportId}
                          </TableCell>
                          <TableCell className="text-sm">
                            {ac.subscriberName}
                          </TableCell>
                          <TableCell className="text-xs text-gray-600">
                            {ac.subscriberEmail}
                          </TableCell>
                          <TableCell className="text-xs text-gray-600">
                            {ac.subscriberWhatsapp}
                          </TableCell>
                          <TableCell className="text-xs text-gray-600 font-mono">
                            {ac.transactionId}
                          </TableCell>
                          <TableCell>
                            <Badge
                              style={{
                                backgroundColor: ac.isUsed
                                  ? "#FEF3C7"
                                  : "#D1FAE5",
                                color: ac.isUsed ? "#92400E" : "#065F46",
                              }}
                            >
                              {ac.isUsed ? "Used" : "Active"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-gray-400">
                            {formatDate(ac.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={deleteMutation.isPending}
                              onClick={() => deleteMutation.mutate(ac.code)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              data-ocid={`admin.delete_button.${i + 1}`}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="submissions">
            <div
              className="bg-white rounded-xl border shadow-sm"
              style={{ borderColor: "#e2e8f0" }}
            >
              <div
                className="px-6 py-4 border-b"
                style={{ borderColor: "#e2e8f0" }}
              >
                <h2 className="font-semibold" style={{ color: "#0A3D62" }}>
                  Payment Submissions
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {submissions.length} total
                </p>
              </div>

              {submissionsQuery.isLoading ? (
                <div
                  className="flex items-center justify-center py-12"
                  data-ocid="admin.loading_state"
                >
                  <Loader2
                    size={24}
                    className="animate-spin"
                    style={{ color: "#0A3D62" }}
                  />
                </div>
              ) : submissions.length === 0 ? (
                <div
                  className="text-center py-12 text-gray-400"
                  data-ocid="admin.empty_state"
                >
                  No payment submissions yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="admin.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>WhatsApp</TableHead>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Report</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map((s, i) => (
                        <TableRow
                          key={s.transactionId || String(i)}
                          data-ocid={`admin.row.${i + 1}`}
                        >
                          <TableCell className="font-medium">
                            {s.name}
                          </TableCell>
                          <TableCell className="text-xs text-gray-600">
                            {s.email}
                          </TableCell>
                          <TableCell className="text-xs text-gray-600">
                            {s.whatsapp}
                          </TableCell>
                          <TableCell className="text-xs font-mono text-gray-600">
                            {s.transactionId}
                          </TableCell>
                          <TableCell className="text-xs text-gray-600">
                            {REPORT_OPTIONS.find((r) => r.id === s.productId)
                              ?.name || s.productId}
                          </TableCell>
                          <TableCell
                            className="text-sm font-semibold"
                            style={{ color: "#16A085" }}
                          >
                            ₹{s.amount.toString()}
                          </TableCell>
                          <TableCell className="text-xs text-gray-400">
                            {formatDate(s.timestamp)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
