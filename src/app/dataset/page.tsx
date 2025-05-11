import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DatasetClient from "@/features/dataset/UserTableClient/UserTableClient";

export default async function DatasetPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Dataset</h2>
      <p className="mb-4 text-gray-600">
        Users can search and sort the available data by name, age, and birth
        date.
      </p>
      <DatasetClient />
    </section>
  );
}
