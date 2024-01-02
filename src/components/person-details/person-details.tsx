'use client';

import { useGetPerson } from '@/hooks/useGetPerson';
import { useParams } from 'next/navigation';
import { ErrorCell, LoadingCell } from '../shared';
import { PersonInfo } from './person-info';

export const PersonDetails = () => {
  const params = useParams();
  const { personId } = params;
  const { personData, isLoading, isError } = useGetPerson(personId as string);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {isLoading && <LoadingCell />}
      {isError && <ErrorCell />}
      {!isLoading && personData && <PersonInfo person={personData} />}
    </div>
  );
};
