import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useMutation, useQuery } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy } from '@folio/stripes/core';
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
  const ky = useOkapiKy();
  const handleClose = () => {
    setShowModal(false);
  };

  const { data: batchGroups } = useQuery(
    ['ui-oa', 'InvoiceModal', 'batchGroup'],
    () => ky('batch-groups').json()
  );

  const { mutateAsync: postInvoice } = useMutation(
    ['ui-oa', 'InvoiceModal', 'postInvoice'],
    (data) => ky.post('invoice/invoices', { json: data }).json().then((res) => {
    handleInvoiceChange(res);
    handleClose();
    })
  );

  const submitInvoice = (values) => {
    const submitValues = { ...values, source: 'User', status: 'Open' };
    postInvoice(submitValues);
  };

  const renderModalFooter = (handleSubmit, formRestart) => {
    return (
      <ModalFooter>
        <Button
          buttonStyle="primary"
          id="invoice-modal-save-button"
          onClick={() => {
            handleSubmit();
            formRestart();
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
        exchangeRate: charge?.exchangeRate?.coefficient,
      }}
      // Setting initial values of type to serial instead of select field
      mutators={arrayMutators}
      onSubmit={submitInvoice}
      render={({ handleSubmit, form: { restart: formRestart } }) => (
        <form onSubmit={handleSubmit}>
          <Modal
            dismissible
            footer={renderModalFooter(handleSubmit, formRestart)}
            label={<FormattedMessage id="ui-oa.charge.invoice.newInvoice" />}
            onClose={() => setShowModal(false)}
            open={showModal}
          >
            <CreateInvoiceForm
              batchGroups={batchGroups?.batchGroups}
              charge={charge}
            />
          </Modal>
        </form>
      )}
    />
  );
};

InvoiceModal.propTypes = propTypes;

export default InvoiceModal;
