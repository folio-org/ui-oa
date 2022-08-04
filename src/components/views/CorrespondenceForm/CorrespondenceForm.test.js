import '@folio/stripes-erm-components/test/jest/__mock__';
import {
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-components/test/jest/helpers';
import { Button } from '@folio/stripes-testing';
import { translationsProperties } from '../../../../test/helpers';
import CorrespondenceForm from './CorrespondenceForm';
import {
  correspondence,
  correspondenceHandlers as handlers
} from '../../../../test/resources';

jest.mock(
  '../../CorrespondenceFormSections/CorrespondenceInfoForm/',
  () => () => <div>CorrespondenceInfoForm</div>
);

const onSubmit = jest.fn();

describe('CorrespondenceForm', () => {
  let renderComponent;

  describe('renders components', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm onSubmit={onSubmit}>
          <CorrespondenceForm
            handlers={handlers}
            queryStates={{ isLoading: false, isSubmitting: false }}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders "New Correspondent condtional', () => {
      const { getByText } = renderComponent;
      expect(getByText('New correspondence')).toBeInTheDocument();
    });

    test('renders CorrespondenceInfo Component', () => {
      const { getByText } = renderComponent;
      expect(getByText('CorrespondenceInfoForm')).toBeInTheDocument();
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
          <CorrespondenceForm
            correspondence={correspondence}
            handlers={handlers}
            queryStates={{ isLoading: false, isSubmitting: false }}
          />{' '}
        </TestForm>,
        translationsProperties
      );
    });

    test('renders "Edit Correspondent condtional', () => {
      const { getByText } = renderComponent;
      expect(getByText('Edit correspondence')).toBeInTheDocument();
    });
  });
});
