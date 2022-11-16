
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { Accordion } from '@folio/stripes-testing';
import { MemoryRouter } from 'react-router-dom';
import RequestContact from './RequestContact';

import { translationsProperties } from '../../../../test/helpers';

import {
  publicationRequest,
} from '../../../../test/resources';

let renderComponent;

jest.mock('../../PartySections/PartyInfo', () => () => <div>PartyInfo</div>);

describe('RequestContact', () => {
  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <RequestContact request={publicationRequest} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders RequestContact Accordion component', async () => {
      await Accordion('Request contact').exists();
    });

    test('renders PartyInfo component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PartyInfo')).toBeInTheDocument();
    });
  });
});
