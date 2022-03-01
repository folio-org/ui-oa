import '@folio/stripes-erm-components/test/jest/__mock__';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import CorrespondenceViewRoute from './CorrespondenceViewRoute';
import translationsProperties from '../../../test/helpers';
import StripesHarness from '../../../test/helpers/stripesHarness';

const queryClient = new QueryClient();

jest.mock('../../components/views/CorrespondenceView', () => () => (
  <div>CorrespondenceView</div>
));

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <StripesHarness>{children}</StripesHarness>
  </QueryClientProvider>
);

describe('CorrespondenceViewRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = render(
      <CorrespondenceViewRoute />,
      { wrapper },
      translationsProperties
    );
  });

  test('renders CorrespondenceView Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('CorrespondenceView')).toBeInTheDocument();
  });
});
