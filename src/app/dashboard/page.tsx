import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-muted-foreground">
          You are signed in as <strong>{session.user?.email}</strong>.
        </p>
      </div>
    </div>
  );
}
