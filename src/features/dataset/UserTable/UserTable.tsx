"use client";

import { useState } from "react";
import { usePaginatedUsers } from "@/shared/hooks/usePaginatedUsers/usePaginatedUsers";
import PaginationControls from "../PaginationControls/PaginationControls";

export default function UserTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { users, totalPages, loading, error } = usePaginatedUsers(page, limit);

  return (
    <div className="flex flex-col gap-4">
      {/* Paginación superior */}
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={setLimit}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Birth Date</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">
                  {u.firstName} {u.lastName}
                </td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.birthDate}</td>
                <td className="px-4 py-2">{u.age}</td>
                <td className="px-4 py-2">{u.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación inferior */}
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={setLimit}
      />
    </div>
  );
}
