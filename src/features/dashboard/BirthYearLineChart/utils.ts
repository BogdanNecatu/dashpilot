import { User } from "@/entities/user/types";

export const groupUsersByBirthYear = (users: User[]) => {
  const yearCounts: Record<string, number> = {};

  users.forEach((user) => {
    const year = new Date(user.birthDate).getFullYear();
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });

  return Object.fromEntries(
    Object.entries(yearCounts).sort(([a], [b]) => Number(a) - Number(b))
  );
};
