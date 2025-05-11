import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "@/features/dashboard/DashboardClient/DashboardClient";
import { fetchAllUsers } from "@/entities/user/service/service";
import { useUserStore } from "@/entities/user/store/useUserStore";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { hasUsers, setUsers } = useUserStore.getState();

  if (!hasUsers()) {
    const { users, total } = await fetchAllUsers();
    setUsers(users, total, 1, 20);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <DashboardClient />
    </section>
  );
}
