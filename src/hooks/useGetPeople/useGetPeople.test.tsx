import { server } from '@/mocks/server';
import { fetchPersons, useGetPeople } from './useGetPeople';
import { rest } from 'msw';
import { MOCK_PERSONS_RESPONSE } from '@/mocks/data.mock';
import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '@/mocks/utils';

describe('Fetch persons lib function', () => {
  it('fetchPersons should return the correct number of persons', async () => {
    const data = await fetchPersons({
      pageParam: 'https://swapi.dev/api/people/?page=1',
    });

    expect(data.results.length).toBe(MOCK_PERSONS_RESPONSE['1'].results.length);
  });

  it('fetchPersons throws a specific error for a 404 response', async () => {
    // Configura msw para devolver una respuesta de error 404
    server.use(
      rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    await expect(
      fetchPersons({ pageParam: 'https://swapi.dev/api/people/' })
    ).rejects.toThrow('Unexpected end of JSON input');
  });

  it('fetchPersons returns the correct data for a valid URL', async () => {
    const result = await fetchPersons({
      pageParam: 'https://swapi.dev/api/people/',
    });

    expect(result).toEqual(MOCK_PERSONS_RESPONSE['1']);
  });
});

describe('useGetPeople Custom Hook', () => {
  it('should return isSuccess true', async () => {
    const { result } = renderHook(() => useGetPeople(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
  it('should return the correct data afeter fetch more data', async () => {
    const { result } = renderHook(() => useGetPeople(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    await waitFor(() =>
      expect(result.current.peopleData?.pages).toStrictEqual([
        MOCK_PERSONS_RESPONSE['1'],
      ])
    );

    result.current.fetchNextPage();

    await waitFor(() =>
      expect(result.current.peopleData?.pages).toStrictEqual([
        MOCK_PERSONS_RESPONSE['1'],
        MOCK_PERSONS_RESPONSE['2'],
      ])
    );
  });

  it('should indicate loading state correctly', async () => {
    const { result } = renderHook(() => useGetPeople(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should indicate error state correctly', async () => {
    const { result } = renderHook(() => useGetPeople(), {
      wrapper: createWrapper(),
    });

    server.use(
      rest.get('https://swapi.dev/api/people', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(false));
  });
});
