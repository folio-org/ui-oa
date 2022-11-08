import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { Datepicker, Select, TextArea, TextField } from '@folio/stripes-testing';
import { translationsProperties } from '../../../../test/helpers';
import CorrespondenceInfoForm from './CorrespondenceInfoForm';
import { correspondence, mockRefdata } from '../../../../test/resources';

const onSubmit = jest.fn();
jest.mock('../../../util', () => ({
  ...jest.requireActual('../../../util'),
  useOARefdata: () => mockRefdata.filter(
    obj => (
      obj.desc === 'Correspondence.Category' ||
      obj.desc === 'Correspondence.Mode' ||
      obj.desc === 'Correspondence.Status'
    )
  ),
}));

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

    test('renders Correspondent field', async () => {
      await TextField('Correspondent*').exists();
    });

    test('renders Description field', async () => {
      await TextArea('Description*').exists();
    });

    test('renders Date of correspondence DatePicker', async () => {
      await Datepicker('Date*').exists();
    });

    test('renders Mode select', async () => {
      await Select('Mode*').exists();
    });

    test('renders Status select', async () => {
      await Select('Status*').exists();
    });

    test('renders Category select', async () => {
      await Select('Category').exists();
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

    test('renders the expected value in the Correspondent field', async () => {
      await TextField('Correspondent*').has({ value: 'Test' });
    });

    test('renders the expected value in the Description field', async () => {
      await TextArea('Description*').has({ value: 'Test Description' });
    });

    test('renders the expected value in the Date of correspondence field', async () => {
      await Datepicker('Date*').has({ inputValue: '12/30/2021' });
    });

    test('renders the expected value in the Mode field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('combobox', { name: 'Mode' })).toHaveDisplayValue(
        'Email'
      );
    });

    test('renders the expected value in the Status field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('combobox', { name: 'Status' })).toHaveDisplayValue(
        'Awaiting Reply'
      );
    });

    test('renders the expected value in the Category field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('combobox', { name: 'Category' })).toHaveDisplayValue(
        'Invoice'
      );
    });
  });
});
