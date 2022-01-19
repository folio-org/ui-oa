import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-components/test/jest/helpers';
import { Datepicker, Select } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import CorrespondenceInfoForm from './CorrespondenceInfoForm';
import { correspondence } from '../../../../test/resources/correspondenceResources';

const onSubmit = jest.fn();
let renderComponent;

describe('CorrespondenceInfoForm', () => {
  describe('with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <CorrespondenceInfoForm />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders Correspondent field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Correspondent' }));
    });

    test('renders Description field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Description' }));
    });

    test('renders Date of correspondence DatePicker', async () => {
      await Datepicker('Date*').exists();
    });

    test('renders Mode select', async () => {
      await Select({ id : 'correspondence-mode' }).exists();
    });

    test('renders Status select', async () => {
      await Select({ id : 'correspondence-status' }).exists();
    });

    test('renders Category select', async () => {
      await Select({ id : 'correspondence-category' }).exists();
    });
  });

  describe('with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={correspondence} onSubmit={onSubmit}>
          <CorrespondenceInfoForm />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected value in the Description field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Description' })).toHaveDisplayValue('Test Description');
    });

    test('renders the expected value in the Correspondent field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Correspondent' })).toHaveDisplayValue('Test');
    });

    test('renders the expected value in the Date of correspondence field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Date' })).toHaveDisplayValue('12/30/2021');
    });

    test('renders the expected value in the Mode field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('combobox', { name: 'Mode' })).toHaveDisplayValue('Email');
    });

    test('renders the expected value in the Status field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('combobox', { name: 'Status' })).toHaveDisplayValue('Awaiting Reply');
    });

    test('renders the expected value in the Category field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('combobox', { name: 'Category' })).toHaveDisplayValue('Invoice');
    });
  });
});
