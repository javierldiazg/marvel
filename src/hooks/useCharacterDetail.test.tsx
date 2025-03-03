import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCharacterDetail } from "../hooks/useCharacterDetail";
import {
  getCharacterById,
  getCharacterComics,
} from "@/services/characterRepository";

jest.mock("../services/characterRepository", () => ({
  getCharacterById: jest.fn(),
  getCharacterComics: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useCharacterDetail hook", () => {
  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  test("should return loading initially", async () => {
    (getCharacterById as jest.Mock).mockResolvedValueOnce(null);
    (getCharacterComics as jest.Mock).mockResolvedValueOnce([]);

    const { result } = renderHook(() => useCharacterDetail("1011334"), {
      wrapper,
    });

    expect(result.current.isLoadingCharacter).toBe(true);
    expect(result.current.isLoadingComics).toBe(true);
  });

  test("should return data when the query is successful", async () => {
    const mockCharacter = { id: "1011334", name: "Spider-Man" };
    const mockComics = [{ id: "123", title: "Amazing Spider-Man" }];

    (getCharacterById as jest.Mock).mockResolvedValueOnce(mockCharacter);
    (getCharacterComics as jest.Mock).mockResolvedValueOnce(mockComics);

    const { result } = renderHook(() => useCharacterDetail("1011334"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoadingCharacter).toBe(false));
    await waitFor(() => expect(result.current.isLoadingComics).toBe(false));

    expect(result.current.character).toEqual(mockCharacter);
    expect(result.current.comics).toEqual(mockComics);
  });

  test("must handle errors correctly", async () => {
    (getCharacterById as jest.Mock).mockRejectedValueOnce(
      new Error("Character not found")
    );
    (getCharacterComics as jest.Mock).mockRejectedValueOnce(
      new Error("Comics not found")
    );

    const { result } = renderHook(() => useCharacterDetail("1011334"), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isLoadingCharacter).toBe(false));
    await waitFor(() => expect(result.current.isLoadingComics).toBe(false));

    expect(result.current.character).toBeUndefined();
    expect(result.current.comics).toBeUndefined();
  });
});
