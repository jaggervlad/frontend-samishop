import { PREFIX_PEOPLE, SW_URL } from '@/lib/contants';
import { Person } from '@/types';
import { useQuery } from '@tanstack/react-query';

export async function fetchPersonById(id: string) {
  try {
    const res = await fetch(`${SW_URL}${PREFIX_PEOPLE}/${id}`);

    if (!res.ok) {
      throw new Error('Error getting person');
    }

    const personData = await res.json();

    return personData as Person;
  } catch (error) {
    throw error;
  }
}

export function useGetPerson(personId: string) {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['person', personId],
    queryFn: () => fetchPersonById(personId as string),
  });

  return { personData: data, isLoading, isError, isSuccess };
}
