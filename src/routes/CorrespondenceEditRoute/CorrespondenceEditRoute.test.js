
import { renderWithIntl } from '@folio/stripes-erm-testing';

import CorrespondenceEditRoute from './CorrespondenceEditRoute';
import { translationsProperties } from '../../../test/helpers';

jest.mock('../../components/views/CorrespondenceForm', () => () => (
  <div>CorrespondenceForm</div>
));

describe('CorrespondenceEditRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <CorrespondenceEditRoute />,
      translationsProperties
    );
  });

  test('renders CorrespondenceForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('CorrespondenceForm')).toBeInTheDocument();
  });
});
