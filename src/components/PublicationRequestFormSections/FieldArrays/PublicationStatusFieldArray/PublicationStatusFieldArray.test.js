import React from 'react';

import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';

import PublicationStatusFieldArray from './PublicationStatusFieldArray';

import { translationsProperties } from '../../../../../test/helpers';
import {
  mockRefdata,
  publicationRequest,
  publicationRequestHandlers as handlers,
} from '../../../../../test/resources';

jest.mock('../../../../util', () => ({
  ...jest.requireActual('../../../../util'),
  useOARefdata: () => mockRefdata.filter(
      (obj) => obj.desc === 'PublicationStatus.PublicationStatus'
    ),
}));

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
