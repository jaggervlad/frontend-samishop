import Home from '@/app/page';
import { PeopleList } from '@/components/people-list';
import { renderWithClient } from '@/mocks/utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';

describe('Home Page', () => {
  test('render people', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryAllByAltText('Loading'));
    });
  });

  test('render list of person', async () => {
    renderWithClient(<PeopleList />);
  });
});
