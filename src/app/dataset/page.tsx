import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { redirect } from "next/navigation";
import UserTable from "@/features/dataset/UserTable/UserTable";
import { fetchAllUsers } from "@/entities/user/service/service";
import { useUserStore } from "@/entities/user/store/useUserStore";
export default async function DatasetPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { hasUsers, setUsers } = useUserStore.getState();

  if (!hasUsers()) {
    const { users, total } = await fetchAllUsers();
    setUsers(users, total, 1, 20);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Dataset</h2>
      <p className="mb-4 text-gray-600">
        Users can search and sort the available data by name, age, and birth
        date.
      </p>
      <UserTable />
    </section>
  );
}
