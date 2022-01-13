import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-components/test/jest/helpers';
import translationsProperties from '../../../../test/helpers';
import CorrespondenceInfoForm from './CorrespondenceInfoForm';
import { data } from './testResources';

const onSubmit = jest.fn();
let renderComponent;

describe('CorrespondenceInfoForm', () => {
  describe('with no initial values', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm data={data} onSubmit={onSubmit}>
          <CorrespondenceInfoForm />
        </TestForm>, translationsProperties
      );
    });

    test('renders Correspondent field', () => {
      const { getByRole } = renderComponent;
      expect(getByRole('textbox', { name: 'Correspondent' }));
    });
  });
});

