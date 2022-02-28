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
import ExternalRequestIdFieldArray from './ExternalRequestIdFieldArray';

import translationsProperties from '../../../../../test/helpers';

describe('ExternalRequestIdFieldArray', () => {
  describe('with empty initial values', () => {
    let renderComponent;
    beforeEach(async () => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={{}} onSubmit={handlers.onSubmit}>
          <ExternalRequestIdFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the Add external request ID button', async () => {
      await Button('Add external request ID').exists();
    });

    test('renders no fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(
        queryAllByTestId(/externalRequestIdFieldArray\[.*\]/).length
      ).toEqual(0);
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
          <ExternalRequestIdFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders correct number of fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(
        queryAllByTestId(/externalRequestIdFieldArray\[.*\]/).length
      ).toEqual(2);
    });

    test('renders expected value within fields', () => {
      const { queryByTestId } = renderComponent;
      expect(
        within(queryByTestId('externalRequestIdFieldArray[0]')).getByRole(
          'textbox',
          { name: 'External request ID' }
        )
      ).toHaveDisplayValue('Test 1');
      expect(
        within(queryByTestId('externalRequestIdFieldArray[1]')).getByRole(
          'textbox',
          { name: 'External request ID' }
        )
      ).toHaveDisplayValue('Test 2');
    });

    test('renders remove field button', () => {
      const { queryByTestId } = renderComponent;
      expect(
        within(queryByTestId('externalRequestIdFieldArray[0]')).getByRole(
          'button',
          { name: 'trash' }
        )
      ).toBeInTheDocument();
      expect(
        within(queryByTestId('externalRequestIdFieldArray[1]')).getByRole(
          'button',
          { name: 'trash' }
        )
      ).toBeInTheDocument();
    });
  });

  // describe('adding and removing external request ids works as expected', () => {
  //   let renderComponent;
  //   beforeEach(async () => {
  //     renderComponent = renderWithIntl(
  //       <TestForm initialValues={{}} onSubmit={handlers.onSubmit}>
  //         <ExternalRequestIdFieldArray />
  //       </TestForm>,
  //       translationsProperties
  //     );
  //   });

  //   test('Add external request ID functions as expected', async () => {
  //     const { queryAllByTestId } = renderComponent;

  //     await expect(
  //       queryAllByTestId(/externalRequestIdFieldArray\[.*\]/).length
  //     ).toEqual(0);
  //     await Button('Add external request ID').click();
  //     await expect(
  //       queryAllByTestId(/externalRequestIdFieldArray\[.*\]/).length
  //     ).toEqual(1);
  //   });

  //   test('remove external request ID functions as expected', async () => {
  //     const { queryAllByTestId, getByRole } = renderComponent;
  //     await expect(
  //       queryAllByTestId(/externalRequestIdFieldArray\[.*\]/).length
  //     ).toEqual(0);
  //     await Button('Add external request ID').click();
  //     await expect(
  //       queryAllByTestId(/externalRequestIdFieldArray\[.*\]/).length
  //     ).toEqual(1);
  //     await getByRole('button', { name: 'trash' }).click();
  //     await expect(
  //       queryAllByTestId(/externalRequestIdFieldArray\[.*\]/).length
  //     ).toEqual(0);
  //   });
  // });
});
