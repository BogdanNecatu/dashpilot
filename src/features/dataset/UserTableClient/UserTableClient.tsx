"use client";

import { useUserTable } from "./useUserTable";
import PaginationControls from "../PaginationControls/PaginationControls";
import UserTable from "../UserTable/UserTable"; 
export default function UserTableClient() {
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
          placeholder="Search by name..."
          className="px-2 py-1 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          spellCheck={false}
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
        <UserTable
          users={users}
          sortField={sortField}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
          page={page}
          limit={limit}
          hasSearch={hasSearch}
        />
      )}

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
