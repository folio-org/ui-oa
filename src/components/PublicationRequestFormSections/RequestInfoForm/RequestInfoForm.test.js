import '@folio/stripes-erm-components/test/jest/__mock__';
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { Datepicker, Select, KeyValue } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import RequestInfoForm from './RequestInfoForm';
import {
  initialValues,
  handlers,
} from '../../../../test/resources/publicationRequestsResources';

jest.mock(
  '../../PublicationRequestFormSections/FieldArrays/ExternalRequestIdFieldArray',
  () => () => <div>ExternalRequestIdFieldArray</div>
);

jest.mock('../../../util/useOARefdata', () => () => [
  { id: '2c9180b07e6ade90017e6ae3bd520023', value: 'in_progress', label: 'In progress' },
  { id: '2c9180b07e6ade90017e6ae3bd4b0022', value: 'closed', label: 'Closed' },
  { id: '2c9180b07e6ade90017e6ae3bd450021', value: 'new', label: 'New' },
]);

describe('RequestInfoForm', () => {
  let renderComponent;

  describe('renders components with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={handlers.onSubmit}>
          <RequestInfoForm />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders Request number KeyValue Component', async () => {
      await KeyValue('Request number').exists();
    });

    test('renders Request date Datepicker Component', async () => {
      await Datepicker('Request date*').exists();
    });

    test('renders Status Select Component', async () => {
      await Select().exists();
    });

    test('renders ExternalRequestIdFieldArray Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ExternalRequestIdFieldArray')).toBeInTheDocument();
    });
  });
  describe('renders components with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={initialValues} onSubmit={handlers.onSubmit}>
          <RequestInfoForm />
        </TestForm>,
        translationsProperties
      );
    });

    // test('renders "Request number Component', async () => {
    //   await KeyValue('Request number').has
    // });

    test('renders the expected value in the Request date field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Request date' })).toHaveDisplayValue(
        '01/01/2022'
      );
    });

    test('renders the expected value in the Status field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('combobox', { name: 'Status' })).toHaveDisplayValue('New');
    });
  });
});
