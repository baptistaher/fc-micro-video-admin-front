import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../utils/test-utils';
import { CastMemberCreate } from './CreateCastMember';

describe('CreateCastMember', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CastMemberCreate />);

    expect(asFragment()).toMatchSnapshot();
  });
});
