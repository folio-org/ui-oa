import '@folio/stripes-erm-components/test/jest/__mock__';
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import translationsProperties from '../../../../test/helpers';
import ChargeInfoForm from './ChargeInfoForm';
import { charge } from '../../../../test/resources/chargeResources';

const onSubmit = jest.fn();
let renderComponent;

jest.mock('../../../util/useOARefdata', () => () => []);

describe('ChargeInfoForm', () => {
  describe('with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <ChargeInfoForm />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders Amount field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('spinbutton', { name: 'Amount' }));
    });

    test('renders Currency select', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('button', { name: 'Currency required' }));
    });

    test('renders Exchange rate field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('spinbutton', { name: 'Exchange rate' }));
    });

    test('renders Discount field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('spinbutton', { name: 'Discount' }));
    });

    test('renders Description field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Description' }));
    });
  });

  describe('with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={charge} onSubmit={onSubmit}>
          <ChargeInfoForm />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders Amount field with expected value', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('spinbutton', { name: 'Amount' })).toHaveDisplayValue(
        '100'
      );
    });

    test('renders Exchange rate field with expected value', () => {
      const { getByRole } = renderComponent;
      expect(
        getByRole('spinbutton', { name: 'Exchange rate' })
      ).toHaveDisplayValue('1.1');
    });

    test('renders Discount field with expected value', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('spinbutton', { name: 'Discount' })).toHaveDisplayValue(
        '10'
      );
    });

    test('renders Description field with expected value', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Description' })).toHaveDisplayValue(
        'Test Charge'
      );
    });
  });
});
