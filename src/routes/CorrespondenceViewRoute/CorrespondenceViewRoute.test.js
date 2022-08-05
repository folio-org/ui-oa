import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components';

import CorrespondenceViewRoute from './CorrespondenceViewRoute';
import { translationsProperties } from '../../../test/helpers';

jest.mock('../../components/views/CorrespondenceView', () => () => (
  <div>CorrespondenceView</div>
));


describe('CorrespondenceViewRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <CorrespondenceViewRoute />,
      translationsProperties
    );
  });

  test('renders CorrespondenceView Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('CorrespondenceView')).toBeInTheDocument();
  });
});
