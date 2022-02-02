import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { MemoryRouter } from 'react-router-dom';
import translationsProperties from '../../../../test/helpers';
import PublicationRequest from './PublicationRequest';
import {
  publicationRequest,
  handlers,
} from '../../../../test/resources/publicationRequestsResources';

jest.mock('../../PublicationRequestSections/RequestInfo', () => () => (
  <div>RequestInfo</div>
));
jest.mock('../../PublicationRequestSections/CorrespondingAuthor', () => () => (
  <div>CorrespondingAuthor</div>
));
jest.mock('../../PublicationRequestSections/RequestContact', () => () => (
  <div>RequestContact</div>
));
jest.mock('../../PublicationRequestSections/Publication', () => () => (
  <div>Publication</div>
));
jest.mock('../../PublicationRequestSections/PublicationStatus', () => () => (
  <div>PublicationStatus</div>
));
jest.mock('../../PublicationRequestSections/Funding', () => () => (
  <div>Funding</div>
));
jest.mock('../../PublicationRequestSections/Agreement', () => () => (
  <div>Agreement</div>
));
jest.mock('../../PublicationRequestSections/Correspondence', () => () => (
  <div>Correspondence</div>
));

describe('PublicationRequest', () => {
  let renderComponent;
  describe('renders components with no publication request', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PublicationRequest onClose={handlers.onClose} />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders MetaSection Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Record created: Unknown')).toBeInTheDocument();
      expect(getByText('Record last updated: Unknown')).toBeInTheDocument();
    });

    test('renders RequestInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('RequestInfo')).toBeInTheDocument();
    });

    test('renders Publication Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Publication')).toBeInTheDocument();
    });

    test('renders PublicationStatus Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PublicationStatus')).toBeInTheDocument();
    });

    test('renders Correspondence Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Correspondence')).toBeInTheDocument();
    });
  });

  describe('renders components publication request', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <PublicationRequest
            onClose={handlers.onClose}
            resource={publicationRequest}
          />
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders MetaSection Component', () => {
      const { getByText } = renderComponent;
      expect(
        getByText('Record created: 1/18/2022 10:05 AM')
      ).toBeInTheDocument();
      expect(
        getByText('Record last updated: 1/18/2022 10:24 AM')
      ).toBeInTheDocument();
    });

    test('renders RequestInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('RequestInfo')).toBeInTheDocument();
    });

    test('renders CorrespondingAuthor Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('CorrespondingAuthor')).toBeInTheDocument();
    });

    test('renders RequestContact Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('RequestContact')).toBeInTheDocument();
    });

    test('renders Publication Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Publication')).toBeInTheDocument();
    });

    test('renders PublicationStatus Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('PublicationStatus')).toBeInTheDocument();
    });

    test('renders Funding Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Funding')).toBeInTheDocument();
    });

    test('renders Correspondence Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('Correspondence')).toBeInTheDocument();
    });
  });
});
