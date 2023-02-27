import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { useMutation, useQuery } from 'react-query';
import { FormattedMessage } from 'react-intl';

import { useOkapiKy } from '@folio/stripes/core';
import { FormModal } from '@k-int/stripes-kint-components';

import CreateInvoiceForm from '../../InvoiceFormSections/CreateInvoiceForm';

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
    (data) => ky.post('invoice/invoices', { json: data }).json()
  );

  const submitInvoice = async (values, form) => {
    const submitValues = { ...values, source: 'User', status: 'Open' };
    await postInvoice(submitValues).then((res) => {
      handleInvoiceChange(res);
      handleClose();
      form.restart();
    });
  };

  return (
    <FormModal
      initialValues={{
        currency: charge?.exchangeRate?.fromCurrency,
        exchangeRate: charge?.exchangeRate?.coefficient,
      }}
      // Setting initial values of type to serial instead of select field
      modalProps={{
        onClose: handleClose,
        open: showModal,
        label: <FormattedMessage id="ui-oa.charge.invoice.newInvoice" />,
      }}
      mutators={arrayMutators}
      onSubmit={submitInvoice}
    >
      <CreateInvoiceForm
        batchGroups={batchGroups?.batchGroups}
        charge={charge}
      />
    </FormModal>
  );
};

InvoiceModal.propTypes = propTypes;

export default InvoiceModal;
