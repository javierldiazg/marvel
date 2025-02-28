/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { ComicCard } from "./index";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("ComicCard", () => {
  const comic = {
    id: 1,
    title: "Spider-Man: The Amazing Web",
    dates: [{ date: "2000-05-01" }],
    thumbnail: { path: "http://example.com/spiderman", extension: "jpg" },
  };

  test("render the comic card correctly", () => {
    render(<ComicCard comic={comic} />);

    expect(screen.getByText("Spider-Man: The Amazing Web")).toBeInTheDocument();

    const image = screen.getByAltText("Spider-Man: The Amazing Web");
    expect(image).toHaveAttribute("src", "http://example.com/spiderman.jpg");

    expect(screen.getByText("2000")).toBeInTheDocument();
  });

  test("displays the comic title correctly", () => {
    render(<ComicCard comic={comic} />);

    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(
      "Spider-Man: The Amazing Web"
    );
  });

  test("displays the date correctly formatted", () => {
    render(<ComicCard comic={comic} />);

    expect(screen.getByText("2000")).toBeInTheDocument();
  });
});
