import { User } from "@/entities/user/types";

export const groupUsersByAgeRange = (users: User[]) => {
  const ageGroups = {
    "0-20": 0,
    "21-30": 0,
    "31-40": 0,
    "41-50": 0,
    "51+": 0,
  };

  users.forEach((u) => {
    if (u.age <= 20) ageGroups["0-20"]++;
    else if (u.age <= 30) ageGroups["21-30"]++;
    else if (u.age <= 40) ageGroups["31-40"]++;
    else if (u.age <= 50) ageGroups["41-50"]++;
    else ageGroups["51+"]++;
  });

  return ageGroups;
};
