/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import CharacterPage from "./page";
import { useParams } from "next/navigation";
import { useCharacterDetail } from "@/hooks/useCharacterDetail";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

jest.mock("../../../hooks/useCharacterDetail", () => ({
  useCharacterDetail: jest.fn(),
}));

jest.mock("../../../components/ComicCard", () => ({
  ComicCard: ({ comic }: { comic: { id: number; title: string } }) => (
    <div data-testid="comic-card">{comic.title}</div>
  ),
}));

jest.mock("../../../components/FavoriteButton", () => ({
  FavoriteButton: () => <button data-testid="favorite-button">Favorite</button>,
}));

describe("CharacterPage", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "1001" });
  });

  test("displays the loading message when isLoadingCharacter is true", () => {
    (useCharacterDetail as jest.Mock).mockReturnValue({
      character: null,
      comics: [],
      isLoadingCharacter: true,
      isLoadingComics: false,
    });

    render(<CharacterPage />);

    expect(screen.getByText("Cargando personaje...")).toBeInTheDocument();
  });

  test("renders the character correctly when isLoadingCharacter is false", () => {
    (useCharacterDetail as jest.Mock).mockReturnValue({
      character: {
        id: 1001,
        name: "Spider-Man",
        description: "Friendly Neighborhood Spider-Man",
        thumbnail: { path: "http://example.com/spiderman", extension: "jpg" },
      },
      comics: [],
      isLoadingCharacter: false,
      isLoadingComics: false,
    });

    render(<CharacterPage />);

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(
      screen.getByText("Friendly Neighborhood Spider-Man")
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Spider-Man" })).toHaveAttribute(
      "src",
      "http://example.com/spiderman.jpg"
    );
    expect(screen.getByTestId("favorite-button")).toBeInTheDocument();
  });

  test("renders the character correctly without description", () => {
    (useCharacterDetail as jest.Mock).mockReturnValue({
      character: {
        id: 1001,
        name: "Spider-Man",
        description: "",
        thumbnail: { path: "http://example.com/spiderman", extension: "jpg" },
      },
      comics: [],
      isLoadingCharacter: false,
      isLoadingComics: false,
    });

    render(<CharacterPage />);

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.queryByText("Friendly Neighborhood Spider-Man")).toBeNull();
  });

  test("render comics when available", () => {
    (useCharacterDetail as jest.Mock).mockReturnValue({
      character: {
        id: 1001,
        name: "Spider-Man",
        description: "Friendly Neighborhood Spider-Man",
        thumbnail: { path: "http://example.com/spiderman", extension: "jpg" },
      },
      comics: [
        { id: 2001, title: "Amazing Spider-Man #1" },
        { id: 2002, title: "Ultimate Spider-Man #1" },
      ],
      isLoadingCharacter: false,
      isLoadingComics: false,
    });

    render(<CharacterPage />);

    expect(screen.getAllByTestId("comic-card")).toHaveLength(2);
    expect(screen.getByText("Amazing Spider-Man #1")).toBeInTheDocument();
    expect(screen.getByText("Ultimate Spider-Man #1")).toBeInTheDocument();
  });

  test("does not render comic cards when comics are empty", () => {
    (useCharacterDetail as jest.Mock).mockReturnValue({
      character: {
        id: 1001,
        name: "Spider-Man",
        description: "Friendly Neighborhood Spider-Man",
        thumbnail: { path: "http://example.com/spiderman", extension: "jpg" },
      },
      comics: [],
      isLoadingCharacter: false,
      isLoadingComics: false,
    });

    render(<CharacterPage />);

    expect(screen.queryByTestId("comic-card")).toBeNull();
  });

  test("displays 'Loading comics...' when isLoadingComics is true", () => {
    (useCharacterDetail as jest.Mock).mockReturnValue({
      character: {
        id: 1001,
        name: "Spider-Man",
        description: "Friendly Neighborhood Spider-Man",
        thumbnail: { path: "http://example.com/spiderman", extension: "jpg" },
      },
      comics: [],
      isLoadingCharacter: false,
      isLoadingComics: true,
    });

    render(<CharacterPage />);

    expect(screen.getByText("Loading comics...")).toBeInTheDocument();
  });

  test("renders styles and image container", () => {
    (useCharacterDetail as jest.Mock).mockReturnValue({
      character: {
        id: 1001,
        name: "Spider-Man",
        description: "Friendly Neighborhood Spider-Man",
        thumbnail: { path: "http://example.com/spiderman", extension: "jpg" },
      },
      comics: [],
      isLoadingCharacter: false,
      isLoadingComics: false,
    });

    render(<CharacterPage />);

    const heroContainer = screen.getByTestId("hero-container");
    expect(heroContainer).toBeInTheDocument();

    const heroImage = screen.getByRole("img", { name: "Spider-Man" });
    expect(heroImage).toBeInTheDocument();
  });
});
