import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { Button } from '@folio/stripes-testing';
// import { within } from '@testing-library/react';
import {
  handlers,
} from '../../../../../test/resources/publicationRequestsResources';
import IdentifiersFieldArray from './IdentifiersFieldArray';

import translationsProperties from '../../../../../test/helpers';

jest.mock('../../../../util/useOARefdata', () => () => [
  {
    id: '2c9180b07eadd1fc017eadd643a70023',
    desc: 'PublicationIdentifier.Type',
    internal: true,
    values: [
      {
        label: 'PMID',
        value: '2c9180b17f055d1b017f056080240037',
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
      expect(
        getByRole('button', { name: 'Add identifier' })
      ).toBeInTheDocument();
    });
  });
});
