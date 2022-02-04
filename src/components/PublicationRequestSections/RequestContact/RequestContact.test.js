import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import RequestContact from './RequestContact';

let renderComponent;

jest.mock('../../PartySections/PartyInfo', () => () => <div>PartyInfo</div>);

describe('RequestContact', () => {
  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <RequestContact />,
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
