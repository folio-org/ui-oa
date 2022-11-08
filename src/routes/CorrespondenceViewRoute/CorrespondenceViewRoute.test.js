
import { renderWithIntl } from '@folio/stripes-erm-testing';

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
