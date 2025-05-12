import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce/useDebounce";
import { usePaginatedUsers } from "@/shared/hooks/usePaginatedUsers/usePaginatedUsers";
import { User } from "@/entities/user/types";

export type SortField = "name" | "birthDate" | "age";
export type SortDirection = "asc" | "desc";

export const useUserTable = () => {
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

  return {
    page,
    limit,
    search,
    sortField,
    sortDirection,
    users: filteredSortedUsers,
    totalPages,
    loading,
    error,
    setPage,
    setLimit,
    setSearch,
    toggleSort,
  };
};
