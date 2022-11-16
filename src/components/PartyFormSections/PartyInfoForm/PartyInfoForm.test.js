
import { renderWithIntl, TestForm } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../../../test/helpers';
import PartyInfoForm from './PartyInfoForm';
import { party, partyHandlers as handlers } from '../../../../test/resources';

let renderComponent;

describe('PartyInfoForm', () => {
  describe('with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={handlers.onSubmit}>
          <PartyInfoForm />
        </TestForm>,
        translationsProperties
      );
    });
    test('renders Title field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Title' }));
    });

    test('renders Family Name field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Family name' }));
    });

    test('renders Given Names field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Given name(s)' }));
    });

    test('renders ORCID iD field', () => {
        const { getByRole } = renderComponent;
        expect(getByRole('textbox', { name: 'ORCID iD' }));
      });

      test('renders Main Email field', () => {
        const { getByRole } = renderComponent;
        expect(getByRole('textbox', { name: 'Main email address' }));
      });

      test('renders Phone field', () => {
        const { getByRole } = renderComponent;
        expect(getByRole('textbox', { name: 'Phone' }));
      });

      test('renders Mobile field', () => {
        const { getByRole } = renderComponent;
        expect(getByRole('textbox', { name: 'Mobile phone' }));
      });
  });

  describe('with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={party} onSubmit={handlers.onSubmit}>
          <PartyInfoForm />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders expected value in title field', () => {
        const { getByRole } = renderComponent;
        expect(getByRole('textbox', { name: 'Title' })).toHaveDisplayValue('Dr');
      });
    test('renders expected value Family Name field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Family name' })).toHaveDisplayValue('Dempsey');
    });

    test('renders expected value in Given Names field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Given name(s)' })).toHaveDisplayValue('Elijah');
    });

    test('renders expected value in ORCID iD field', () => {
        const { getByRole } = renderComponent;
        expect(getByRole('textbox', { name: 'ORCID iD' })).toHaveDisplayValue('0000-1111');
      });

      test('renders expected value in Main Email field', () => {
        const { getByRole } = renderComponent;
        expect(getByRole('textbox', { name: 'Main email address' })).toHaveDisplayValue('Elijah_Dempsey6074@brety.org');
      });

      test('renders expected value in Phone field', () => {
        const { getByRole } = renderComponent;
        expect(getByRole('textbox', { name: 'Phone' })).toHaveDisplayValue('012345678');
      });

      test('renders expected value in Mobile field', () => {
        const { getByRole } = renderComponent;
        expect(getByRole('textbox', { name: 'Mobile phone' })).toHaveDisplayValue('012345678');
      });
  });
});
