import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import {
  Accordion,
  MultiColumnList,
  MultiColumnListCell,
} from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import PublicationStatus from './PublicationStatus';
import { publicationRequest } from '../../../../test/resources/publicationRequestsResources';

let renderComponent;

describe('PublicationStatus', () => {
  describe('renders components with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <PublicationStatus request={null} />,
        translationsProperties
      );
    });

    test('renders PublicationStatus Accordion component', async () => {
      await Accordion('Publication status').exists();
    });

    test('renders Empty list', () => {
      const { getByText } = renderComponent;
      expect(getByText('No publication statuses for this request')).toBeInTheDocument();
    });
  });

  describe('renders components with values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <PublicationStatus request={publicationRequest} />,
        translationsProperties
      );
    });

    test('renders PublicationStatus Accordion component', async () => {
      await Accordion('Publication status').exists();
    });

    test('renders PublicationStatus MCL component with values', async () => {
      await MultiColumnList({
        columns: ['Status', 'Status date', 'Status note'],
      }).exists();
      await MultiColumnListCell({ content: 'Test Note' }).exists();
      await MultiColumnListCell({ content: '1/1/2022' }).exists();
      await MultiColumnListCell({ content: 'Submitted' }).exists();
    });
  });
});
