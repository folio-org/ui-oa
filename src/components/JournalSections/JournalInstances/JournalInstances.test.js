
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { within } from '@folio/jest-config-stripes/testing-library/react';
import { translationsProperties } from '../../../../test/helpers';
import JournalInstances from './JournalInstances';
import { journal } from '../../../../test/resources';

describe('JournalInstances', () => {
  let renderComponent;
  describe('renders components with no title instances', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <JournalInstances />,
        translationsProperties
      );
    });

    test('renders no title instances', () => {
      const { queryAllByTestId } = renderComponent;
      expect(queryAllByTestId(/journalInstances\[.*\]/).length).toEqual(0);
    });

    test('renders no title instances message', () => {
      const { getByText } = renderComponent;
      expect(
        getByText('No title instances for this journal')
      ).toBeInTheDocument();
    });
  });

  describe('renders components several title instances', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <JournalInstances journal={journal} />,
        translationsProperties
      );
    });

    test('renders the correct number of title instances', () => {
      const { queryAllByTestId } = renderComponent;
      expect(queryAllByTestId(/journalInstances\[.*\]/).length).toEqual(2);
    });

    test('renders the correct values with fields', () => {
      const { queryByTestId } = renderComponent;
      expect(within(queryByTestId('journalInstances[0]')).getByText('Electronic'));
      expect(within(queryByTestId('journalInstances[0]')).getByText('ISSN'));

      expect(within(queryByTestId('journalInstances[1]')).getByText('Print'));
      expect(within(queryByTestId('journalInstances[1]')).getByText('ISSN'));
    });
  });
});
