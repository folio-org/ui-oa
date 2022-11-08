
import { renderWithIntl } from '@folio/stripes-erm-components';

import PartyEditRoute from './PartyEditRoute';
import { translationsProperties } from '../../../test/helpers';

jest.mock('../../components/views/PartyForm', () => () => (
  <div>PartyForm</div>
));

describe('PartyEditRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <PartyEditRoute />,
      translationsProperties
    );
  });

  test('renders PartyForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('PartyForm')).toBeInTheDocument();
  });
});
