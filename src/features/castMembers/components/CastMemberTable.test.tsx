import type { GridFilterModel } from '@mui/x-data-grid';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { CastMembersTable } from './CastMemberTable';

const Props = {
  data: undefined,
  perPage: 10,
  isFetching: false,
  rowsPerPage: [10, 25, 50, 100],
  handleOnPageChange: (page: number) => {},
  handleFilterChange: (filterModel: GridFilterModel) => {},
  handleOnPageSizeChange: (perPage: number) => {},
  handleDelete: (id: string) => {},
};

describe('CastMemberTable', () => {
  it('should render castMember table correctly', () => {
    const { asFragment } = render(<CastMembersTable {...Props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should CastMembersTable with loading', () => {
    const { asFragment } = render(
      <CastMembersTable {...Props} isFetching={true} />,
      {
        wrapper: BrowserRouter,
      },
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CastMembersTable with data', () => {
    const data = {
      data: [
        {
          id: '1',
          name: 'test',
          type: 1,
          deletedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
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
    const { asFragment } = render(<CastMembersTable {...Props} data={data} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CastMembersTable with empty data', () => {
    const data = {
      data: [],
      meta: {
        currentPage: 0,
        from: 0,
        lastPage: 0,
        perPage: 0,
        path: '',
        to: 0,
        total: 0,
      },
      links: {
        first: 'http://localhost:3000/cast-members?page=1',
        last: 'http://localhost:3000/cast-members?page=1',
        next: '',
        prev: '',
      },
    };

    const { asFragment } = render(<CastMembersTable {...Props} data={data} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct type', () => {
    const data = {
      data: [
        {
          id: '1',
          name: 'test',
          type: 2,
          deletedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      meta: {
        currentPage: 0,
        from: 0,
        lastPage: 0,
        perPage: 0,
        path: '',
        to: 0,
        total: 0,
      },
      links: {
        first: 'http://localhost:3000/cast-members?page=1',
        last: 'http://localhost:3000/cast-members?page=1',
        next: '',
        prev: '',
      },
    };
    const { asFragment } = render(<CastMembersTable {...Props} data={data} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
