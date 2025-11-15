import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../utils/test-utils';
import { CastMemberList } from './ListCastmember';

describe('ListCastMember', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithProviders(<CastMemberList />);

    expect(asFragment()).toMatchSnapshot();
  });
});
