import { expect, it, describe, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { CastMemberForm } from './CastMemberForm';
import { BrowserRouter } from 'react-router';

const Props = {
  castMember: {
    id: '1',
    name: 'test',
    type: 1,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
