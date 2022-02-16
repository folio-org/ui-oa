import React from 'react';
import '@folio/stripes-erm-components/test/jest/__mock__';
import { StaticRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import translationsProperties from '../../../../test/helpers';
import JournalModal from './JournalModal';

jest.mock(
  '../../JournalFormSections/JournalInfoForm/JournalInfoForm.js',
  () => () => <div>JournalInfoForm</div>
);

jest.mock('@folio/stripes/core', () => ({
  ...jest.requireActual('@folio/stripes/core'),
  useOkapiKy: jest.fn(),
}));

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <Router>
    <IntlProvider locale="en" messages={{}}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ,
    </IntlProvider>
  </Router>
);

let renderComponent;
describe('JournalModal', () => {
  beforeEach(() => {
    renderComponent = render(
      <Router>
        <JournalModal />
      </Router>,
      { wrapper },
      translationsProperties
    );
  });

  test('renders JournalInfoForm component', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('JournalInfoForm')).toBeInTheDocument();
  });
});
