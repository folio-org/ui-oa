import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { FormattedMessage } from 'react-intl';
import { useFormState } from 'react-final-form';

import { useOkapiKy } from '@folio/stripes/core';
import {
  Row,
  Col,
  KeyValue,
  ConfirmationModal,
  MessageBanner,
} from '@folio/stripes/components';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleInvoiceLineChange: PropTypes.func,
  charge: PropTypes.object,
};

const InvoiceLineModal = ({
  showModal,
  setShowModal,
  handleInvoiceLineChange,
  charge,
}) => {
  const ky = useOkapiKy();
  const { values } = useFormState();

  const chargeInvoiceLine = {
    invoiceId: values?.selectedInvoice?.id,
    description: charge.description
      ? charge?.category?.label + ': ' + charge?.description
      : charge?.category?.label,
    invoiceLineStatus: 'Open',
    quantity: '1',
    subTotal: charge?.amount?.value,
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const { mutateAsync: postInvoiceLine, isLoading } = useMutation(
    ['ui-oa', 'InvoiceLineModal', 'postInvoiceLine'],
    (data) => ky
        .post('invoice/invoice-lines', { json: data })
        .json()
        .then((res) => {
          handleInvoiceLineChange(res);
          handleClose();
        })
  );

  const renderModalMessage = () => {
    return (
      <>
        <Row>
          <Col xs={12}>
            <FormattedMessage
              id="ui-oa.charge.invoiceLine.newInvoiceLineMessage"
              values={{ invoiceNo: values?.selectedInvoice?.vendorInvoiceNo }}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-oa.charge.description" />}
              value={
                charge.description
                  ? charge?.category?.label + ': ' + charge?.description
                  : charge?.category?.label
              }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-oa.charge.invoiceLine.status" />}
              value={
                <FormattedMessage id="ui-oa.charge.invoiceLine.status.open" />
              }
            />
          </Col>
          <Col xs={3}>
            <KeyValue
              label={
                <FormattedMessage id="ui-oa.charge.invoiceLine.quantity" />
              }
              value="1"
            />
          </Col>
          <Col xs={3}>
            <KeyValue
              label={<FormattedMessage id="ui-oa.charge.invoiceLine.total" />}
              value={charge?.amount?.value}
            />
          </Col>
        </Row>
        {charge?.amount?.baseCurrency !== values?.selectedInvoice?.currency && (
          <MessageBanner type="warning">
            <FormattedMessage
              id="ui-oa.charge.invoiceLine.currencyDifferenceMessage"
              values={{
                chargeCurrency: charge?.amount?.baseCurrency,
                invoiceCurrency: values?.selectedInvoice?.currency,
              }}
            />
          </MessageBanner>
        )}
        <br />
        <Row>
          <Col xs={12}>
            <FormattedMessage id="ui-oa.charge.invoiceLine.newInvoiceLineConfirmMessage" />
          </Col>
        </Row>
      </>
    );
  };

  return (
    <ConfirmationModal
      heading={
        <FormattedMessage id="ui-oa.charge.invoiceLine.newInvoiceLine" />
      }
      message={renderModalMessage()}
      onCancel={() => setShowModal(false)}
      onConfirm={() => {
        if (!isLoading) {
          postInvoiceLine(chargeInvoiceLine);
        }
      }}
      open={showModal}
    />
  );
};

InvoiceLineModal.propTypes = propTypes;

export default InvoiceLineModal;
