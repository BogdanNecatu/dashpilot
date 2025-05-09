import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { redirect } from "next/navigation";

export default async function DatasetPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Dataset</h2>
      <p>This is protected data visible only to authenticated users.</p>
    </section>
  );
}
