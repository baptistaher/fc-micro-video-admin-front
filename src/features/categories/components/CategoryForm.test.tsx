import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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
  it('should render correctly', () => {
    const { asFragment } = render(<CategoryForm {...Props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
