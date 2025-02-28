/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { Favorite } from "./index";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

describe("Favorite", () => {
  test("Renderiza el icono de corazón lleno cuando isFavorite es true", () => {
    render(<Favorite isFavorite={true} />);

    const image = screen.getByAltText("Marvel Logo");
    expect(image).toHaveAttribute("src", "/images/heart-icon.png");
  });

  test("Renderiza el icono de corazón vacío cuando isFavorite es false", () => {
    render(<Favorite isFavorite={false} />);

    const image = screen.getByAltText("Marvel Logo");
    expect(image).toHaveAttribute("src", "/images/heart-empty-icon.png");
  });

  test("Ajusta el tamaño de la imagen cuando type es 'detail'", () => {
    render(<Favorite isFavorite={true} type="detail" />);

    const image = screen.getByAltText("Marvel Logo");
    expect(image).toHaveAttribute("width", "24");
    expect(image).toHaveAttribute("height", "22");
  });

  test("Ajusta el tamaño de la imagen cuando type es 'list'", () => {
    render(<Favorite isFavorite={true} type="list" />);

    const image = screen.getByAltText("Marvel Logo");
    expect(image).toHaveAttribute("width", "12");
    expect(image).toHaveAttribute("height", "10");
  });

  test("No muestra el atributo 'type' si no se pasa", () => {
    render(<Favorite isFavorite={true} />);

    const image = screen.getByAltText("Marvel Logo");
    expect(image).toHaveAttribute("width", "12");
    expect(image).toHaveAttribute("height", "10");
  });
});
