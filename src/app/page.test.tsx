import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { redirect } from "next/navigation";
import Home from "./page";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("Home", () => {
  test("should redirect to /characters", () => {
    render(<Home />);
    expect(redirect).toHaveBeenCalledWith("/characters");
  });
});
