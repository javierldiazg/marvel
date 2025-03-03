import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "@/services/characterRepository";
import { CharacterType} from "../utils/constants";

export const useCharacters = (searchTerm: string) => {
  const {
    data: characters = <CharacterType[]>[],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["characters", searchTerm],
    queryFn: () => getCharacters(searchTerm),
    staleTime: 1000 * 60 * 60 * 24,
    retry: 2,
  });

  return { characters, isLoading, isError, error };
};
