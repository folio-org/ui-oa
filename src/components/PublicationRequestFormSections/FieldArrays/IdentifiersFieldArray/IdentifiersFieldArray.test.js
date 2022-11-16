import React from 'react';

import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-testing';
import { Button } from '@folio/stripes-testing';

import IdentifiersFieldArray from './IdentifiersFieldArray';

import { translationsProperties } from '../../../../../test/helpers';
import {
  mockRefdata,
  publicationRequestHandlers as handlers,
} from '../../../../../test/resources';


jest.mock('../../../../util', () => ({
  ...jest.requireActual('../../../../util'),
  useOARefdata: () => mockRefdata.filter(
    obj => (
      obj.desc === 'PublicationIdentifier.Type'
    )
  ),
}));

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
      expect(
        getByRole('button', { name: 'Add identifier' })
      ).toBeInTheDocument();
    });
  });
});
