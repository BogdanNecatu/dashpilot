import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { redirect } from "next/navigation";
import DashboardPanel from "@/features/dashboard/DashboardPanel/DashboardPanel";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <DashboardPanel />
    </section>
  );
}
