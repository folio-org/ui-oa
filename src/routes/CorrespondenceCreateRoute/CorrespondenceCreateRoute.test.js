import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components';

import CorrespondenceCreateRoute from './CorrespondenceCreateRoute';
import { translationsProperties } from '../../../test/helpers';

jest.mock('../../components/views/CorrespondenceForm', () => () => (
  <div>CorrespondenceForm</div>
));

describe('ChargeCreateRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <CorrespondenceCreateRoute />,
      translationsProperties
    );
  });

  test('renders CorrespondenceForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('CorrespondenceForm')).toBeInTheDocument();
  });
});
