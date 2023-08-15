
import { renderWithIntl, KeyValue } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../../../test/helpers';
import BookDetails from './BookDetails';
import { book } from '../../../../../test/resources';

describe('BookDetails', () => {
  describe('renders components', () => {
    beforeEach(() => {
      renderWithIntl(<BookDetails />, translationsProperties);
    });
    test('renders Place of publication KeyValue', async () => {
      await KeyValue('Place of publication').exists();
    });

    test('renders Year of publication KeyValue', async () => {
      await KeyValue('Date of publication').exists();
    });
  });

  describe('renders components with initial values', () => {
    beforeEach(() => {
      renderWithIntl(<BookDetails request={book} />, translationsProperties);
    });
    test('renders Place of publication KeyValue with initial value', async () => {
      await KeyValue('Place of publication').has({ value: 'Test Place' });
    });

    test('renders Year of publication  KeyValue with initial value', async () => {
      await KeyValue('Date of publication').has({ value: '10/10/1996' });
    });
  });
});
