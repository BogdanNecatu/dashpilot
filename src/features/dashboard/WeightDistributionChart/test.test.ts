import { groupUsersByWeightRange } from "./utils";
import { User } from "@/entities/user/types";

describe("groupUsersByWeightRange", () => {
  it("should correctly categorize users by weight range", () => {
    const users: User[] = [
      { id: 1, weight: 45 },
      { id: 2, weight: 52 },
      { id: 3, weight: 65 },
      { id: 4, weight: 78 },
      { id: 5, weight: 85 },
      { id: 6, weight: 95 },
      { id: 7, weight: 105 },
    ];

    const result = groupUsersByWeightRange(users);

    expect(result).toEqual({
      "40-49kg": 1,
      "50-59kg": 1,
      "60-69kg": 1,
      "70-79kg": 1,
      "80-89kg": 1,
      "90-99kg": 1,
      "100kg+": 1,
    });
  });

  it("should return an empty weight structure when there are no users", () => {
    const result = groupUsersByWeightRange([]);
    expect(result).toEqual({
      "40-49kg": 0,
      "50-59kg": 0,
      "60-69kg": 0,
      "70-79kg": 0,
      "80-89kg": 0,
      "90-99kg": 0,
      "100kg+": 0,
    });
  });

  it("should correctly group users on category boundaries", () => {
    const users: User[] = [
      { id: 1, weight: 45 },
      { id: 2, weight: 46 },
      { id: 3, weight: 58 },
      { id: 4, weight: 59 },
      { id: 5, weight: 69 },
      { id: 6, weight: 70 },
    ];

    const result = groupUsersByWeightRange(users);

    expect(result).toEqual({
      "40-49kg": 2,
      "50-59kg": 2,
      "60-69kg": 1,
      "70-79kg": 1,
      "80-89kg": 0,
      "90-99kg": 0,
      "100kg+": 0,
    });
  });
});
