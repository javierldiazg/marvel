import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./layout";

jest.mock("@/components/Header", () => ({
  Header: () => <header data-testid="header-mock">Mocked Header</header>,
}));

describe("RootLayout", () => {
  test("should be render", () => {
    const queryClient = new QueryClient();

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RootLayout>
            <div data-testid="children-content">Child Component</div>
          </RootLayout>
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByTestId("header-mock")).toBeInTheDocument();
    expect(screen.getByTestId("children-content")).toBeInTheDocument();
  });
});
