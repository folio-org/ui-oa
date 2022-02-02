import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { KeyValue } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import PartyInfo from './PartyInfo';
import { party } from '../../../../test/resources/partyResources';

describe('PartyInfo', () => {
  describe('renders components', () => {
    beforeEach(() => {
      renderWithIntl(<PartyInfo />, translationsProperties);
    });

    test('renders Title KeyValue', async () => {
      await KeyValue('Title').exists();
    });

    test('renders Family name KeyValue', async () => {
      await KeyValue('Family name').exists();
    });

    test('renders Given name(s) KeyValue', async () => {
      await KeyValue('Given name(s)').exists();
    });

    test('renders ORCID iD KeyValue', async () => {
      await KeyValue('ORCID iD').exists();
    });

    test('renders Main email KeyValue', async () => {
      await KeyValue('Main email address').exists();
    });

    test('renders Phone KeyValue', async () => {
      await KeyValue('Phone').exists();
    });

    test('renders Mobile phone KeyValue', async () => {
      await KeyValue('Mobile phone').exists();
    });
  });

  describe('renders components with initial values', () => {
    beforeEach(() => {
      renderWithIntl(<PartyInfo party={party} />, translationsProperties);
    });

    test('renders Title KeyValue', async () => {
      await KeyValue('Title').has({ value: 'Dr' });
    });

    test('renders Family name KeyValue', async () => {
      await KeyValue('Family name').has({ value: 'Dempsey' });
    });

    test('renders Given name(s) KeyValue', async () => {
      await KeyValue('Given name(s)').has({ value: 'Elijah' });
    });

    test('renders ORCID iD KeyValue', async () => {
      await KeyValue('ORCID iD').has({ value: '0000-1111' });
    });

    test('renders Main email KeyValue', async () => {
      await KeyValue('Main email address').has({ value: 'Elijah_Dempsey6074@brety.org' });
    });

    test('renders Phone KeyValue', async () => {
      await KeyValue('Phone').has({ value: '012345678' });
    });

    test('renders Mobile phone KeyValue', async () => {
      await KeyValue('Mobile phone').has({ value: '012345678' });
    });
  });
});
