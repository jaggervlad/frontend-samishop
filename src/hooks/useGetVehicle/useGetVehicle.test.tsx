import { server } from '@/mocks/server';
import { createWrapper } from '@/mocks/utils';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { MOCK_VEHICLE } from '@/mocks/data.mock';
import { fetchVehicleByUrl, useGetVehicle } from '.';

describe('Fetch vehicle by url lib function', () => {
  it('should return de correct data', async () => {
    const data = await fetchVehicleByUrl('https://swapi.dev/api/vehicles/6');

    expect(data).toMatchObject(MOCK_VEHICLE);
  });

  it('throws a specific error for a 404 response', async () => {
    server.use(
      rest.get('https://swapi.dev/api/vehicles/6', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    await expect(
      fetchVehicleByUrl('https://swapi.dev/api/vehicles/6')
    ).rejects.toThrow('Error getting vehicle');
  });
});

describe('useGetVehicle Custom Hook', () => {
  it('should return isSuccess true', async () => {
    const { result } = renderHook(
      () => useGetVehicle('https://swapi.dev/api/vehicles/6'),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
  it('should return the correct data', async () => {
    const { result } = renderHook(
      () => useGetVehicle('https://swapi.dev/api/vehicles/6'),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() =>
      expect(result.current.vehicle).toMatchObject(MOCK_VEHICLE)
    );
  });

  it('should indicate loading state correctly', async () => {
    const { result } = renderHook(
      () => useGetVehicle('https://swapi.dev/api/vehicles/6'),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should indicate error state correctly', async () => {
    const { result } = renderHook(
      () => useGetVehicle('https://swapi.dev/api/vehicles/invalid-id'),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(false));
  });
});
