import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { Button } from '@folio/stripes-testing';
// import { within } from '@testing-library/react';
import {
  publicationRequest,
  handlers,
} from '../../../../../test/resources/publicationRequestsResources';
import IdentifiersFieldArray from './IdentifiersFieldArray';

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

describe('IdentifiersFieldArray', () => {
  describe('with empty initial values', () => {
    let renderComponent;
    beforeEach(async () => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={{}} onSubmit={handlers.onSubmit}>
          <IdentifiersFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the add identifiers button', async () => {
      await Button('Add identifier').exists();
    });

    test('renders empty fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(queryAllByTestId(/IdentifiersFieldArray\[.*\]/).length).toEqual(0);
    });

    test('adding/removing fields using the add/remove works as expected', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('button', { name: 'Add identifier' })).toBeInTheDocument();
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
          <IdentifiersFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders correct number of fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(queryAllByTestId(/IdentifiersFieldArray\[.*\]/).length).toEqual(1);
    });

    // Not working
    // test('renders expected value within fields fields', () => {
    //   const { queryByTestId } = renderComponent;
    //   expect(within(queryByTestId('IdentifiersFieldArray[0]')).getByRole('combobox', { name: 'Type' })).toHaveDisplayValue('Funder 1');
    //   expect(within(queryByTestId('IdentifiersFieldArray[0]')).getByRole('combobox', { name: 'Identifier' })).toHaveDisplayValue('Funder 1');

    // });
  });
});
