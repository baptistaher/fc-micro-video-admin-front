import { screen } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../utils/test-utils';
import { baseURL } from '../api/apiSlice';
import { CategoryList } from './ListCategory';
import { categoryResponse } from './mocks';

export const handlers = [
  http.get(`${baseURL}/categories`, async () => {
    await delay(150);
    return HttpResponse.json(categoryResponse);
    // return HttpResponse(ctx.json(categoryResponse), ctx.delay(150));
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

  it('should render loading state', () => {
    renderWithProviders(<CategoryList />);

    const loading = screen.getByRole('progressbar');
    expect(loading).toBeDefined();
  });
});
