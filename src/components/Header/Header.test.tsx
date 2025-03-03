import { render, screen } from "@testing-library/react";
import { useFavorites } from "@/context/FavoritesContext";
import { Header } from "./index";

jest.mock("../../context/FavoritesContext", () => ({
  useFavorites: jest.fn(),
}));

describe("Header", () => {
  it("should render the Marvel logo and favorites link", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      state: { favorites: [] },
    });

    render(<Header />);

    expect(screen.getByAltText("Marvel Logo")).toBeInTheDocument();

    const favoritesLink = screen.getByRole("link", { name: /heart icon/i });
    expect(favoritesLink).toHaveAttribute("href", "/favorites");
  });

  it("should display the correct number of favorites", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      state: { favorites: [{ id: 1 }, { id: 2 }] },
    });

    render(<Header />);

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
