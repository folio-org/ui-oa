import '@folio/stripes-erm-components/test/jest/__mock__';
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { Select } from '@folio/stripes-testing';
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
      await Select({ id: 'charge-currency' }).exists();
    });

    test('renders Exchange rate select', async () => {
      await Select({ id: 'charge-exchange-rate' }).exists();
    });

    test('renders Coefficient field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('spinbutton', { name: 'Coefficient' }));
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
      expect(getByRole('spinbutton', { name: 'Amount' })).toHaveDisplayValue('100');
    });

    test('renders Exchange rate select with expected value', () => {
        const { getByRole } = renderComponent;
        expect(getByRole('combobox', { name: 'Exchange rate' })).toHaveDisplayValue('GBP');
      });

    test('renders Currency select with expected value', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('combobox', { name: 'Currency' })).toHaveDisplayValue('USD');
    });

    test('renders Coefficient field with expected value', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('spinbutton', { name: 'Coefficient' })).toHaveDisplayValue('1.1');
    });

    test('renders Discount field with expected value', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('spinbutton', { name: 'Discount' })).toHaveDisplayValue('10');
    });

    test('renders Description field with expected value', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Description' })).toHaveDisplayValue('Test Charge');
    });
  });
});
