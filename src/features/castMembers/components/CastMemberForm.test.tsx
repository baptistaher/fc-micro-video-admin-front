import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CastMemberForm } from './CastMemberForm';

const Props = {
  castMember: {
    id: '1',
    name: 'test',
    type: 1,
    deletedAt: null,
    createdAt: '2025-08-29T12:14:42.349Z',
    updatedAt: '2025-08-29T12:14:42.349Z',
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: vi.fn(),
  handleChange: vi.fn(),
};

describe('CastMemberForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render castMember form correctly', () => {
    const { asFragment } = render(<CastMemberForm {...Props} />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render castMember from with loading state', () => {
    const { asFragment } = render(
      <CastMemberForm {...Props} isLoading={true} />,
      {
        wrapper: BrowserRouter,
      },
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render castMember from with disabled state', () => {
    const { asFragment } = render(
      <CastMemberForm {...Props} isDisabled={true} isLoading={true} />,
      {
        wrapper: BrowserRouter,
      },
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
