import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components';

import PublicationRequestCreateRoute from './PublicationRequestCreateRoute';
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


describe('PublicationRequestCreateRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <PublicationRequestCreateRoute />,
      translationsProperties
    );
  });

  test('renders PublicationRequestForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('PublicationRequestForm')).toBeInTheDocument();
  });
});
