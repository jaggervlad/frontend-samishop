import { PersonDetails } from '@/components/person-details';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ravn Stars Wars Registry',
  description:
    'Explora la galaxia de Ravn en el universo de Star Wars a través del Registro Ravn. Descubre personajes icónicos, eventos épicos y secretos ocultos mientras sumerges en esta apasionante odisea intergaláctica. ¡Prepárate para embarcarte en una aventura única que te llevará a las estrellas y más allá en el Ravn Stars Wars Registry!',
};

export default function PersonPage() {
  return <PersonDetails />;
}
