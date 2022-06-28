import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../../test/helpers';
import CorrespondingAuthor from './CorrespondingAuthor';
import publicationRequestResource from '../../../../test/resources/publicationRequestsResources';

let renderComponent;

jest.mock('../../PartySections/PartyInfo', () => () => <div>PartyInfo</div>);

describe('CorrespondingAuthor', () => {
  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <CorrespondingAuthor request={publicationRequestResource} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders CorrespondingAuthor Accordion component', async () => {
      await Accordion('Corresponding author').exists();
    });

    test('renders PartyInfo component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PartyInfo')).toBeInTheDocument();
    });
  });
});
