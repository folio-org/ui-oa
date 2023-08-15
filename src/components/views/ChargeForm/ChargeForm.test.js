
import {
  renderWithIntl,
  TestForm,
  Button
} from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../../test/helpers';
import ChargeForm from './ChargeForm';

import { charge, chargeHandlers as handlers, mockRefdata } from '../../../../test/resources';

jest.mock('../../ChargeFormSections/ChargeInfoForm/', () => () => (
  <div>ChargeInfoForm</div>
));

// FIXME Jack -- This is a mock which is relevant only on the interior ChargeInfoForm (Which I think should be named ChargeFormInfo
// Better approach here would be to check this component renders that one, and unit test that component separately
jest.mock('../../../util', () => ({
  ...jest.requireActual('../../../util'),
  useOARefdata: () => mockRefdata.filter(
    obj => (
      obj.desc === 'Charge.Category' ||
      obj.desc === 'Charge.ChargeStatus' ||
      obj.desc === 'Charge.DiscountType'
    )
  ),
}));

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
