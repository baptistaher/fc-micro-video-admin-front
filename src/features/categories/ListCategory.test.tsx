import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

// import {BrowserCommands} from 'vitest/browser'

import { renderWithProviders } from '../../utils/test-utils';
import { baseURL } from '../api/apiSlice';
import { CategoryList } from './ListCategory';
import { categoryResponse, categoryResponsePage2 } from './mocks';

export const handlers = [
  http.get(`${baseURL}/categories`, async ({ request }) => {
    await delay(150);
    const url = new URL(request.url);
    console.log('Request URL:', request.url);

    if (url.searchParams.get('page') === '2') {
      return HttpResponse.json(categoryResponsePage2);
    }

    // console.log(categoryResponse.meta.total);

    return HttpResponse.json(categoryResponse);
  }),
  http.delete(`${baseURL}/categories/:id`, async ({ params }) => {
    await delay(150);
    const { id } = params;
    console.log('DELETE REQUEST: ', id);

    return new HttpResponse(null, { status: 204 });
  }),
];

const server = setupServer(...handlers);

describe('ListCategory', () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CategoryList />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render loading state', async () => {
    renderWithProviders(<CategoryList />);

    const loading = await screen.findByRole('progressbar');
    expect(loading).toBeDefined();
  });

  it('should render success state', async () => {
    renderWithProviders(<CategoryList />);

    expect(screen.queryByText(/test/i)).toBeNull();

    await waitFor(() => {
      expect(screen.getByText('Category 1')).toBeInTheDocument();
    });
  });

  it('should render error state', async () => {
    server.use(
      http.get(`${baseURL}/categories`, async () => {
        await delay(150);
        return HttpResponse.json({ message: 'Error' }, { status: 500 });
      }),
    );

    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      expect(
        screen.getByText(/Error fetching categories/i),
      ).toBeInTheDocument();
    });
  });

  it('should handle on PageChange', async () => {
    let lastRequestUrl = '';

    server.use(
      http.get(`${baseURL}/categories`, ({ request }) => {
        lastRequestUrl = request.url;

        const url = new URL(request.url);
        if (url.searchParams.get('page') === '2') {
          return HttpResponse.json(categoryResponsePage2);
        }

        return HttpResponse.json(categoryResponse);
      }),
    );

    renderWithProviders(<CategoryList />);

    // Wait for page 1
    await waitFor(() => {
      const name = screen.getByText('Category 1');
      expect(name).toBeInTheDocument();
    });
    const user = userEvent.setup();

    // Trigger pagination
    await user.click(screen.getByTestId('KeyboardArrowRightIcon'));

    // Assert refetch happened with page=2
    await waitFor(() => {
      expect(lastRequestUrl).toContain('page=2');
    });
  });

  it('should handle filter change', async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText('Category 1');
      expect(name).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: 'Category 11' } });

    await waitFor(() => {
      const loading = screen.getByRole('progressbar');
      expect(loading).toBeInTheDocument();
    });
  });

  it('should handle Delete Category success', async () => {
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText('Category 2');
      expect(name).toBeInTheDocument();
    });

    const [firstDeleteButton] = screen.getAllByTestId('delete-button');
    await userEvent.setup().click(firstDeleteButton);

    expect(
      await screen.findByText(/category deleted/i, {}, { timeout: 3000 }),
    ).toBeInTheDocument();
  });

  it('should handle Delete Category error', async () => {
    server.use(
      http.delete(`${baseURL}/categories/:id`, async () => {
        await delay(150);
        return HttpResponse.json(
          { message: 'Error deleting category' },
          { status: 500 },
        );
      }),
    );

    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText('Category 2');
      expect(name).toBeInTheDocument();
    });

    const [firstDeleteButton] = screen.getAllByTestId('delete-button');
    await userEvent.setup().click(firstDeleteButton);

    expect(
      await screen.findByText(
        /error deleting category/i,
        {},
        { timeout: 3000 },
      ),
    ).toBeInTheDocument();
  });
});
