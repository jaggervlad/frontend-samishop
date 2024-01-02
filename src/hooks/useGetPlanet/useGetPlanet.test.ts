import { server } from '@/mocks/server';
import { createWrapper } from '@/mocks/utils';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { MOCK_PLANET } from '@/mocks/data.mock';
import { fetchPlanetById, useGetPlanet } from '.';

describe('Fetch planet by id lib function', () => {
  it('should return de correct data', async () => {
    const data = await fetchPlanetById('1');
    expect(data).toEqual(MOCK_PLANET);
  });

  it('throws a specific error for a 404 response', async () => {
    server.use(
      rest.get('https://swapi.dev/api/planets/1', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    await expect(fetchPlanetById('1')).rejects.toThrow('Error getting planet');
  });
});

describe('useGetPlanet Custom Hook', () => {
  it('should return isSuccess true', async () => {
    const { result } = renderHook(() => useGetPlanet({ planetId: '1' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
  it('should return the correct data', async () => {
    const { result } = renderHook(() => useGetPlanet({ planetId: '1' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(result.current.planet).toMatchObject(MOCK_PLANET)
    );
  });

  it('should indicate loading state correctly', async () => {
    const { result } = renderHook(() => useGetPlanet({ planetId: '1' }), {
      wrapper: createWrapper(),
    });

    expect(result.current.iseLoadingPlanet).toBe(true);

    await waitFor(() => expect(result.current.iseLoadingPlanet).toBe(false));
  });

  it('should indicate error state correctly', async () => {
    const { result } = renderHook(
      () => useGetPlanet({ planetId: 'invalid-id' }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(false));
  });
});
