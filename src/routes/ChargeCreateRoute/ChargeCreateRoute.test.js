
import { renderWithIntl } from '@folio/stripes-erm-components';
import ChargeCreateRoute from './ChargeCreateRoute';
import { translationsProperties } from '../../../test/helpers';

import { mockRefdata } from '../../../test/resources';

jest.mock('../../util', () => ({
  ...jest.requireActual('../../util'),
  useOARefdata: () => mockRefdata,
}));

jest.mock('../../components/views/ChargeForm', () => () => (
  <div>ChargeForm</div>
));

/*
// This is seemingly the only method to override imported __mock__ functions.
// (This probably means this setup SUCKS and needs changing)
// It's not necessary anymore here thanks to mocks added in stripes-components
// but left as commented code for future devs

const useParams = jest.fn(() => ({
  id: mockPubReq.id,
}));

// Make sure ReactRouterDom is imported as a module so we can tack onto it here

ReactRouterDom.useParams = useParams;
*/

describe('ChargeCreateRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <ChargeCreateRoute />,
      translationsProperties
    );
  });

  test('renders ChargeForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('ChargeForm')).toBeInTheDocument();
  });
});
