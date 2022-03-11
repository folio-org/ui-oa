import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Button } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers/translationsProperties';
import StripesHarness from '../../../../test/helpers/stripesHarness';
import Party from './Party';
import { party, handlers } from '../../../../test/resources/partyResources';

const queryClient = new QueryClient();

jest.mock('../../PartySections/PartyInfo', () => () => <div>PartyInfo</div>);

describe('Party', () => {
  let renderComponent;
  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <StripesHarness>
          <QueryClientProvider client={queryClient}>
            <Party
              onClose={handlers.onClose}
              queryProps={{ isLoading: false }}
              resource={party}
            />
          </QueryClientProvider>
        </StripesHarness>,
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
