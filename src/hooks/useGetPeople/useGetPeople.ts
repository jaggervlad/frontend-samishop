import { PREFIX_PEOPLE, SW_URL } from '@/lib/contants';
import { PersonsResponse } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useRef } from 'react';

export const fetchPersons = async ({ pageParam }: { pageParam: string }) => {
  try {
    const res = await fetch(pageParam);
    const dataPersons = await res.json();

    return dataPersons as PersonsResponse;
  } catch (error) {
    throw error;
  }
};

export function useGetPeople() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    hasNextPage,
    isSuccess,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['persons'],
    queryFn: fetchPersons,
    getNextPageParam: (lastPage) => lastPage.next,
    initialPageParam: `${SW_URL}${PREFIX_PEOPLE}/?page=1`,
  });

  const people = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data]
  );
  const isLoadingPeople = isLoading || isFetchingNextPage;

  const observer = useRef<IntersectionObserver>();
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return {
    peopleData: data,
    people,
    isLoadingPeople,
    isLoading,
    isSuccess,
    isError,
    lastElementRef,
    fetchNextPage,
  };
}
