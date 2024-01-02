import { PREFIX_SPECIES, SW_URL } from '@/lib/contants';
import { Specie } from '@/types';
import { useQuery } from '@tanstack/react-query';

export async function fetchSpecieById(id: string) {
  try {
    const res = await fetch(`${SW_URL}${PREFIX_SPECIES}/${id}`);

    if (!res.ok) {
      throw new Error('Error getting specie');
    }

    const specieData = await res.json();

    return specieData as Specie;
  } catch (error) {
    throw error;
  }
}

export function useGetSpecie({ specieId }: { specieId: string }) {
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ['specie', specieId],
    queryFn: () => fetchSpecieById(specieId),
  });

  return {
    specie: data,
    isLoadingSpecie: isLoading,
    isErrorSpecie: isError,
    isSuccess,
    error,
  };
}
