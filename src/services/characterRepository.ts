import axios from "axios";
import md5 from "md5";

const API_URL = "https://gateway.marvel.com/v1/public";
const PUBLIC_KEY = "67e84d35c83b5c5d7ef077399435bf16";
const PRIVATE_KEY = "7be8f3aec879f7bd32851b6289c35e280728dc61";

export const getAuthParams = () => {
  const ts = new Date().getTime().toString();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
  return { ts, apikey: PUBLIC_KEY, hash };
};

export const getCharacters = async (nameStartsWith = "") => {
  try {
    const params: Record<string, string | number> = {
      ...getAuthParams(),
      limit: 50,
    };

    if (nameStartsWith.trim()) {
      params.nameStartsWith = nameStartsWith;
    }

    const { data } = await axios.get(`${API_URL}/characters`, { params });
    return data.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching characters:",
        error.response?.data || error.message
      );
    } else {
      console.error("Error fetching characters:", error);
    }
    return [];
  }
};

export const getCharacterById = async (id: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/characters/${id}`, {
      params: getAuthParams(),
    });
    return data.data.results[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching character:",
        error.response?.data || error.message
      );
    } else {
      console.error("Error fetching character:", error);
    }
    return null;
  }
};

export const getCharacterComics = async (id: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/characters/${id}/comics`, {
      params: { ...getAuthParams(), limit: 10 },
    });
    return data.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching comics:",
        error.response?.data || error.message
      );
    } else {
      console.error("Error fetching comics:", error);
    }
    return [];
  }
};
