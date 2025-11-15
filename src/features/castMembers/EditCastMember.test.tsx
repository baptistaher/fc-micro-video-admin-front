import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../utils/test-utils';
import { CastMemberEdit } from './EditCastMember';

describe('EditCastMember', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CastMemberEdit />);

    expect(asFragment()).toMatchSnapshot();
  });
});
