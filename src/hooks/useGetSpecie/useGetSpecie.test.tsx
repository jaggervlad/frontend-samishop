import { server } from '@/mocks/server';
import { createWrapper } from '@/mocks/utils';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { fetchSpecieById, useGetSpecie } from '.';
import { MOCK_SPECIE } from '@/mocks/data.mock';

describe('Fetch specie by id lib function', () => {
  it('should return de correct data', async () => {
    const data = await fetchSpecieById('1');
    expect(data).toEqual(MOCK_SPECIE);
  });

  it('throws a specific error for a 404 response', async () => {
    // Configura msw para devolver una respuesta de error 404
    server.use(
      rest.get('https://swapi.dev/api/species/1', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    await expect(fetchSpecieById('1')).rejects.toThrow('Error getting specie');
  });
});

describe('useGetSpecie Custom Hook', () => {
  it('should return isSuccess true', async () => {
    const { result } = renderHook(() => useGetSpecie({ specieId: '1' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
  it('should return the correct data', async () => {
    const { result } = renderHook(() => useGetSpecie({ specieId: '1' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(result.current.specie).toMatchObject(MOCK_SPECIE)
    );
  });

  it('should indicate loading state correctly', async () => {
    const { result } = renderHook(() => useGetSpecie({ specieId: '1' }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoadingSpecie).toBe(true);

    await waitFor(() => expect(result.current.isLoadingSpecie).toBe(false));
  });

  it('should indicate error state correctly', async () => {
    const { result } = renderHook(
      () => useGetSpecie({ specieId: 'invalid-id' }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(false));
  });
});
