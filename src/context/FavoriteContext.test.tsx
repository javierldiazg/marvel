import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FavoritesProvider, useFavorites } from "./FavoritesContext";

beforeAll(() => {
  const localStorageMock = (function () {
    let store: { [key: string]: string } = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
    };
  })();
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
});

describe("FavoritesProvider", () => {
  const mockCharacter = {
    id: 1,
    name: "Spider-Man",
    thumbnail: { path: "", extension: "" },
  };

  const TestComponent = () => {
    const { state, dispatch } = useFavorites();

    return (
      <div>
        <button
          onClick={() =>
            dispatch({ type: "TOGGLE_FAVORITE", payload: mockCharacter })
          }
        >
          Toggle Favorite
        </button>
        <div data-testid="favorites-count">{state.favorites.length}</div>
        <div data-testid="favorites-names">
          {state.favorites.map((character) => character.name).join(", ")}
        </div>
      </div>
    );
  };

  test("should initialize with empty favorites", () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    expect(screen.getByTestId("favorites-count")).toHaveTextContent("0");
    expect(screen.getByTestId("favorites-names")).toBeEmptyDOMElement();
  });

  test("should toggle favorite on button click", async () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText("Toggle Favorite"));

    await waitFor(() => {
      expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");
      expect(screen.getByTestId("favorites-names")).toHaveTextContent(
        "Spider-Man"
      );
    });

    fireEvent.click(screen.getByText("Toggle Favorite"));

    await waitFor(() => {
      expect(screen.getByTestId("favorites-count")).toHaveTextContent("0");
      expect(screen.getByTestId("favorites-names")).toBeEmptyDOMElement();
    });
  });

  test("should persist favorites in localStorage", async () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText("Toggle Favorite"));

    await waitFor(() => {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      expect(storedFavorites.length).toBe(1);
      expect(storedFavorites[0].name).toBe("Spider-Man");
    });
  });

  test("should load favorites from localStorage on mount", async () => {
    localStorage.setItem("favorites", JSON.stringify([mockCharacter]));

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");
      expect(screen.getByTestId("favorites-names")).toHaveTextContent(
        "Spider-Man"
      );
    });
  });
});
