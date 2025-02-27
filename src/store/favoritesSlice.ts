import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

interface FavoritesState {
  favorites: Character[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Character>) => {
      const existingIndex = state.favorites.findIndex(
        (char) => char.id === action.payload.id
      );

      if (existingIndex !== -1) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
