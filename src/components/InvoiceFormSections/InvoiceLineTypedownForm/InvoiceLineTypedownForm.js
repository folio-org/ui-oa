import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field, useForm, useFormState } from 'react-final-form';

import { Button, Layout, IconButton, Card } from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import { requiredValidator } from '@folio/stripes-erm-components';

import { InvoiceLineInfo } from '../../InvoiceSections';
import { InvoiceLineModal } from '../../Modals';
import InvoiceQueryTypedown from '../../InvoiceQueryTypedown';

const propTypes = {
  charge: PropTypes.object,
};

const InvoiceLineTypedownForm = ({ charge }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const [showInvoiceLineModal, setShowInvoiceLineModal] = useState(false);

  const handleInvoiceLineChange = (invoiceLine) => {
    change('invoiceLine', invoiceLine);
    setShowInvoiceLineModal(false);
  };

  const pathMutator = (input, path) => {
    const queryParams = [];
    queryParams.push(
      `limit=10&query=(invoiceId==${values?.selectedInvoice?.id})`
    );
    if (input) {
      queryParams.push(` and invoiceLineNumber=="*${input}*"`);
    }
    return `${path}?${queryParams.join('')}`;
  };

  const renderFooter = () => {
    return (
      <Layout className="textCentered">
        <Button
          buttonStyle="primary"
          marginBottom0
          onClick={() => setShowInvoiceLineModal(true)}
        >
          <FormattedMessage id="ui-oa.charge.invoiceLine.newInvoiceLine" />
        </Button>
      </Layout>
    );
  };

  const renderListItem = (invoiceLine) => {
    return (
      <>
        {invoiceLine?.invoiceLineNumber + ', '}
        {invoiceLine?.description?.length > 50
          ? invoiceLine?.description.substr(0, 49) + '...'
          : invoiceLine?.description}
        {invoiceLine?.total && ', ' + invoiceLine.total}
        {invoiceLine?.invoiceLineStatus && ', ' + invoiceLine.invoiceLineStatus}
      </>
    );
  };

  return (
    <>
      {/* TODO Change this component to QueryTypedown when data mutation has been added */}
      <Field
        component={InvoiceQueryTypedown}
        identifier="invoiceLines"
        label={
          <FormattedMessage id="ui-oa.charge.invoiceLine.addInvoiceLine" />
        }
        name="invoiceLine"
        path="invoice/invoice-lines"
        pathMutator={pathMutator}
        renderFooter={renderFooter}
        renderListItem={renderListItem}
        required
        validate={requiredValidator}
      />
      {values?.invoiceLine && (
        <Card
          cardStyle="positive"
          headerEnd={
            <IconButton
              icon="trash"
              onClick={() => handleInvoiceLineChange()}
            />
          }
          headerStart={
            <AppIcon app="invoice" size="small">
              <strong>{values?.invoiceLine?.invoiceLineNumber}</strong>
            </AppIcon>
          }
        >
          <InvoiceLineInfo invoiceLine={values?.invoiceLine} />
        </Card>
      )}
      <InvoiceLineModal
        charge={charge}
        handleInvoiceLineChange={handleInvoiceLineChange}
        setShowModal={setShowInvoiceLineModal}
        showModal={showInvoiceLineModal}
      />
    </>
  );
};

InvoiceLineTypedownForm.propTypes = propTypes;

export default InvoiceLineTypedownForm;
