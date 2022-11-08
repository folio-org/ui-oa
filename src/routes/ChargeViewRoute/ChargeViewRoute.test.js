
import { renderWithIntl } from '@folio/stripes-erm-testing';

import ChargeViewRoute from './ChargeViewRoute';
import { translationsProperties } from '../../../test/helpers';
import { mockRefdata } from '../../../test/resources';

jest.mock('../../util', () => ({
    ...jest.requireActual('../../util'),
    useOARefdata: () => mockRefdata.filter(
      obj => (
        obj.desc === 'Charge.ChargeStatus'
      )
    ),
  }));

jest.mock('../../components/views/ChargeView', () => () => (
  <div>ChargeView</div>
));


describe('ChargeViewRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <ChargeViewRoute />,
      translationsProperties
    );
  });

  test('renders ChargeView Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('ChargeView')).toBeInTheDocument();
  });
});
