import '@folio/stripes-erm-components/test/jest/__mock__';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import CorrespondenceEditRoute from './CorrespondenceEditRoute';
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

describe('CorrespondenceEditRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = render(
      <CorrespondenceEditRoute />,
      { wrapper },
      translationsProperties
    );
  });

  test('renders FormPage Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('FormPage')).toBeInTheDocument();
  });
});
