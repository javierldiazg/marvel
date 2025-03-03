import { render, screen, fireEvent } from "@testing-library/react";
import { useFavorites } from "@/context/FavoritesContext";
import { FavoriteButton } from "./index";

jest.mock("../../context/FavoritesContext", () => ({
  useFavorites: jest.fn(),
}));

describe("FavoriteButton", () => {
  const mockDispatch = jest.fn();

  const characterMock = {
    id: 1,
    name: "Spider-Man",
    thumbnail: { path: "spiderman", extension: "jpg" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the FavoriteButton", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      state: { favorites: [] },
      dispatch: mockDispatch,
    });

    render(<FavoriteButton character={characterMock} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should apply active class if character is a favorite", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      state: { favorites: [characterMock] },
      dispatch: mockDispatch,
    });

    render(<FavoriteButton character={characterMock} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("active");
  });

  it("should dispatch TOGGLE_FAVORITE action when clicked", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      state: { favorites: [] },
      dispatch: mockDispatch,
    });

    render(<FavoriteButton character={characterMock} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "TOGGLE_FAVORITE",
      payload: characterMock,
    });
  });

  it("should stop event propagation on click", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      state: { favorites: [] },
      dispatch: mockDispatch,
    });

    render(<FavoriteButton character={characterMock} />);

    const button = screen.getByRole("button");
    const event = new MouseEvent("click", { bubbles: true });
    jest.spyOn(event, "stopPropagation");

    button.dispatchEvent(event);

    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });
});
