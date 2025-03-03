import { render, screen, fireEvent } from "@testing-library/react";
import { useFavorites } from "@/context/FavoritesContext";
import { CharacterType } from "../../utils/constants";
import FavoritesPage from "./page";

jest.mock("../../context/FavoritesContext", () => ({
  useFavorites: jest.fn(),
}));

jest.mock("../../components/CharacterCard", () => ({
  CharacterCard: ({ character }: { character: CharacterType }) => (
    <div data-testid="character-card">{character.name}</div>
  ),
}));

describe("FavoritesPage", () => {
  const mockFavorites = [
    { id: 1, name: "Iron Man", thumbnail: { path: "", extension: "" } },
    { id: 2, name: "Spider-Man", thumbnail: { path: "", extension: "" } },
  ];

  beforeEach(() => {
    (useFavorites as jest.Mock).mockReturnValue({
      state: { favorites: mockFavorites },
    });
  });

  it("renders the FavoritesPage with a search input and results count", () => {
    render(<FavoritesPage />);

    expect(screen.getByText("FAVORITES")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("SEARCH A CHARACTER")
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockFavorites.length} RESULTS`)
    ).toBeInTheDocument();
  });

  it("displays favorite characters", () => {
    render(<FavoritesPage />);

    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
  });

  it("filters favorites based on search input", () => {
    render(<FavoritesPage />);

    const input = screen.getByPlaceholderText("SEARCH A CHARACTER");

    fireEvent.change(input, { target: { value: "iron" } });

    expect(screen.getByText("Iron Man")).toBeInTheDocument();
    expect(screen.queryByText("Spider-Man")).not.toBeInTheDocument();
  });

  it("shows empty message when no characters match the search", () => {
    render(<FavoritesPage />);

    const input = screen.getByPlaceholderText("SEARCH A CHARACTER");

    fireEvent.change(input, { target: { value: "Thor" } });

    expect(
      screen.getByText("There are no favorite characters with that name.")
    ).toBeInTheDocument();
  });
});
