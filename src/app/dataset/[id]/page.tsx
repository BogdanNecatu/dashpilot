import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/api/auth";
import { redirect } from "next/navigation";
import UserDetailClient from "@/features/dataset/UserDetail/UserDetailClient/UserDetailClient";

export default async function UserDetailPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return <UserDetailClient />;
}
