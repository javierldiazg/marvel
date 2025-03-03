import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "@/context/FavoritesContext";
import RootLayout from "./layout";

jest.mock("../components/Header", () => ({
  Header: () => <header data-testid="header-mock">Mocked Header</header>,
}));

describe("RootLayout", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  test("renders the RootLayout with Header and children", () => {
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

  test("ensures HTML structure is correct", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <RootLayout>
            <div>Child Component</div>
          </RootLayout>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(document.documentElement).toHaveAttribute("lang", "en");
    expect(document.body).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // <footer />
  });

  test("ensures FavoritesProvider is used", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <RootLayout>
            <div>Child Component</div>
          </RootLayout>
        </FavoritesProvider>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("header-mock")).toBeInTheDocument();
    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });
});
