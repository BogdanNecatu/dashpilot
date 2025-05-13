import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce/useDebounce";
import { User } from "@/entities/user/types";
import { useUserStore } from "@/entities/user/store/useUserStore";

export type SortField = "name" | "birthDate" | "age";
export type SortDirection = "asc" | "desc";

export const useUserTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const allUsers = useUserStore((state) => state.users);
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);

  useEffect(() => {
    if (typeof window !== "undefined") {
      useUserStore.getState().hydrateUsers();
    }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const filteredSortedUsers = useMemo(() => {
    const searchLower = debouncedSearch.toLowerCase();

    const filtered = allUsers.filter((u) => {
      const first = u.firstName.toLowerCase();
      const last = u.lastName.toLowerCase();
      return first.includes(searchLower) || last.includes(searchLower);
    });

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
  }, [allUsers, debouncedSearch, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredSortedUsers.length / limit);
  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredSortedUsers.slice(start, start + limit);
  }, [filteredSortedUsers, page, limit]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return {
    users: paginatedUsers,
    totalPages,
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    toggleSort,
    loading,
    error,
  };
};
