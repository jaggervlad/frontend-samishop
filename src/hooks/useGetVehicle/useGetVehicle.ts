import { useQuery } from '@tanstack/react-query';

import { Vehicle } from '@/types';

export async function fetchVehicleByUrl(url: string) {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error('Error getting vehicle');

    const vehicle = await res.json();

    return vehicle as Vehicle;
  } catch (error) {
    throw error;
  }
}

export function useGetVehicle(url: string) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['vehicle', url],
    queryFn: () => fetchVehicleByUrl(url),
  });

  return { vehicle: data, isLoading, isSuccess };
}
export function useGetVehicleAll(url: string) {
  return useQuery({
    queryKey: ['vehicle', url],
    queryFn: () => fetchVehicleByUrl(url),
  });
}
