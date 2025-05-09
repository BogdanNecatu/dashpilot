import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { redirect } from "next/navigation";
import Dashboard from "@/widgets/dashboard/Dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Signed in as <strong>{session.user?.email}</strong>
      </p>
      <Dashboard />
    </section>
  );
}
