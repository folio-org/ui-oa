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
);//
jest.mock('../../../util/useOARefdata', () => () => []);


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

    test('renders "Request number Component', async () => {
      await KeyValue('Request number').exists();
    });

    test('renders "Request date" datepicker Component', async () => {
      await Datepicker('Request date*').exists();
    });

    test('renders "Status" select Component', async () => {
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
        expect(getByRole('textbox', { name: 'Request date' })).toHaveDisplayValue('01/01/2022');
      });

      // test('renders the expected value in the Request date field', () => {
      //   const { getByRole } = renderComponent;
      //   expect(getByRole('textbox', { name: 'Status' })).toHaveDisplayValue('Submitted');
      // });
    });
});
