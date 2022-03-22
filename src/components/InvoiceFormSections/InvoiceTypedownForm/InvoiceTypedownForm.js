import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field, useForm, useFormState } from 'react-final-form';

import {
  Button,
  Layout,
  IconButton,
  Card,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { InvoiceModal } from '../../Modals';
import { InvoiceInfo } from '../../InvoiceSections';
import InvoiceQueryTypedown from '../../InvoiceQueryTypedown';

const propTypes = {
  charge: PropTypes.object,
};

const InvoiceTypedownForm = ({ charge }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleInvoiceChange = (invoice) => {
    change('invoiceLine', null);
    change('selectedInvoice', invoice);
    setShowInvoiceModal(false);
  };

  const pathMutator = (input, path) => {
    const queryParams = [];
    if (input) {
      queryParams.push(`query=vendorInvoiceNo=="*${input}*"`);
    }
    queryParams.push('limit=10');
    return `${path}?${queryParams.join('&')}`;
  };

  const renderFooter = () => {
    return (
      <Layout className="textCentered">
        <Button
          buttonStyle="primary"
          marginBottom0
          onClick={() => setShowInvoiceModal(true)}
        >
          <FormattedMessage id="ui-oa.charge.invoice.newInvoice" />
        </Button>
      </Layout>
    );
  };

  const renderListItem = (invoice) => {
    return <>{invoice?.vendorInvoiceNo}</>;
  };

  return (
    <>
      {/* Field name must be "selectedInvoice" to prevent both typedowns from being opened */}
      {/* TODO Change this component to QueryTypedown when data mutation has been added */}
      <Field
        component={InvoiceQueryTypedown}
        identifier="invoices"
        label={<FormattedMessage id="ui-oa.charge.invoice.addInvoice" />}
        name="selectedInvoice"
        onChange={() => change('invoiceLine', null)}
        path="invoice/invoices"
        pathMutator={pathMutator}
        renderFooter={renderFooter}
        renderListItem={renderListItem}
      />
      {values?.selectedInvoice && (
        <Card
          cardStyle="positive"
          headerEnd={
            <IconButton icon="trash" onClick={() => handleInvoiceChange()} />
          }
          headerStart={
            <AppIcon app="invoice" size="small">
              <strong>{values?.selectedInvoice?.vendorInvoiceNo}</strong>
            </AppIcon>
          }
        >
          <InvoiceInfo invoice={values?.selectedInvoice} />
        </Card>
      )}
      <InvoiceModal
        charge={charge}
        handleInvoiceChange={handleInvoiceChange}
        setShowModal={setShowInvoiceModal}
        showModal={showInvoiceModal}
      />
    </>
  );
};

InvoiceTypedownForm.propTypes = propTypes;

export default InvoiceTypedownForm;
