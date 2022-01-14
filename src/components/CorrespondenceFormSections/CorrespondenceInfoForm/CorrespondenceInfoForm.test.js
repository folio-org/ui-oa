import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-components/test/jest/helpers';
import { Datepicker, Select } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import CorrespondenceInfoForm from './CorrespondenceInfoForm';
import { data, initialValues } from './testResources';

const onSubmit = jest.fn();
let renderComponent;

describe('CorrespondenceInfoForm', () => {
  describe('with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm data={data} onSubmit={onSubmit}>
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
      await Select({ id : 'correspondence.mode' }).exists();
    });

    test('renders Status select', async () => {
      await Select({ id : 'correspondence.status' }).exists();
    });

    test('renders Category select', async () => {
      await Select({ id : 'correspondence.category' }).exists();
    });
  });

  describe('with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={data} onSubmit={onSubmit}>
          <CorrespondenceInfoForm data={data} />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected value in the Description field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Description' })).toHaveDisplayValue('Test Invoice');
    });
  });
});
