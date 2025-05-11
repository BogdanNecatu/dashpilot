import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardClient from "@/features/dashboard/DashboardClient/DashboardClient";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <DashboardClient />
    </section>
  );
}
