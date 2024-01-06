import { Person } from '@/types';
import { SectionHeader } from './section-header';
import { DataCell } from './data-cell';
import { fetchVehicleByUrl } from '@/hooks/useGetVehicle';
import { useQueries } from '@tanstack/react-query';
import { Skeleton } from '../shared';

import { motion } from 'framer-motion';

interface PersonInfoProps {
  person: Person;
}

export const PersonInfo = ({ person }: PersonInfoProps) => {
  const { name, eye_color, hair_color, skin_color, birth_year, vehicles } =
    person;

  return (
    <motion.section
      id={`Person:${name} Details`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="px-4 pt-8 text-3xl text-black-ravn font-bold">{name}</h2>
      </div>

      <SectionHeader title="General Details" />
      <div className="flex flex-col w-full">
        <DataCell title="Eye Color" label={eye_color} />
        <DataCell title="Hair Color" label={hair_color} />
        <DataCell title="Skin Color" label={skin_color} />
        <DataCell title="Birth Year" label={birth_year} />
      </div>

      <PersonVehiclesInfo vehicles={vehicles} />
    </motion.section>
  );
};

export const PersonVehiclesInfo = ({ vehicles }: { vehicles: string[] }) => {
  const queries = vehicles.map((v) => ({
    queryKey: ['vehicle', v],
    queryFn: () => fetchVehicleByUrl(v),
    staleTime: Infinity,
  }));

  const result = useQueries({ queries });

  return (
    <>
      <SectionHeader title="Vehicles" />

      {result?.map((r, i) => {
        if (r.isLoading) {
          return <Skeleton key={i} className="w-56 h-8 my-4" />;
        }

        return <DataCell key={i} title={r?.data?.name as string} />;
      })}
    </>
  );
};
