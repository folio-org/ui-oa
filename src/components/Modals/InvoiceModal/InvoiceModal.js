import PropTypes from 'prop-types';
import { Form, useFormState } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalFooter } from '@folio/stripes/components';

import { CreateInvoiceForm } from '../../InvoiceFormSections';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleInvoiceChange: PropTypes.func,
  charge: PropTypes.object,
};

const InvoiceModal = ({
  showModal,
  setShowModal,
  handleInvoiceChange,
  charge,
}) => {
  const { values } = useFormState();
  const handleClose = () => {
    setShowModal(false);
  };

  const postInvoice = () => {
    handleClose();
  };

  const renderModalFooter = (handleSubmit, formRestart) => {
    return (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          id="invoice-modal-save-button"
          onClick={() => {
            handleSubmit();
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
      initialValues={{
        currency: charge?.exchangeRate?.fromCurrency,
        exchangeRate: charge?.exchangeRate?.toCurrency,
      }}
      // Setting initial values of type to serial instead of select field
      mutators={arrayMutators}
      onSubmit={postInvoice}
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
