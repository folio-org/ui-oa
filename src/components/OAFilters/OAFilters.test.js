import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import OAFilters from './OAFilters';

describe('OAFilters', () => {
  test('renders expected OAFilters', () => {
    const { getByText } = renderWithIntl(
      <OAFilters />
    );

    // @sam - please help me fill this out
    expect(1==1)
  });
});

