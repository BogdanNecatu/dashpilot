import { User } from "@/entities/user/types";

export function groupUsersByWeightRange(users: User[]) {
  const ranges = {
    "40-49kg": 0,
    "50-59kg": 0,
    "60-69kg": 0,
    "70-79kg": 0,
    "80-89kg": 0,
    "90-99kg": 0,
    "100kg+": 0,
  };

  users.forEach((u) => {
    const w = u.weight;
    if (w < 50) ranges["40-49kg"]++;
    else if (w < 60) ranges["50-59kg"]++;
    else if (w < 70) ranges["60-69kg"]++;
    else if (w < 80) ranges["70-79kg"]++;
    else if (w < 90) ranges["80-89kg"]++;
    else if (w < 100) ranges["90-99kg"]++;
    else ranges["100kg+"]++;
  });

  return ranges;
}
