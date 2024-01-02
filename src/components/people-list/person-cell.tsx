import { ChevronRight } from 'lucide-react';

import { Skeleton } from '@/components/shared';

import { Ref, forwardRef } from 'react';
import { cn, extractIdFromUrl, getSpecieId } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useGetPlanet } from '@/hooks/useGetPlanet';
import { useGetSpecie } from '@/hooks/useGetSpecie';

import { Person } from '@/types';

interface PersonCellProps {
  person: Person;
}

export const PersonCell = forwardRef(
  ({ person }: PersonCellProps, ref: Ref<HTMLDivElement>) => {
    const specieId = getSpecieId(person.species);
    const homeWorldId = extractIdFromUrl(person.homeworld);

    const params = useParams();

    const { specie, isLoadingSpecie } = useGetSpecie({ specieId });
    const { planet, iseLoadingPlanet } = useGetPlanet({
      planetId: homeWorldId,
    });

    const isLoadingDetails = isLoadingSpecie || iseLoadingPlanet;

    const personId = (params.personId as string) || undefined;
    const isActive = personId
      ? personId === extractIdFromUrl(person.url)
      : false;

    return (
      <div
        ref={ref}
        className="group"
        id={`person-${extractIdFromUrl(person.url)}`}
      >
        <div
          className={cn(
            'flex items-center justify-between w-full py-4 pl-4 hover:bg-black-ravn',
            isActive && 'bg-black-ravn'
          )}
        >
          <div className="flex-1 w-[85%] pr-4">
            <h2
              className={cn(
                'text-lg font-bold leading-6 group-hover:text-white',
                isActive ? 'text-white' : 'text-text'
              )}
            >
              {person.name}
            </h2>
            <div
              className={cn(
                'flex items-end group-hover:text-gray-100',
                isActive ? 'text-gray-100' : 'text-text-light'
              )}
            >
              {isLoadingDetails && (
                <Skeleton
                  className={cn(
                    'h-[24px] w-44',
                    isActive ? 'text-white' : 'text-text'
                  )}
                />
              )}
              {!isLoadingDetails && specie && planet && (
                <>
                  {specie?.name} from {planet?.name}
                </>
              )}
            </div>
          </div>

          <div className="w-[15%]">
            <ChevronRight
              className={cn(
                'h-7 w-7 group-hover:text-white',
                isActive ? 'text-white' : 'text-text'
              )}
            />
          </div>
        </div>
        <div className="ml-4 border-b "></div>
      </div>
    );
  }
);

PersonCell.displayName = 'PersonCell';
