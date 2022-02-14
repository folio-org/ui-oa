import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { StaticRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import translationsProperties from '../../../test/helpers';
import ChargeCreateRoute from './ChargeCreateRoute';

jest.mock('../../components/views/ChargeForm', () => () => (
  <div>ChargeForm</div>
));

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: { okapi : 'test' },
}));


const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <Router>
    <IntlProvider locale="en" messages={{}}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </IntlProvider>
  </Router>
);

let renderComponent;
describe('POLineCard', () => {
  beforeEach(() => {
    renderComponent = render(
      <Router>
        <ChargeCreateRoute />
      </Router>,
      { wrapper },
      translationsProperties
    );
  });

  test('renders ChargeForm component', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('ChargeForm')).toBeInTheDocument();
  });
});
