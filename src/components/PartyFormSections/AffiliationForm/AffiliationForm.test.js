import { renderWithIntl, TestForm, Select } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../../test/helpers';
import AffiliationForm from './AffiliationForm';
import {
  partyHandlers as handlers,
  mockRefdata,
} from '../../../../test/resources';

let renderComponent;

jest.mock('../../../util', () => ({
  ...jest.requireActual('../../../util'),
  useOARefdata: () => mockRefdata.filter((obj) => obj.desc === 'Party.InstitutionLevel1'),
}));

describe('AffiliationForm', () => {
  describe('with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={handlers.onSubmit}>
          <AffiliationForm />
        </TestForm>,
        translationsProperties
      );
    });
    test('renders Institution level 1 field', async () => {
      await Select('Institution level 1').exists();
    });

    test('renders Institution level 2 field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Institution level 2' }));
    });
  });
});
