import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCharacters } from "./useCharacters";
import { getCharacters } from "@/services/marvel";

jest.mock("../services/marvel", () => ({
  getCharacters: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCharacters hook", () => {
  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  test("should return loading initially", async () => {
    (getCharacters as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useCharacters("spider"), { wrapper });

    expect(result.current.isLoading).toBe(true);
  });

  test("should return data when the query is successful", async () => {
    const mockCharacters = [{ id: 1, name: "Spider-Man" }];
    (getCharacters as jest.Mock).mockResolvedValueOnce(mockCharacters);

    const { result } = renderHook(() => useCharacters("spider"), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.characters).toEqual(mockCharacters);
    expect(result.current.isError).toBe(false);
  });
});
