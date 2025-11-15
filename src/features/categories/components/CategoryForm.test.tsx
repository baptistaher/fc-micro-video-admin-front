import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CategoryForm } from './CategoryForm';

const Props = {
  category: {
    id: '1',
    name: 'test',
    description: 'test',
    is_active: true,
    deleted_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: vi.fn(),
  handleChange: vi.fn(),
  handleToggle: vi.fn(),
};

describe('CategoryForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should render correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CategoryForm {...Props} />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render CategoryForm with loading', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <CategoryForm {...Props} isLoading={true} isDisabled={true} />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
