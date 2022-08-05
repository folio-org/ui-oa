import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import {
  Accordion,
  MultiColumnList,
  MultiColumnListCell,
  KeyValue,
} from '@folio/stripes-testing';
import Publication from './Publication';

import { translationsProperties } from '../../../../test/helpers';

import {
  publicationRequest,
} from '../../../../test/resources';

let renderComponent;
jest.mock('../PublicationType/JournalDetails', () => () => (
  <div>JournalDetails</div>
));

describe('Publication', () => {
  describe('renders components with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Publication request={null} />,
        translationsProperties
      );
    });

    test('renders Publication Accordion component', async () => {
      await Accordion('Publication').exists();
    });

    test('renders KeyValue components', async () => {
      await KeyValue('Publication title').has({ value: 'No value set-' });
      await KeyValue('Author names').has({ value: 'No value set-' });
      await KeyValue('Publication type').has({ value: 'No value set-' });
      await KeyValue('Subtype').has({ value: 'No value set-' });
      await KeyValue('Publisher').has({ value: 'No value set-' });
      await KeyValue('License').has({ value: 'No value set-' });
      await KeyValue('Local reference').has({ value: 'No value set-' });
      await KeyValue('Publication URL').has({ value: 'No value set-' });
      await KeyValue('DOI').has({ value: 'No value set-' });
    });
  });

  describe('renders components with values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Publication request={publicationRequest} />,
        translationsProperties
      );
    });

    test('renders Publication Accordion component', async () => {
      await Accordion('Publication').exists();
    });

    test('renders KeyValue components', async () => {
      await KeyValue('Publication title').has({ value: 'Test Publication' });
      await KeyValue('Author names').has({ value: 'Test Author' });
      await KeyValue('Publication type').has({ value: 'Journal Article' });
      await KeyValue('Subtype').has({ value: 'Subtype 1' });
      await KeyValue('Publisher').has({ value: 'Publisher 1' });
      await KeyValue('License').has({ value: 'License 1' });
      await KeyValue('Local reference').has({ value: 'Test Reference' });
      await KeyValue('Publication URL').has({ value: 'Test Url' });
      await KeyValue('DOI').has({ value: 'Test DOI' });
    });

    test('renders Publication MCL component with values', async () => {
      await MultiColumnList({
        columns: ['Type', 'Identifier'],
      }).exists();
      await MultiColumnListCell({ content: 'PMID' }).exists();
      await MultiColumnListCell({ content: 'Test Identifier' }).exists();
    });

    test('renders JournalDetails component', () => {
      const { getByText } = renderComponent;
      expect(getByText('JournalDetails')).toBeInTheDocument();
    });
  });
});
