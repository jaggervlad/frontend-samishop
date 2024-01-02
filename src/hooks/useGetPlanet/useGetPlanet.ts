import { PREFIX_PLANETS, SW_URL } from '@/lib/contants';
import { Planet } from '@/types';
import { useQuery } from '@tanstack/react-query';

export async function fetchPlanetById(id: string) {
  try {
    const res = await fetch(`${SW_URL}${PREFIX_PLANETS}/${id}`);

    if (!res.ok) {
      throw new Error('Error getting planet');
    }

    const planetData = await res.json();

    return planetData as Planet;
  } catch (error) {
    throw error;
  }
}

export function useGetPlanet({ planetId }: { planetId: string }) {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['planet', planetId],
    queryFn: () => fetchPlanetById(planetId),
  });

  return {
    planet: data,
    iseLoadingPlanet: isLoading,
    isErrorPlanet: isError,
    isSuccess,
  };
}
