import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import Party from './Party';
import { party, handlers } from '../../../../test/resources/partyResources';

jest.mock('../../PartySections/PartyInfo', () => () => <div>PartyInfo</div>);

describe('PublicationRequest', () => {
  let renderComponent;
  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <Party onClose={handlers.onClose} resource={party} />
        </MemoryRouter>,
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
