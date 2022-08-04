import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { KeyValue } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import { translationsProperties } from '../../../../test/helpers';
import PartyInfo from './PartyInfo';
import { party } from '../../../../test/resources';

describe('PartyInfo', () => {
  describe('renders components', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <PartyInfo />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders Name KeyValue', async () => {
      await KeyValue('Name').exists();
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
      renderWithIntl(
        <MemoryRouter>
          <PartyInfo party={party} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders Name KeyValue', async () => {
      await KeyValue('Name').has({ value: 'Dr Elijah Dempsey' });
    });

    test('renders ORCID iD KeyValue', async () => {
      await KeyValue('ORCID iD').has({ value: '0000-1111' });
    });

    test('renders Main email KeyValue', async () => {
      await KeyValue('Main email address').has({
        value: 'Elijah_Dempsey6074@brety.org',
      });
    });

    test('renders Phone KeyValue', async () => {
      await KeyValue('Phone').has({ value: '012345678' });
    });

    test('renders Mobile phone KeyValue', async () => {
      await KeyValue('Mobile phone').has({ value: '012345678' });
    });
  });
});
