import '@folio/stripes-erm-components/test/jest/__mock__';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import PartyEditRoute from './PartyEditRoute';
import translationsProperties from '../../../test/helpers';
import StripesHarness from '../../../test/helpers/stripesHarness';

const queryClient = new QueryClient();

jest.mock('../../components/views/PartyForm', () => () => (
  <div>PartyForm</div>
));

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <StripesHarness>{children}</StripesHarness>
  </QueryClientProvider>
);

describe('PartyEditRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = render(
      <PartyEditRoute />,
      { wrapper },
      translationsProperties
    );
  });

  test('renders PartyForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('PartyForm')).toBeInTheDocument();
  });
});
