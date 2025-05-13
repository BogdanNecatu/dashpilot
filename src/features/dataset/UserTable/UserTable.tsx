"use client";

import { User } from "@/entities/user/types";
import React from "react";

type Props = {
  users: User[];
  sortField: "name" | "birthDate" | "age";
  sortDirection: "asc" | "desc";
  toggleSort: (field: "name" | "birthDate" | "age") => void;
  page: number;
  limit: number;
  hasSearch: boolean;
};

export default function UserTable({
  users,
  sortField,
  sortDirection,
  toggleSort,
  page,
  limit,
  hasSearch,
}: Props) {
  const renderArrow = (field: "name" | "birthDate" | "age") => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "▲" : "▼";
  };

  return (
    <div className="w-full overflow-x-auto border rounded shadow-sm">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-left">
          <tr className="text-black dark:text-white">
            <th className="px-4 py-2 whitespace-nowrap min-w-[40px]">#</th>
            <th
              className="px-4 py-2 whitespace-nowrap min-w-[160px] cursor-pointer"
              onClick={() => toggleSort("name")}
            >
              Name {renderArrow("name")}
            </th>
            <th className="px-4 py-2 whitespace-nowrap min-w-[100px]">
              Gender
            </th>
            <th
              className="px-4 py-2 whitespace-nowrap min-w-[80px] cursor-pointer"
              onClick={() => toggleSort("age")}
            >
              Age {renderArrow("age")}
            </th>
            <th
              className="px-4 py-2 whitespace-nowrap min-w-[120px] cursor-pointer"
              onClick={() => toggleSort("birthDate")}
            >
              Birth Date {renderArrow("birthDate")}
            </th>
            <th className="px-4 py-2 whitespace-nowrap min-w-[240px]">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr
              key={u.id}
              className="hover:bg-blue-100 dark:hover:bg-zinc-800 cursor-pointer"
              onClick={() => (window.location.href = `/dataset/${u.id}`)}
            >
              <td className="px-4 py-2 font-mono whitespace-nowrap">
                {hasSearch ? i + 1 : (page - 1) * limit + i + 1}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {u.firstName} {u.lastName}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{u.gender}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.age}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.birthDate}</td>
              <td className="px-4 py-2 whitespace-nowrap">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
