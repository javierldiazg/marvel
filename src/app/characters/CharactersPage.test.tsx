import { render, screen, fireEvent } from "@testing-library/react";
import CharactersPage from "./page";
import { useCharacters } from "@/hooks/useCharacters";

jest.mock("../../hooks/useCharacters", () => ({
  useCharacters: jest.fn(),
}));

jest.mock("../../components/CharacterCard", () => ({
  CharacterCard: ({
    character,
  }: {
    character: { id: number; name: string };
  }) => <div data-testid="character-card">{character.name}</div>,
}));

jest.mock("../../components/SearchBar", () => ({
  SearchBar: ({ onSearch }: { onSearch: (term: string) => void }) => (
    <input
      data-testid="search-bar"
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search..."
    />
  ),
}));

describe("CharactersPage", () => {
  test("displays the loading message when isLoading is true", () => {
    (useCharacters as jest.Mock).mockReturnValue({
      characters: [],
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<CharactersPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays the error message when isError is true", () => {
    (useCharacters as jest.Mock).mockReturnValue({
      characters: [],
      isLoading: false,
      isError: true,
      error: { message: "API Error" },
    });

    render(<CharactersPage />);

    expect(screen.getByText("Error: API Error")).toBeInTheDocument();
  });

  test("render characters when characters has data", () => {
    (useCharacters as jest.Mock).mockReturnValue({
      characters: [
        { id: 1, name: "Spider-Man" },
        { id: 2, name: "Iron Man" },
      ],
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<CharactersPage />);

    expect(screen.getAllByTestId("character-card")).toHaveLength(2);
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.getByText("Iron Man")).toBeInTheDocument();
  });

  test("updates the search term as you type in the search bar", () => {
    (useCharacters as jest.Mock).mockReturnValue({
      characters: [],
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<CharactersPage />);

    const searchInput = screen.getByTestId("search-bar");
    fireEvent.change(searchInput, { target: { value: "Hulk" } });

    expect(searchInput).toHaveValue("Hulk");
  });
});
