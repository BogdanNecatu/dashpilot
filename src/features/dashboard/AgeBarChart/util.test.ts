import { groupUsersByAgeRange } from "./utils";
import { User } from "@/entities/user/types";

describe("groupUsersByAgeRange", () => {
  it("should correctly categorize users by age group", () => {
    const users: User[] = [
      { id: 1, age: 18 },
      { id: 2, age: 25 },
      { id: 3, age: 35 },
      { id: 4, age: 45 },
      { id: 5, age: 55 },
    ];

    const result = groupUsersByAgeRange(users);

    expect(result).toEqual({
      "0-20": 1,
      "21-30": 1,
      "31-40": 1,
      "41-50": 1,
      "51+": 1,
    });
  });

  it("should return an empty group structure when there are no users", () => {
    const result = groupUsersByAgeRange([]);
    expect(result).toEqual({
      "0-20": 0,
      "21-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51+": 0,
    });
  });
});
