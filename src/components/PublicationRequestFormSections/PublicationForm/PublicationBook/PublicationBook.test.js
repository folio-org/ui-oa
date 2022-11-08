
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-testing';
import { book, bookHandlers as handlers } from '../../../../../test/resources';
import { translationsProperties } from '../../../../../test/helpers';
import PublicationBook from './PublicationBook';

describe('PublicationBook', () => {
  let renderComponent;

  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={handlers.onSubmit}>
          <PublicationBook />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders headline Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Book details')).toBeInTheDocument();
    });

    test('renders publication year field', () => {
      const { getByRole } = renderComponent;
      expect(
        getByRole('textbox', { name: 'Date of publication' })
      ).toBeInTheDocument();
    });

    test('renders publication place field', () => {
      const { getByRole } = renderComponent;
      expect(
        getByRole('textbox', { name: 'Place of publication' })
      ).toBeInTheDocument();
    });
  });

  describe('renders components with initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={book} onSubmit={handlers.onSubmit}>
          <PublicationBook />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders publication year field', () => {
      const { getByRole } = renderComponent;
      expect(
        getByRole('textbox', { name: 'Date of publication' })
      ).toHaveDisplayValue('1996-10-10');
    });

    test('renders publication place field', () => {
      const { getByRole } = renderComponent;
      expect(
        getByRole('textbox', { name: 'Place of publication' })
      ).toHaveDisplayValue('Test Place');
    });
  });
});
