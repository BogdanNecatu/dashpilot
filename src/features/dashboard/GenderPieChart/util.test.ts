import { groupUsersByGender } from "./utils";
import { User } from "@/entities/user/types";

describe("groupUsersByGender", () => {
  it("should correctly count users by gender", () => {
    const users: User[] = [
      { id: 1, gender: "male" },
      { id: 2, gender: "female" },
      { id: 3, gender: "male" },
      { id: 4, gender: "female" },
      { id: 5, gender: "other" },
    ];

    const result = groupUsersByGender(users);

    expect(result).toEqual({
      male: 2,
      female: 2,
      other: 1,
    });
  });

  it("should return an empty object when no users are provided", () => {
    const result = groupUsersByGender([]);
    expect(result).toEqual({});
  });

  it("should handle mixed case gender inputs", () => {
    const users: User[] = [
      { id: 1, gender: "Male" },
      { id: 2, gender: "FEMALE" },
      { id: 3, gender: "male" },
      { id: 4, gender: "female" },
    ];

    const result = groupUsersByGender(users);

    expect(result).toEqual({
      male: 2,
      female: 2,
    });
  });
});
