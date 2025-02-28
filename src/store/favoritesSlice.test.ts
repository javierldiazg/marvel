import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer, { toggleFavorite } from "./favoritesSlice";

interface RootState {
  favorites: {
    favorites: Array<{
      id: number;
      name: string;
      thumbnail: {
        path: string;
        extension: string;
      };
    }>;
  };
}
describe("favoritesSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        favorites: favoritesReducer,
      },
    });
  });

  test("debe tener un estado inicial vacío de favoritos", () => {
    const state = (store.getState() as RootState).favorites;
    expect(state.favorites).toEqual([]);
  });

  test("debe agregar un favorito cuando toggleFavorite es llamado", () => {
    const newFavorite = {
      id: 1,
      name: "Spider-Man",
      thumbnail: { path: "", extension: "" },
    };

    store.dispatch(toggleFavorite(newFavorite));

    const state = (store.getState() as RootState).favorites;
    expect(state.favorites).toContainEqual(newFavorite);
  });

  test("debe quitar un favorito cuando toggleFavorite es llamado nuevamente", () => {
    const favoriteToRemove = {
      id: 1,
      name: "Spider-Man",
      thumbnail: { path: "", extension: "" },
    };

    store.dispatch(toggleFavorite(favoriteToRemove));

    let state = (store.getState() as RootState).favorites;
    expect(state.favorites).toContainEqual(favoriteToRemove);

    store.dispatch(toggleFavorite(favoriteToRemove));

    state = (store.getState() as RootState).favorites;
    expect(state.favorites).not.toContainEqual(favoriteToRemove);
  });
});
