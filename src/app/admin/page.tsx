import { verifyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./components/AdminDashboard";
import { getAllBookings, getBookingStats } from "@/actions/bookings";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await verifyAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [statsResult, bookingsResult] = await Promise.all([
    getBookingStats(),
    getAllBookings(),
  ]);

  return (
    <AdminDashboard
      stats={statsResult}
      initialBookings={bookingsResult.bookings || []}
      username={session.username}
    />
  );
}
