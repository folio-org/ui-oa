import '@folio/stripes-erm-components/test/jest/__mock__';
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { Button } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import ChargeForm from './ChargeForm';
import { handlers, charge } from '../../../../test/resources/chargeResources';

jest.mock('../../ChargeFormSections/ChargeInfoForm/', () => () => (
  <div>ChargeInfoForm</div>
));

const onSubmit = jest.fn();

describe('ChargeInfoForm', () => {
  let renderComponent;

  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <ChargeForm
            handlers={handlers}
            queryStates={{ isLoading: false, isSubmitting: false }}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders "New charge condtional', () => {
      const { getByText } = renderComponent;
      expect(getByText('New charge')).toBeInTheDocument();
    });

    test('renders ChargeInfoForm Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ChargeInfoForm')).toBeInTheDocument();
    });

    test('renders and triggers Cancel Button', async () => {
      await Button('Cancel').click();
      expect(handlers.onClose).toHaveBeenCalled();
    });

    // test('renders and triggers Save and Close Button', async () => {
    //   await Button('Save and close').click();
    //   expect(handlers.onSubmit).toHaveBeenCalled();
    // });
  });

  describe('renders conditionals with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <ChargeForm
            charge={charge}
            handlers={handlers}
            queryStates={{ isLoading: false, isSubmitting: false }}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders "Edit charge condtional', () => {
      const { getByText } = renderComponent;
      expect(getByText('Edit charge')).toBeInTheDocument();
    });
  });
});
