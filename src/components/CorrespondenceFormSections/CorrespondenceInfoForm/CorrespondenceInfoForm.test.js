import '@folio/stripes-erm-components/test/jest/__mock__';
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { Datepicker, Select } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import CorrespondenceInfoForm from './CorrespondenceInfoForm';
import { correspondence } from '../../../../test/resources/correspondenceResources';

const onSubmit = jest.fn();
let renderComponent;

jest.mock('../../../util/useOARefdata', () => () => [
  {
    id: '2c9180b17f432ae2017f432f6b7c002e',
    desc: 'Correspondence.Category',
    internal: true,
    values: [
      {
        id: '2c9180b17f432ae2017f432f6b850030',
        value: 'funding',
        label: 'Funding',
      },
      {
        id: '2c9180b17f432ae2017f432f6b7e002f',
        value: 'invoice',
        label: 'Invoice',
      },
    ],
  },
  {
    id: '2c9180b17f432ae2017f432f6b6d002b',
    desc: 'Correspondence.Mode',
    internal: true,
    values: [
      {
        id: '2c9180b17f432ae2017f432f6b71002c',
        value: 'email',
        label: 'Email',
      },
      {
        id: '2c9180b17f432ae2017f432f6b77002d',
        value: 'telephone',
        label: 'Telephone',
      },
    ],
  },
  {
    id: '2c9180b17f432ae2017f432f6b8a0031',
    desc: 'Correspondence.Status',
    internal: true,
    values: [
      {
        id: '2c9180b17f432ae2017f432f6b8d0032',
        value: 'awaiting_reply',
        label: 'Awaiting Reply',
      },
      {
        id: '2c9180b17f432ae2017f432f6b9a0034',
        value: 'closed',
        label: 'Closed',
      },
      {
        id: '2c9180b17f432ae2017f432f6b940033',
        value: 'response_needed',
        label: 'Response Needed',
      },
    ],
  },
]);

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
      await Select({ id: 'correspondence-mode' }).exists();
    });

    test('renders Status select', async () => {
      await Select({ id: 'correspondence-status' }).exists();
    });

    test('renders Category select', async () => {
      await Select({ id: 'correspondence-category' }).exists();
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
      expect(getByRole('textbox', { name: 'Description' })).toHaveDisplayValue(
        'Test Description'
      );
    });

    test('renders the expected value in the Correspondent field', () => {
      const { getByRole } = renderComponent;
      expect(
        getByRole('textbox', { name: 'Correspondent' })
      ).toHaveDisplayValue('Test');
    });

    test('renders the expected value in the Date of correspondence field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Date' })).toHaveDisplayValue(
        '12/30/2021'
      );
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
