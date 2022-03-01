import '@folio/stripes-erm-components/test/jest/__mock__';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import PublicationRequestCreateRoute from './PublicationRequestCreateRoute';
import translationsProperties from '../../../test/helpers';
import StripesHarness from '../../../test/helpers/stripesHarness';

const queryClient = new QueryClient();

jest.mock('../../components/views/PublicationRequestForm', () => () => (
  <div>PublicationRequestForm</div>
));

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <StripesHarness>{children}</StripesHarness>
  </QueryClientProvider>
);

describe('PublicationRequestCreateRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = render(
      <PublicationRequestCreateRoute />,
      { wrapper },
      translationsProperties
    );
  });

  test('renders PublicationRequestForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('PublicationRequestForm')).toBeInTheDocument();
  });
});
