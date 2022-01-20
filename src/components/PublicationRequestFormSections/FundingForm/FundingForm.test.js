import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import { Accordion } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import FundingForm from './FundingForm';

jest.mock('../FieldArrays/FundingFieldArray', () => () => (
  <div>FundingFieldArray</div>
));

describe('PublicationStatusForm', () => {
  let renderComponent;

  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <FundingForm />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders Funding Accordion component', async () => {
      await Accordion('Funding').exists();
    });

    test('renders FundingFieldArray Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('FundingFieldArray')).toBeInTheDocument();
    });
  });
});
