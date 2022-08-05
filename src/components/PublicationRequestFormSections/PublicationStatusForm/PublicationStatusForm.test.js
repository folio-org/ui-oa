import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Accordion } from '@folio/stripes-testing';
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
