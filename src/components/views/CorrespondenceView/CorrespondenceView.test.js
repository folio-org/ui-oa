import '@folio/stripes-erm-components/test/jest/__mock__';
import { renderWithIntl } from '@folio/stripes-erm-components/test/jest/helpers';
import { KeyValue, Button, Modal } from '@folio/stripes-testing';
import translationsProperties from '../../../../test/helpers';
import CorrespondenceView from './CorrespondenceView';
import {
  correspondence,
  handlers,
} from '../../../../test/resources/correspondenceResources';

describe('CorrespondenceForm', () => {
  describe('renders components', () => {
    beforeEach(() => {
      renderWithIntl(
        <CorrespondenceView
          onClose={handlers.onClose}
          onDelete={handlers.onDelete}
          onEdit={handlers.onEdit}
        />,
        translationsProperties
      );
    });
    test('renders Correspondent KeyValue', async () => {
      await KeyValue('Correspondent').exists();
    });

    test('renders Date KeyValue', async () => {
      await KeyValue('Date').exists();
    });

    test('renders Status KeyValue', async () => {
      await KeyValue('Status').exists();
    });

    test('renders Mode KeyValue', async () => {
      await KeyValue('Mode').exists();
    });

    test('renders Category KeyValue', async () => {
      await KeyValue('Category').exists();
    });

    test('renders Description KeyValue', async () => {
      await KeyValue('Description').exists();
    });
  });

  describe('renders Initial Values and Buttons/Modals', () => {
    beforeEach(() => {
      renderWithIntl(
        <CorrespondenceView
          correspondence={correspondence}
          onClose={handlers.onClose}
          onDelete={handlers.onDelete}
          onEdit={handlers.onEdit}
        />,
        translationsProperties
      );
    });
    test('renders Correspondent with initial value', async () => {
      await KeyValue('Correspondent').has({ value: 'Test' });
    });

    test('renders Date with initial value', async () => {
      await KeyValue('Date').has({ value: '2021-12-30' });
    });

    test('renders Status with initial value', async () => {
      await KeyValue('Status').has({ value: 'Awaiting Reply' });
    });

    test('renders Mode with initial value', async () => {
      await KeyValue('Mode').has({ value: 'Email' });
    });

    test('renders Category with initial value', async () => {
      await KeyValue('Category').has({ value: 'Invoice' });
    });

    test('renders Description with initial value', async () => {
      await KeyValue('Description').has({ value: 'Test Description' });
    });

    test('renders Confirmation modal and triggers expected callbacks', async () => {
      await Button('Actions').click();
      await Button('Delete').click();
      await Modal('Delete correspondence').exists();
      await Button('Cancel').click();
      await Button('Actions').click();
      await Button('Delete').click();
      await Modal('Delete correspondence').exists();
      await Button('Delete').click();
      expect(handlers.onDelete).toHaveBeenCalled();
    });

    test('renders Edit button and triggers expected callback', async () => {
      await Button('Actions').click();
      await Button('Edit').click();
      expect(handlers.onEdit).toHaveBeenCalled();
    });
  });
});
