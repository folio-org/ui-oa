import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { Accordion } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import RequestContact from './RequestContact';

let renderComponent;

jest.mock('../PartyInfo', () => () => <div>PartyInfo</div>);

describe('RequestContact', () => {
  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <RequestContact />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders RequestContact Accordion component', async () => {
      await Accordion('Request contact').exists();
    });

    test('renders PartyInfo component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PartyInfo')).toBeInTheDocument();
    });
  });
});
