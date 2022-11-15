
import { renderWithIntl } from '@folio/stripes-erm-testing';

import JournalEditRoute from './JournalEditRoute';
import { translationsProperties } from '../../../test/helpers';

jest.mock('../../components/views/JournalForm', () => () => (
  <div>JournalForm</div>
));

describe('JournalEditRoute', () => {
  let renderComponent;

  beforeEach(() => {
    renderComponent = renderWithIntl(
      <JournalEditRoute />,
      translationsProperties
    );
  });

  test('renders JournalForm Component', () => {
    const { getByText } = renderComponent;
    expect(getByText('JournalForm')).toBeInTheDocument();
  });
});
