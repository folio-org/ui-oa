import '@folio/stripes-erm-components/test/jest/__mock__';
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { Button } from '@folio/stripes-testing';
import { translationsProperties } from '../../../../test/helpers';
import PartyForm from './PartyForm';
import { party, partyHandlers as handlers, mockRefdata } from '../../../../test/resources';

jest.mock('../../PartyFormSections/PartyInfoForm/PartyInfoForm', () => () => (
  <div>PartyInfoForm</div>
));

jest.mock('../../../util', () => ({
  ...jest.requireActual('../../../util'),
  useOARefdata: () => mockRefdata.filter(
      (obj) => obj.desc === 'Party.InstitutionLevel1'
    ),
}));

const onSubmit = jest.fn();

describe('PartyForm', () => {
  let renderComponent;

  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <PartyForm
            handlers={handlers}
            queryStates={{ isLoading: false, isSubmitting: false }}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders "Create person" condtional', () => {
      const { getByText } = renderComponent;
      expect(getByText('New person')).toBeInTheDocument();
    });

    test('renders PartyInfoForm Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PartyInfoForm')).toBeInTheDocument();
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
          <PartyForm
            handlers={handlers}
            party={party}
            queryStates={{ isLoading: false, isSubmitting: false }}
          />
          ,
        </TestForm>,
        translationsProperties
      );
    });

    test('renders "Edit person" condtional', () => {
      const { getByText } = renderComponent;
      expect(getByText('Edit person')).toBeInTheDocument();
    });
  });
});
