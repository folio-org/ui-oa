
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { KeyValue } from '@folio/stripes-testing';
import RequestInfo from './RequestInfo';

import { translationsProperties } from '../../../../test/helpers';

import {
  publicationRequest,
} from '../../../../test/resources';


describe('RequestInfo', () => {
  describe('renders components', () => {
    beforeEach(() => {
      renderWithIntl(
        <RequestInfo />,
        translationsProperties
      );
    });
    test('renders Request number KeyValue', async () => {
      await KeyValue('Request number').exists();
    });

    test('renders Request date KeyValue', async () => {
      await KeyValue('Request date').exists();
    });

    test('renders Status KeyValue', async () => {
      await KeyValue('Status').exists();
    });
  });

  describe('renders components with initial values', () => {
    beforeEach(() => {
      renderWithIntl(
        <RequestInfo request={publicationRequest} />,
        translationsProperties
      );
    });
    test('renders Request number KeyValue with initial value', async () => {
      await KeyValue('Request number').has({ value: '1' });
    });

    test('renders Request date KeyValue with initial value', async () => {
      await KeyValue('Request date').has({ value: '1/1/2022' });
    });

    test('renders Status KeyValue with initial value', async () => {
      await KeyValue('Status').has({ value: 'New' });
    });

    test('renders External request IDs KeyValue with initial value', async () => {
      await KeyValue('External request IDs').has({ value: 'Test 1Test 2' });
    });
  });
});
