import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalFooter } from '@folio/stripes/components';

import { CreateInvoiceForm } from '../../InvoiceFormSections';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleInvoiceChange: PropTypes.func,

};

const InvoiceModal = ({ showModal, setShowModal, handleInvoiceChange }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  const renderModalFooter = (handleSubmit, formRestart) => {
    return (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          id="invoice-modal-save-button"
          onClick={() => {
            handleSubmit().then(formRestart);
          }}
          type="submit"
        >
          <FormattedMessage id="stripes-components.saveAndClose" />
        </Button>
        <Button
          buttonStyle="default"
          id="invoice-modal-cancel-button"
          onClick={() => setShowModal(false)}
        >
          <FormattedMessage id="stripes-components.cancel" />
        </Button>
      </ModalFooter>
    );
  };

  return (
    <Form
      // Setting initial values of type to serial instead of select field
      mutators={arrayMutators}
      onSubmit={handleClose}
      render={({ handleSubmit, form: { restart: formRestart } }) => (
        <form onSubmit={handleSubmit}>
          <Modal
            dismissible
            footer={renderModalFooter(handleSubmit, formRestart)}
            label={<FormattedMessage id="ui-oa.charge.invoice.newInvoice" />}
            onClose={() => setShowModal(false)}
            open={showModal}
          >
            <CreateInvoiceForm />
          </Modal>
        </form>
      )}
    />
  );
};

InvoiceModal.propTypes = propTypes;

export default InvoiceModal;
