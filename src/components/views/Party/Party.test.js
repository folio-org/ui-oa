import '@folio/stripes-erm-components/test/jest/__mock__';

import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Button } from '@folio/stripes-testing';

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

    test('renders button components', async () => {
      await Button('Actions').exists();
      await Button('Actions').click();
      await Button('Edit').exists();
      await Button('Edit').click();
    });
  });
});
