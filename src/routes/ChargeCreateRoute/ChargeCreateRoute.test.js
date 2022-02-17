import '@folio/stripes-erm-components/test/jest/__mock__';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import ChargeCreateRoute from './ChargeCreateRoute';
import translationsProperties from '../../../test/helpers';
import StripesHarness from '../../../test/helpers/stripesHarness';

jest.mock('../../components/views/ChargeForm', () => () => (
  <div>ChargeForm</div>
));

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <StripesHarness>{children}</StripesHarness>
  </QueryClientProvider>
);

describe('ChargeCreateRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = render(
      <ChargeCreateRoute />,
      { wrapper },
      translationsProperties
    );
  });

  test('renders ChargeForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('ChargeForm')).toBeInTheDocument();
  });
});
