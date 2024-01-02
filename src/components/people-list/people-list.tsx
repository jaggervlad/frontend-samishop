'use client';

import Link from 'next/link';

import { PersonCell } from './person-cell';
import { ErrorCell } from '@/components/shared/error-cell';
import { LoadingCell } from '@/components/shared/loading-cell';

import { useGetPeople } from '@/hooks/useGetPeople';

export const PeopleList = () => {
  const { people, isLoadingPeople, isLoading, isError, lastElementRef } =
    useGetPeople();

  return (
    <section className="flex flex-col">
      {!isLoading &&
        people &&
        people.map((p, index) => (
          <Link key={index} href={`/person/${index + 1}`}>
            <PersonCell
              ref={people.length === index + 1 ? lastElementRef : null}
              person={p}
            />
          </Link>
        ))}

      {isError && <ErrorCell />}
      {isLoadingPeople && <LoadingCell />}
    </section>
  );
};
