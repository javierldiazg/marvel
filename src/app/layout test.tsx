import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "@/context/FavoritesContext";
import RootLayout from "./layout";

jest.mock("@/components/Header", () => ({
  Header: () => <header data-testid="header-mock">Mocked Header</header>,
}));

describe("RootLayout", () => {
  test("should render correctly", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <RootLayout>
            <div data-testid="children-content">Child Component</div>
          </RootLayout>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("header-mock")).toBeInTheDocument();
    expect(screen.getByTestId("children-content")).toBeInTheDocument();
  });
});
