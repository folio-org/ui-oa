import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components';

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
