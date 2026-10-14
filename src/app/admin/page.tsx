import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="surfboard-line-grid min-h-screen bg-white dark:bg-stone-950">
      <AdminDashboard />
    </div>
  );
}
