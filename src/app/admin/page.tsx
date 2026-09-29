import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./components/AdminDashboard";
import { getAllBookings, getBookingStats } from "@/actions/bookings";
import { getSettings } from "@/actions/settings";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await verifyAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [statsResult, bookingsResult, settingsList] = await Promise.all([
    getBookingStats(),
    getAllBookings(),
    getSettings(),
  ]);

  const initialSettings: Record<string, unknown> = {};
  settingsList.forEach((s) => {
    initialSettings[s.key] = s.value;
  });

  return (
    <AdminDashboard
      stats={statsResult}
      initialBookings={bookingsResult.bookings || []}
      initialSettings={initialSettings}
      username={session.username}
    />
  );
}
