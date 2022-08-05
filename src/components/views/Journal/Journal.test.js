import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import Journal from './Journal';
import { journal, journalHandlers as handlers } from '../../../../test/resources';

jest.mock('../../JournalSections/JournalInstances', () => () => (
  <div>JournalInstances</div>
));

describe('Journal', () => {
  let renderComponent;
  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <Journal
            onClose={handlers.onClose}
            queryProps={{ isLoading: false }}
            resource={journal}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders JournalInstances Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('JournalInstances')).toBeInTheDocument();
    });
  });
});
