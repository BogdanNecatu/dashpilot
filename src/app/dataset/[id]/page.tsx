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
  if (!session) redirect("/login");

  const { id } = params;
  return <UserDetailClient userId={id} />;
}
