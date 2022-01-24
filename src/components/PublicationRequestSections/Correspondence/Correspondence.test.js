import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { Accordion, MultiColumnList, MultiColumnListCell } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import Correspondence from './Correspondence';
import { publicationRequest } from '../../../../test/resources/publicationRequestsResources';

let renderComponent;

describe('Correspondence', () => {
  describe('renders components with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <Correspondence request={null} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders Correspondence Accordion component', async () => {
      await Accordion('Correspondence').exists();
    });

    test('renders Empty list', () => {
      const { getByText } = renderComponent;
      expect(getByText('The list contains no items')).toBeInTheDocument();
    });
  });

  describe('renders components with values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <Correspondence request={publicationRequest} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders Correspondence Accordion component', async () => {
      await Accordion('Correspondence').exists();
    });
    test('renders Correspondence MCL component with values', async () => {
      await MultiColumnList({
        columns: [
          'Date',
          'Description and mode',
          'Correspondent',
          'Status',
          'Category',
        ],
      }).exists();
      await MultiColumnListCell({ content:'12/30/2021' }).exists();
      await MultiColumnListCell({ content:'Test' }).exists();
      await MultiColumnListCell({ content:'Awaiting Reply' }).exists();
      await MultiColumnListCell({ content:'Invoice' }).exists();
    });

    test('renders Correspondence Edit button', async () => {
        const { getByRole } = renderComponent;
        expect(getByRole('button', { name: 'Edit' }));
      });

      test('renders Correspondence Edit button', async () => {
        const { getByRole } = renderComponent;
        expect(getByRole('button', { name: 'Edit' }));
      });
  });
});
