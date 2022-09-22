import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion, KeyValue } from '@folio/stripes-testing';
import { translationsProperties } from '../../../../test/helpers';
import Agreement from './Agreement';
import { publicationRequest } from '../../../../test/resources';

let renderComponent;

jest.mock('@k-int/stripes-kint-components', () => ({
  ...jest.requireActual('@k-int/stripes-kint-components'),
  CustomPropertyCard: () => <div>CustomPropertyCard</div>,
}));

describe('Agreement', () => {
  describe('renders components with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(<Agreement />, translationsProperties);
    });

    test('renders Agreement Accordion component', async () => {
      await Accordion('Agreement').exists();
    });

    test('renders Agreement Accordion badge', () => {
      const { getByText } = renderComponent;
      expect(getByText('0')).toBeInTheDocument();
    });

    test('renders Empty agreement component', () => {
      const { getByText } = renderComponent;
      expect(
        getByText('This request is not covered by an agreement')
      ).toBeInTheDocument();
    });
  });

  describe('renders components with values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Agreement request={publicationRequest} />,
        translationsProperties
      );
    });

    test('renders Agreement Accordion component', async () => {
      await Accordion('Agreement').exists();
    });

    test('renders Agreement "Start date" KeyValue component', async () => {
      await KeyValue('Start date').has({ value: '1/1/2021' });
    });

    test('renders Agreement "End date" KeyValue component', async () => {
      await KeyValue('End date').has({ value: '12/31/2021' });
    });

    test('renders Agreement "Status" KeyValue component', async () => {
      await KeyValue('Status').has({ value: 'Draft' });
    });
  });
});
