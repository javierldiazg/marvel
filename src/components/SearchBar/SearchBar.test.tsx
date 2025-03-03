import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "./index";

describe("SearchBar", () => {
  test("should render the input and results count", () => {
    render(<SearchBar onSearch={jest.fn()} resultsCount={5} />);

    expect(
      screen.getByPlaceholderText("SEARCH A CHARACTER")
    ).toBeInTheDocument();
    expect(screen.getByText("5 RESULTS")).toBeInTheDocument();
  });

  test("should call onSearch after debounce delay", async () => {
    jest.useFakeTimers();
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} resultsCount={0} />);

    const input = screen.getByPlaceholderText("SEARCH A CHARACTER");
    fireEvent.change(input, { target: { value: "Spider-Man" } });

    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("Spider-Man");
    });

    jest.useRealTimers();
  });

  test("should not call onSearch before debounce delay", () => {
    jest.useFakeTimers();
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} resultsCount={0} />);

    const input = screen.getByPlaceholderText("SEARCH A CHARACTER");
    fireEvent.change(input, { target: { value: "Iron Man" } });

    expect(mockOnSearch).not.toHaveBeenCalled();

    jest.useRealTimers();
  });
});
