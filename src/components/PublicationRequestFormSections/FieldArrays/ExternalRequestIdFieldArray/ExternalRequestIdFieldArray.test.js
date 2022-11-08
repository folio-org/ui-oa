import React from 'react';

import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-testing';
import { within } from '@testing-library/react';
import { Button } from '@folio/stripes-testing';
import {
  publicationRequest,
  publicationRequestHandlers as handlers,
} from '../../../../../test/resources';
import ExternalRequestIdFieldArray from './ExternalRequestIdFieldArray';

import { translationsProperties } from '../../../../../test/helpers';

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
          'tooltip',
          { name: 'Remove external request ID 1' }
        )
      ).toBeInTheDocument();
      expect(
        within(queryByTestId('externalRequestIdFieldArray[1]')).getByRole(
          'tooltip',
          { name: 'Remove external request ID 2' }
        )
      ).toBeInTheDocument();
    });
  });
});
