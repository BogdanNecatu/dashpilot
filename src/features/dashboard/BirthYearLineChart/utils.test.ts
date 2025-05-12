import { groupUsersByBirthYear } from "./utils";
import { User } from "@/entities/user/types";

describe("groupUsersByBirthYear", () => {
  it("should correctly count users by birth year", () => {
    const users: User[] = [
      { id: 1, birthDate: "1990-05-12" },
      { id: 2, birthDate: "1990-08-22" },
      { id: 3, birthDate: "1985-01-10" },
      { id: 4, birthDate: "2000-07-15" },
      { id: 5, birthDate: "1985-03-30" },
    ];

    const result = groupUsersByBirthYear(users);

    expect(result).toEqual({
      1985: 2,
      1990: 2,
      2000: 1,
    });
  });

  it("should return an empty object when no users are provided", () => {
    const result = groupUsersByBirthYear([]);
    expect(result).toEqual({});
  });

  it("should correctly sort birth years in ascending order", () => {
    const users: User[] = [
      { id: 1, birthDate: "2005-02-20" },
      { id: 2, birthDate: "1995-10-25" },
      { id: 3, birthDate: "1980-07-08" },
      { id: 4, birthDate: "1990-04-18" },
    ];

    const result = groupUsersByBirthYear(users);
    expect(Object.keys(result)).toEqual(["1980", "1990", "1995", "2005"]);
  });
});
