import { extractIdFromUrl } from '@/lib/utils';

describe('extractIdFromUrl', () => {
  test('debería extraer el ID correctamente de una URL válida', () => {
    const url = 'https://swapi.dev/api/people/2/';
    const resultado = extractIdFromUrl(url);
    expect(resultado).toBe('2');
  });

  test('debería devolver "1" si la URL no tiene un ID', () => {
    const url = 'https://swapi.dev/api/people/';
    const resultado = extractIdFromUrl(url);
    expect(resultado).toBe('1');
  });

  test('debería devolver "1" si la URL es vacía', () => {
    const url = '';
    const resultado = extractIdFromUrl(url);
    expect(resultado).toBe('1');
  });
});
