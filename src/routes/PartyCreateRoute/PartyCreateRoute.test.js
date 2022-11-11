
import { renderWithIntl } from '@folio/stripes-erm-testing';

import PartyCreateRoute from './PartyCreateRoute';
import { translationsProperties } from '../../../test/helpers';

jest.mock('../../components/views/PartyForm', () => () => (
  <div>PartyForm</div>
));

describe('PartyCreateRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <PartyCreateRoute />,
      translationsProperties
    );
  });

  test('renders PartyForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('PartyForm')).toBeInTheDocument();
  });
});
