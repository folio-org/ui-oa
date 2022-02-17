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
import PublicationStatusFieldArray from './PublicationStatusFieldArray';

import translationsProperties from '../../../../../test/helpers';

jest.mock('../../../../util/useOARefdata', () => () => [
  {
    id: '2c9180b07eadd1fc017eadd643a70023',
    desc: 'PublicationStatus.PublicationStatus',
    internal: true,
    values: [
      {
        label: 'Submitted',
        value: '2c9180b17f055d1b017f0560801c0035',
      },
    ],
  },
]);

describe('PublicationStatusFieldArray', () => {
  describe('with empty initial values', () => {
    let renderComponent;
    beforeEach(async () => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={{}} onSubmit={handlers.onSubmit}>
          <PublicationStatusFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the add publication status button', async () => {
      await Button('Add publication status').exists();
    });

    test('renders empty fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(
        queryAllByTestId(/PublicationStatusFieldArray\[.*\]/).length
      ).toEqual(0);
    });

    test('adding/removing fields using the add/remove works as expected', () => {
      const { getByRole } = renderComponent;
      expect(
        getByRole('button', { name: 'Add publication status' })
      ).toBeInTheDocument();
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
          <PublicationStatusFieldArray />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders correct number of fields', () => {
      const { queryAllByTestId } = renderComponent;
      expect(
        queryAllByTestId(/PublicationStatusFieldArray\[.*\]/).length
      ).toEqual(2);
    });
  });
});
