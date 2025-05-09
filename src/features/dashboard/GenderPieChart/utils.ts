import { User } from "@/entities/user/types";

export const groupUsersByGender = (users: User[]) => {
  const genders: Record<string, number> = {};

  users.forEach((user) => {
    const gender = user.gender.toLowerCase();
    genders[gender] = (genders[gender] || 0) + 1;
  });

  return genders;
};
