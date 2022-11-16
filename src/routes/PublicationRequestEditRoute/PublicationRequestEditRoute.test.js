
import { renderWithIntl } from '@folio/stripes-erm-testing';

import PublicationRequestEditRoute from './PublicationRequestEditRoute';
import { translationsProperties } from '../../../test/helpers';
import { mockRefdata } from '../../../test/resources';

jest.mock('../../components/views/PublicationRequestForm', () => () => (
  <div>PublicationRequestForm</div>
));

jest.mock('../../util', () => ({
  ...jest.requireActual('../../util'),
  useOARefdata: () => mockRefdata.filter(
    obj => (
      obj.desc === 'PublicationRequest.PublicationType'
    )
  ),
}));

describe('PublicationRequestEditRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <PublicationRequestEditRoute />,
      translationsProperties
    );
  });

  test('renders PublicationRequestForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('PublicationRequestForm')).toBeInTheDocument();
  });
});
