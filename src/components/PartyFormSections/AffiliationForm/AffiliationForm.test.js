import '@folio/stripes-erm-components/test/jest/__mock__';
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { translationsProperties } from '../../../../test/helpers';
import AffiliationForm from './AffiliationForm';
import {
  partyHandlers as handlers,
  mockRefdata,
} from '../../../../test/resources';

let renderComponent;

jest.mock('../../../util', () => ({
  ...jest.requireActual('../../../util'),
  useOARefdata: () => mockRefdata.filter(
      (obj) => obj.desc === 'Party.InstitutionLevel1'
    ),
}));

describe('PartyInfoForm', () => {
  describe('with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={handlers.onSubmit}>
          <AffiliationForm />
        </TestForm>,
        translationsProperties
      );
    });
    test('renders Title field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('combobox', { name: 'Institution level 1' }));
    });

    test('renders Family Name field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Institution level 2' }));
    });
  });
});
