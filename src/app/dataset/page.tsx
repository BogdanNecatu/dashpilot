import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { redirect } from "next/navigation";
import UserTable from "@/entities/user/common/userTable/UserTable";

export default async function DatasetPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Dataset</h2>
      <UserTable />
    </section>
  );
}
