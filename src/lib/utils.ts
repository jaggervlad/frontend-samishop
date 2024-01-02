import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractIdFromUrl(url: string) {
  const parts = url.split('/').filter((part) => part !== '');
  const lastPart = parts[parts.length - 1];

  return isNaN(Number(lastPart)) ? '1' : lastPart;
}

export function getSpecieId(species: string[]) {
  return species.length > 0 ? extractIdFromUrl(species[0]) ?? '1' : '1';
}
