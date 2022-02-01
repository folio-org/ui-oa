import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { within } from '@testing-library/react';
import { Button } from '@folio/stripes-testing';
import {
  publicationRequest,
  handlers,
} from '../../../../../test/resources/publicationRequestsResources';
import FundingFieldArray from './FundingFieldArray';

import translationsProperties from '../../../../../test/helpers';

jest.mock('../../../../util/useOARefdata', () => () => [
  {
    id: '2c9180b07eadd1fc017eadd643a70023',
    desc: 'Funding.AspectFunded',
    internal: true,
    values: [
      {
        id: '2c9180b07eadd1fc017eadd643b00025',
        value: 'publication',
        label: 'Publication',
      },
      {
        id: '2c9180b07eadd1fc017eadd643aa0024',
        value: 'research',
        label: 'Research',
      },
    ],
  },
  {
    id: '2c9180b07eadd1fc017eadd643b60026',
    desc: 'Funding.Funder',
    internal: false,
    values: [
      {
        id: '2c9180b07eadd1fc017eadd643ba0027',
        value: 'funder_1',
        label: 'Funder 1',
      },
    ],
  },
]);

describe('FundingFieldArray', () => {
  describe('with empty initial values', () => {
    let renderComponent;
    beforeEach(async () => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={{}} onSubmit={handlers.onSubmit}>
          <FundingFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the add funding button', async () => {
      await Button('Add funding').exists();
    });

    test('renders empty field message', () => {
      const { getByText } = renderComponent;
      expect(
        getByText('No funding for this publication request')
      ).toBeInTheDocument();
    });

    test('renders empty fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(queryAllByTestId(/fundingFieldArray\[.*\]/).length).toEqual(0);
    });

    test('adding/removing fields using the add/remove works as expected', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('button', { name: 'Add funding' })).toBeInTheDocument();
    });
  });

  describe('with initial values set', () => {
    let renderComponent;
    beforeEach(async () => {
      renderComponent = renderWithIntl(
        <TestForm
          initialValues={publicationRequest}
          onSubmit={handlers.onSubmit}
        >
          <FundingFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders correct number of fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(queryAllByTestId(/fundingFieldArray\[.*\]/).length).toEqual(2);
    });

    test('renders expected value within fields fields', () => {
      const { queryByTestId } = renderComponent;
      expect(within(queryByTestId('fundingFieldArray[0]')).getByRole('combobox', { name: 'Funder' })).toHaveDisplayValue('Funder 1');
      expect(within(queryByTestId('fundingFieldArray[0]')).getByRole('combobox', { name: 'Aspect funded' })).toHaveDisplayValue('Funder 1');

      expect(within(queryByTestId('fundingFieldArray[1]')).getByRole('combobox', { name: 'Funder' })).toHaveDisplayValue('Funder 1');
      expect(within(queryByTestId('fundingFieldArray[1]')).getByRole('combobox', { name: 'Aspect funded' })).toHaveDisplayValue('Funder 1');
    });
  });
});
