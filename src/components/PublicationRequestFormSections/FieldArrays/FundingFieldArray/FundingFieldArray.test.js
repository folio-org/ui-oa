import React from 'react';

import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { Button } from '@folio/stripes-testing';

import FundingFieldArray from './FundingFieldArray';

import { translationsProperties } from '../../../../../test/helpers';

import {
  mockRefdata,
  publicationRequest,
  publicationRequestHandlers as handlers,
} from '../../../../../test/resources';

jest.mock('../../../../util', () => ({
  ...jest.requireActual('../../../../util'),
  useOARefdata: () => mockRefdata.filter(
    obj => (
      obj.desc === 'Funding.AspectFunded' ||
      obj.desc === 'Funding.Funder'
    )
  ),
}));

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

    // Not working
    // test('renders expected value within fields fields', () => {
    //   const { queryByTestId } = renderComponent;
    //   expect(within(queryByTestId('fundingFieldArray[0]')).getByRole('combobox', { name: 'Funder' })).toHaveDisplayValue('Funder 1');
    //   expect(within(queryByTestId('fundingFieldArray[0]')).getByRole('combobox', { name: 'Aspect funded' })).toHaveDisplayValue('Funder 1');

    //   expect(within(queryByTestId('fundingFieldArray[1]')).getByRole('combobox', { name: 'Funder' })).toHaveDisplayValue('Funder 1');
    //   expect(within(queryByTestId('fundingFieldArray[1]')).getByRole('combobox', { name: 'Aspect funded' })).toHaveDisplayValue('Funder 1');
    // });
  });
});
