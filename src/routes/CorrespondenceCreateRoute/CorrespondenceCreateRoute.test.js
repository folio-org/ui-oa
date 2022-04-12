import '@folio/stripes-erm-components/test/jest/__mock__';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import CorrespondenceCreateRoute from './CorrespondenceCreateRoute';
import translationsProperties from '../../../test/helpers';
import StripesHarness from '../../../test/helpers/stripesHarness';

const queryClient = new QueryClient();

jest.mock('../../components/FormPage', () => () => (
  <div>FormPage</div>
));
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
      <CorrespondenceCreateRoute />,
      { wrapper },
      translationsProperties
    );
  });

  test('renders FormPage Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('FormPage')).toBeInTheDocument();
  });
});
