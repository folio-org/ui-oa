
import { renderWithIntl } from '@folio/stripes-erm-components';
import ChargeEditRoute from './ChargeEditRoute';
import { translationsProperties } from '../../../test/helpers';

import { mockRefdata } from '../../../test/resources';

jest.mock('../../util', () => ({
  ...jest.requireActual('../../util'),
  useOARefdata: () => mockRefdata,
}));

jest.mock('../../components/views/ChargeForm', () => () => (
  <div>ChargeForm</div>
));

describe('ChargeEditRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <ChargeEditRoute />,
      translationsProperties
    );
  });

  test('renders ChargeForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('ChargeForm')).toBeInTheDocument();
  });
});
