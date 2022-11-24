
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { Datepicker, Select, KeyValue } from '@folio/stripes-testing';
import { translationsProperties } from '../../../../test/helpers';
import RequestInfoForm from './RequestInfoForm';
import { mockRefdata, publicationRequest, publicationRequestHandlers as handlers } from '../../../../test/resources';

jest.mock(
  '../../PublicationRequestFormSections/FieldArrays/ExternalRequestIdFieldArray',
  () => () => <div>ExternalRequestIdFieldArray</div>
);

jest.mock('../../../util', () => ({
  ...jest.requireActual('../../../util'),
  useOARefdata: () => mockRefdata.find(
    obj => (
      obj.desc === 'PublicationRequest.RequestStatus'
    )
  )?.values,
}));

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

    console.log(publicationRequest.requestStatus);

    test('renders Request number KeyValue Component', async () => {
      await KeyValue('Request number').exists();
    });

    test('renders Request date Datepicker Component', async () => {
      await Datepicker('Request date*').exists();
    });

    test('renders Status Select Component', async () => {
      await Select('Status*').exists();
    });

    test('renders ExternalRequestIdFieldArray Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('ExternalRequestIdFieldArray')).toBeInTheDocument();
    });
  });
  describe('renders components with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={publicationRequest} onSubmit={handlers.onSubmit}>
          <RequestInfoForm request={publicationRequest} />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the expected value in the Request number KeyValue component', async () => {
      await KeyValue('Request number').has({ value: '1' });
    });

    test('renders the expected value in the Request date field', async () => {
      await Datepicker('Request date*').has({ inputValue: '01/01/2022' });
    });
  });
});
