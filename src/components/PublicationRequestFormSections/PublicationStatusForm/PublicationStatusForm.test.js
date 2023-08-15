
import { renderWithIntl, Accordion } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../../test/helpers';
import PublicationStatusForm from './PublicationStatusForm';

jest.mock('../FieldArrays/PublicationStatusFieldArray', () => () => (
  <div>PublicationStatusFieldArray</div>
));

describe('PublicationStatusForm', () => {
  let renderComponent;

  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <PublicationStatusForm />,
        translationsProperties
      );
    });

    test('renders Publication Status Accordion component', async () => {
      await Accordion('Publication status').exists();
    });

    test('renders PublicationStatusFieldArray Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PublicationStatusFieldArray')).toBeInTheDocument();
    });
  });
});
