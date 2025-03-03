"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

interface FavoritesState {
  favorites: Character[];
}

interface FavoritesAction {
  type: "TOGGLE_FAVORITE" | "SET_FAVORITES";
  payload: Character[] | Character;
}

const FavoritesContext = createContext<
  | { state: FavoritesState; dispatch: React.Dispatch<FavoritesAction> }
  | undefined
>(undefined);

const favoritesReducer = (state: FavoritesState, action: FavoritesAction) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const character = action.payload as Character;
      const exists = state.favorites.some((fav) => fav.id === character.id);
      const updatedFavorites = exists
        ? state.favorites.filter((fav) => fav.id !== character.id)
        : [...state.favorites, character];

      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }

      return { ...state, favorites: updatedFavorites };

    case "SET_FAVORITES":
      return { ...state, favorites: action.payload as Character[] };

    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      dispatch({ type: "SET_FAVORITES", payload: storedFavorites });
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }
  }, [state.favorites, isClient]);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
