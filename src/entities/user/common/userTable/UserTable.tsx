"use client";

import { usePaginatedUsers } from "@/shared/hooks/usePaginatedUsers/usePaginatedUsers";
import { useState } from "react";

import { User } from "../../types";

export default function UserTable() {
  const [page, setPage] = useState(1);
  const { users, loading, error, totalPages } = usePaginatedUsers(page);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Birth</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: User) => (
            <tr key={u.id} className="text-center">
              <td>
                {u.firstName} {u.lastName}
              </td>
              <td>{u.email}</td>
              <td>{u.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
