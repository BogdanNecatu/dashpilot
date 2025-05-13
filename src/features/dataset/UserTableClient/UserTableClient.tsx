"use client";

import { useUserTable } from "./useUserTable";
import PaginationControls from "../PaginationControls/PaginationControls";

export default function UserTable() {
  const {
    page,
    limit,
    search,
    users,
    totalPages,
    loading,
    error,
    setPage,
    setLimit,
    setSearch,
    toggleSort,
    sortField,
    sortDirection,
  } = useUserTable();

  const hasSearch = search.trim().length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-2 py-1 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {!hasSearch && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          limit={limit}
          onLimitChange={setLimit}
        />
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="text-center text-gray-500">No users found.</p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto border rounded shadow-sm">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 text-left">
              <tr className="text-black dark:text-white">
                <th className="px-4 py-2">#</th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => toggleSort("name")}
                >
                  Name{" "}
                  {sortField === "name"
                    ? sortDirection === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
                <th className="px-4 py-2">Email</th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => toggleSort("birthDate")}
                >
                  Birth Date{" "}
                  {sortField === "birthDate"
                    ? sortDirection === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => toggleSort("age")}
                >
                  Age{" "}
                  {sortField === "age"
                    ? sortDirection === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
                <th className="px-4 py-2">Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={u.id}
                  className="hover:bg-blue-100 dark:hover:bg-zinc-800 cursor-pointer"
                  onClick={() => (window.location.href = `/dataset/${u.id}`)}
                >
                  <td className="px-4 py-2 font-mono">
                    {hasSearch ? i + 1 : (page - 1) * limit + i + 1}
                  </td>
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
      )}

      {/* Pagination again if not searching */}
      {!hasSearch && users.length > 0 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          limit={limit}
          onLimitChange={setLimit}
        />
      )}
    </div>
  );
}
