import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components';

import LinkInvoiceRoute from './LinkInvoiceRoute';
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

jest.mock('../../components/views/LinkInvoiceForm', () => () => (
  <div>LinkInvoiceForm</div>
));

describe('LinkInvoiceRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <LinkInvoiceRoute />,
      translationsProperties
    );
  });

  test('renders LinkInvoiceForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('LinkInvoiceForm')).toBeInTheDocument();
  });
});
