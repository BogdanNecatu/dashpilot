"use client";

import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce/useDebounce";
import { usePaginatedUsers } from "@/shared/hooks/usePaginatedUsers/usePaginatedUsers";
import PaginationControls from "../PaginationControls/PaginationControls";
import { User } from "@/entities/user/types";

type SortField = "name" | "birthDate" | "age";
type SortDirection = "asc" | "desc";

export default function UserTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const { users, totalPages, loading, error } = usePaginatedUsers(page, limit);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const filteredSortedUsers = useMemo(() => {
    const searchLower = debouncedSearch.toLowerCase();

    const filtered = users.filter(
      (u) =>
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchLower) ||
        u.email.toLowerCase().includes(searchLower)
    );

    const sorted = [...filtered].sort((a: User, b: User) => {
      let aVal: string | number;
      let bVal: string | number;

      if (sortField === "name") {
        aVal = `${a.firstName} ${a.lastName}`.toLowerCase();
        bVal = `${b.firstName} ${b.lastName}`.toLowerCase();
      } else if (sortField === "birthDate") {
        aVal = new Date(a.birthDate).getTime();
        bVal = new Date(b.birthDate).getTime();
      } else {
        aVal = a.age;
        bVal = b.age;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [users, debouncedSearch, sortField, sortDirection]);

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Búsqueda */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-2 py-1 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
            {filteredSortedUsers.map((u, i) => (
              <tr
                key={u.id}
                className="hover:bg-blue-100 dark:hover:bg-zinc-800 cursor-pointer"
                onClick={() => (window.location.href = `/dataset/${u.id}`)}
              >
                <td className="px-4 py-2 font-mono">
                  {(page - 1) * limit + i + 1}
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
