import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { KeyValue } from '@folio/stripes-testing';
import { translationsProperties } from '../../../../../test/helpers';
import JournalDetails from './JournalDetails';
import { journal } from '../../../../../test/resources';

describe('JournalDetails', () => {
  describe('renders components', () => {
    beforeEach(() => {
      renderWithIntl(<JournalDetails />, translationsProperties);
    });
    test('renders Title KeyValue', async () => {
      await KeyValue('Title').exists();
    });

    test('renders ISSN (print) KeyValue', async () => {
      await KeyValue('ISSN (print)').exists();
    });

    test('renders ISSN (electronic) KeyValue', async () => {
      await KeyValue('ISSN (electronic)').exists();
    });
  });

  describe('renders components with initial values', () => {
    beforeEach(() => {
      renderWithIntl(<JournalDetails request={{ work: journal }} />, translationsProperties);
    });
    test('renders Title KeyValue', async () => {
      await KeyValue('Title').has({ value: 'Annals of Global Analysis and Geometry' });
    });

    test('renders ISSN (print) KeyValue', async () => {
      await KeyValue('ISSN (print)').has({ value: '1572-9060' });
    });

    test('renders ISSN (electronic) KeyValue', async () => {
      await KeyValue('ISSN (electronic)').has({ value: '0232-704X' });
    });
  });
});
