import { CharacterType } from "./constants";

describe("constants", () => {
  test("CharacterType", () => {
    const mockCharacter: CharacterType = {
      id: 1,
      name: "Spider-Man",
      thumbnail: { path: "path/to/thumbnail", extension: "jpg" },
    };
    expect(mockCharacter).toEqual({
      id: 1,
      name: "Spider-Man",
      thumbnail: { path: "path/to/thumbnail", extension: "jpg" },
    });
  });
});
