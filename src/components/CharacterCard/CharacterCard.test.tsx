/* eslint-disable @next/next/no-img-element */
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { CharacterCard } from "./index";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

jest.mock("../FavoriteButton", () => ({
  FavoriteButton: ({ character }: { character: { name: string } }) => (
    <button>{`Favorite ${character.name}`}</button>
  ),
}));

describe("CharacterCard", () => {
  const character = {
    id: 1,
    name: "Spider-Man",
    thumbnail: { path: "http://example.com/spiderman", extension: "jpg" },
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReset();
  });

  test("render the character card correctly", () => {
    render(<CharacterCard character={character} />);

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();

    const image = screen.getByAltText("Spider-Man");
    expect(image).toHaveAttribute("src", "http://example.com/spiderman.jpg");
  });

  test("redirects when clicking on the character card", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<CharacterCard character={character} />);

    fireEvent.click(screen.getByRole("button"));

    expect(push).toHaveBeenCalledWith("/characters/1");
  });

  test("shows the favorite button with the character name", () => {
    render(<CharacterCard character={character} />);

    expect(screen.getByText("Favorite Spider-Man")).toBeInTheDocument();
  });
});
