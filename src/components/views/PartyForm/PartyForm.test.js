import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { Button } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import PartyForm from './PartyForm';
import {
  handlers,
  party,
} from '../../../../test/resources/partyResources';

jest.mock(
  '../../PartyFormSections/PartyInfoForm/PartyInfoForm',
  () => () => <div>PartyInfoForm</div>
);

describe('PartyForm', () => {
  let renderComponent;

  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <PartyForm handlers={handlers} />,
        translationsProperties
      );
    });

    test('renders "Create person" condtional', () => {
      const { getByText } = renderComponent;
      expect(getByText('Create person')).toBeInTheDocument();
    });

    test('renders PartyInfoForm Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PartyInfoForm')).toBeInTheDocument();
    });

    test('renders and triggers Cancel Button', async () => {
      await Button('Cancel').click();
      expect(handlers.onClose).toHaveBeenCalled();
    });

    test('renders and triggers Save and Close Button', async () => {
      await Button('Save and close').click();
      expect(handlers.onSubmit).toHaveBeenCalled();
    });
  });

  describe('renders conditionals with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <PartyForm
          handlers={handlers}
          party={party}
        />,
        translationsProperties
      );
    });

    test('renders "Edit person" condtional', () => {
      const { getByText } = renderComponent;
      expect(getByText('Edit person')).toBeInTheDocument();
    });
  });
});