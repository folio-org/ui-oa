import { renderWithIntl } from '@folio/stripes-erm-testing';

import translationsProperties from '../../../../test/helpers/translationsProperties';
import Party from './Party';
import { party, partyHandlers as handlers } from '../../../../test/resources';

jest.mock('../../PartySections/PartyInfo', () => () => <div>PartyInfo</div>);

describe('Party', () => {
  let renderComponent;
  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Party
          onClose={handlers.onClose}
          queryProps={{ isLoading: false }}
          resource={party}
        />,
        translationsProperties
      );
    });

    test('renders PartyInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PartyInfo')).toBeInTheDocument();
    });
  });
});
