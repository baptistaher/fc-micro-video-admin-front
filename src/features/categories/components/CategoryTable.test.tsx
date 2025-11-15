import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CategoriesTable } from './CategoryTable';

const Props = {
  data: undefined,
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 20, 30],
  handleOnPageChange: vi.fn(),
  handleFilterChange: vi.fn(),
  handleOnPageSizeChange: vi.fn(),
  handleDelete: vi.fn(),
};

describe('CategoryTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render category table correctly', () => {
    const { asFragment } = render(<CategoriesTable {...Props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should category with loading', () => {
    const { asFragment } = render(
      <CategoriesTable {...Props} isFetching={true} />,
      {
        wrapper: BrowserRouter,
      },
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render category with data', () => {
    const data = {
      data: [
        {
          id: '1',
          name: 'test',
          deleted_at: null,
          is_active: true,
          created_at: '2025-08-29T12:14:42.349Z',
          updated_at: '2025-08-29T12:14:42.349Z',
          description: null,
        },
      ],
      meta: {
        currentPage: 1,
        from: 1,
        lastPage: 1,
        perPage: 10,
        path: 'http://localhost:3000/cast-members',
        to: 1,
        total: 1,
      },
      links: {
        first: 'http://localhost:3000/cast-members?page=1',
        last: 'http://localhost:3000/cast-members?page=1',
        next: '',
        prev: '',
      },
    };

    const { asFragment } = render(<CategoriesTable {...Props} data={data} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CategoryTable with Inactive value', () => {
    const data = {
      data: [
        {
          id: '1',
          name: 'test',
          deleted_at: null,
          is_active: true,
          created_at: '2025-08-29T12:14:42.349Z',
          updated_at: '2025-08-29T12:14:42.349Z',
          description: null,
        },
      ],
      meta: {
        currentPage: 1,
        from: 1,
        lastPage: 1,
        perPage: 10,
        path: 'http://localhost:3000/cast-members',
        to: 1,
        total: 1,
      },
      links: {
        first: 'http://localhost:3000/cast-members?page=1',
        last: 'http://localhost:3000/cast-members?page=1',
        next: '',
        prev: '',
      },
    };

    const { asFragment } = render(<CategoriesTable {...Props} data={data} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
