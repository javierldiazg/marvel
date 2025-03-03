import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "./reactQueryClient";

describe("queryClient", () => {
  test("should be instantiated with the correct default options", () => {
    expect(queryClient).toBeInstanceOf(QueryClient);

    const defaultOptions = queryClient.getDefaultOptions();

    expect(defaultOptions.queries?.staleTime).toBe(1000 * 60 * 60 * 24);
    expect(defaultOptions.queries?.retry).toBe(2);
    expect(defaultOptions.queries?.refetchOnWindowFocus).toBe(false);
  });
});
