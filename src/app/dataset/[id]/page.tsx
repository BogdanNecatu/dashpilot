import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { redirect } from "next/navigation";
import UserDetailClient from "@/features/dataset/UserDetail/UserDetailClient/UserDetailClient";

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">User Detail</h2>
      <UserDetailClient userId={params.id} />
    </section>
  );
}
