import { server } from '@/mocks/server';
import { createWrapper } from '@/mocks/utils';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { fetchPersonById, useGetPerson } from '.';
import { MOCK_PERSON } from '@/mocks/data.mock';

describe('Fetch person by id lib function', () => {
  it('should return de correct data', async () => {
    const data = await fetchPersonById('1');

    expect(data).toEqual(MOCK_PERSON);
  });

  it('throws a specific error for a 404 response', async () => {
    server.use(
      rest.get('https://swapi.dev/api/people/1', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    await expect(fetchPersonById('1')).rejects.toThrow('Error getting person');
  });
});

describe('useGetPerson Custom Hook', () => {
  it('should return isSuccess true', async () => {
    const { result } = renderHook(() => useGetPerson('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
  it('should return the correct data', async () => {
    const { result } = renderHook(() => useGetPerson('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(result.current.personData).toMatchObject(MOCK_PERSON)
    );
  });

  it('should indicate loading state correctly', async () => {
    const { result } = renderHook(() => useGetPerson('1'), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it('should indicate error state correctly', async () => {
    const { result } = renderHook(() => useGetPerson('inlid-id'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(false));
  });
});
