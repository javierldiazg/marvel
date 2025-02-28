import axios from "axios";
import md5 from "md5";
import {
  getCharacters,
  getCharacterById,
  getCharacterComics,
} from "../services/marvel";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("md5", () => jest.fn(() => "mockedHash"));

const API_URL = "https://gateway.marvel.com/v1/public";

describe("Marvel API service", () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorMock.mockRestore();
  });

  test("getCharacters must return a list of characters", async () => {
    const mockResponse = {
      data: {
        data: {
          results: [
            { id: 1, name: "Spider-Man" },
            { id: 2, name: "Iron Man" },
          ],
        },
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await getCharacters("spider");

    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/characters`, {
      params: expect.objectContaining({
        apikey: expect.any(String),
        ts: expect.any(String),
        hash: "mockedHash",
        limit: 50,
        nameStartsWith: "spider",
      }),
    });
    expect(result).toEqual(mockResponse.data.data.results);
  });

  test("getCharacters should return an empty array if there is an error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API error"));

    const result = await getCharacters("spider");

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching characters:",
      expect.any(Error)
    );
  });

  test("getCharacterById should return the details of a character", async () => {
    const mockResponse = {
      data: {
        data: {
          results: [{ id: "1011334", name: "Spider-Man" }],
        },
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await getCharacterById("1011334");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${API_URL}/characters/1011334`,
      {
        params: expect.objectContaining({
          apikey: expect.any(String),
          ts: expect.any(String),
          hash: "mockedHash",
        }),
      }
    );
    expect(result).toEqual(mockResponse.data.data.results[0]);
  });

  test("getCharacterById should return null if there is an error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API error"));

    const result = await getCharacterById("1011334");

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching character:",
      expect.any(Error)
    );
  });

  test("getCharacterComics should return a list of comics", async () => {
    const mockResponse = {
      data: {
        data: {
          results: [{ id: "2001", title: "Amazing Spider-Man" }],
        },
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await getCharacterComics("1011334");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${API_URL}/characters/1011334/comics`,
      {
        params: expect.objectContaining({
          apikey: expect.any(String),
          ts: expect.any(String),
          hash: "mockedHash",
          limit: 10,
        }),
      }
    );
    expect(result).toEqual(mockResponse.data.data.results);
  });

  test("getCharacterComics should return an empty array if there is an error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API error"));

    const result = await getCharacterComics("1011334");

    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      "Error fetching character:",
      expect.any(Error)
    );
  });
});
