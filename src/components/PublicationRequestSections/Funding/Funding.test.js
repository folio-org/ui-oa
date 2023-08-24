import {
  renderWithIntl,
  Accordion,
  MultiColumnList,
  MultiColumnListCell,
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../../../test/helpers';
import Funding from './Funding';

import { publicationRequest } from '../../../../test/resources';

let renderComponent;

describe('Funding', () => {
  describe('renders components with no values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Funding request={null} />,
        translationsProperties
      );
    });

    test('renders Funding Accordion component', async () => {
      await Accordion('Funding').exists();
    });

    test('renders Empty list', () => {
      const { getByText } = renderComponent;
      expect(getByText('No funding for this request')).toBeInTheDocument();
    });
  });

  describe('renders components with values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <Funding request={publicationRequest} />,
        translationsProperties
      );
    });

    test('renders Funding Accordion component', async () => {
      await Accordion('Funding').exists();
    });

    test('renders Funding MCL component with values', async () => {
      await MultiColumnList({
        columns: ['Funder', 'Aspect funded'],
      }).exists();
      await MultiColumnListCell({ content: 'Funder 1' }).exists();
      await MultiColumnListCell({ content: 'Research' }).exists();
    });
  });
});
