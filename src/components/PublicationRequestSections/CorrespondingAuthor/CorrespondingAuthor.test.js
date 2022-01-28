import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import CorrespondingAuthor from './CorrespondingAuthor';

let renderComponent;

jest.mock('../PartyInfo', () => () => <div>PartyInfo</div>);

describe('CorrespondingAuthor', () => {
  describe('renders components with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <CorrespondingAuthor request={null} />,
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

    test('renders Empty list', () => {
      const { getByText } = renderComponent;
      expect(getByText('The list contains no items')).toBeInTheDocument();
    });
  });
});
