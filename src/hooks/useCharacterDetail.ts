import { useQuery } from "@tanstack/react-query";
import { getCharacterById, getCharacterComics } from "@/services/marvel";

export const useCharacterDetail = (id: string) => {
  const { data: character, isLoading: isLoadingCharacter } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id),
    enabled: !!id,
  });

  const { data: comics, isLoading: isLoadingComics } = useQuery({
    queryKey: ["comics", id],
    queryFn: () => getCharacterComics(id),
    enabled: !!id,
  });

  return { character, comics, isLoadingCharacter, isLoadingComics };
};
