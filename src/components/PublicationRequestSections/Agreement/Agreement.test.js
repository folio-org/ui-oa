import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { Accordion, KeyValue } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import Agreement from './Agreement';
import { publicationRequest } from '../../../../test/resources/publicationRequestsResources';

let renderComponent;

describe('Agreement', () => {
  describe('renders components with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <Agreement />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders Agreement Accordion component', async () => {
      await Accordion('Agreement').exists();
    });

    test('renders Agreement card field', () => {
      const { getByText } = renderComponent;
      expect(getByText('0')).toBeInTheDocument();
    });

    test('renders Agreement card field', () => {
      const { getByText } = renderComponent;
      expect(
        getByText('This request is not covered by an agreement')
      ).toBeInTheDocument();
    });
  });

  describe('renders components with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <Agreement request={publicationRequest} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders Agreement Accordion component', async () => {
      await Accordion('Agreement').exists();
    });

    test('renders Agreement card field', () => {
      const { getByText } = renderComponent;
      expect(getByText('1')).toBeInTheDocument();
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
