import { screen, waitFor } from '@testing-library/react';
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

    if (url.searchParams.get('page') === '2') {
      return HttpResponse.json(categoryResponsePage2);
    }

    // console.log(categoryResponse.meta.total);

    return HttpResponse.json(categoryResponse);
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
    renderWithProviders(<CategoryList />);

    await waitFor(() => {
      const name = screen.getByText('Category 1');
      expect(name).toBeInTheDocument();
    });

    // const myComand: BrowserCommands ;

    // console.log(myComand)

    const user = userEvent.setup();

    await user.click(screen.getByTestId('KeyboardArrowRightIcon'));

    // expect(screen.getByTestId('location')).toHaveTextContent('page=2');
    // const size = await screen.findByText('1-10 of 11');
    // console.log(size)
    // expect(size).toBeInTheDocument();
    // const nextButton = screen.getByTestId('KeyboardArrowRightIcon');

    // fireEvent.click(nextButton);

    // console.log("After click")
    // store.dispatch(categorySlice.actions.setPage(2));

    // await waitFor(() => {
    //   const name = screen.getByText('Category 11');
    //   expect(name).toBeInTheDocument();
    // });
  });

  // it('should handle filter change', async () => {
  //   renderWithProviders(<CategoryList />);
  // });
});
