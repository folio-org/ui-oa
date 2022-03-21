import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field, useForm, useFormState } from 'react-final-form';

import {
  Button,
  Layout,
  Label,
  IconButton,
  Card,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';

import { InvoiceModal } from '../../Modals';
import InvoiceInfo from '../../InvoiceSections';
import InvoiceQueryTypedown from '../../InvoiceQueryTypedown';

const propTypes = {
  charge: PropTypes.object,
};

const InvoiceTypedownForm = ({ charge }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleInvoiceChange = (invoice) => {
    change('invoice', invoice);
    setShowInvoiceModal(false);
  };

  const pathMutator = (input, path) => {
    return `${path}`;
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
      <>
        <Label>
          <FormattedMessage id="ui-oa.charge.invoice.addInvoice" />
        </Label>
        <Field
          component={InvoiceQueryTypedown}
          identifier="invoices"
          name="invoice"
          path="invoice/invoices"
          pathMutator={pathMutator}
          renderFooter={renderFooter}
          renderListItem={renderListItem}
        />
        {values.invoice && (
          <Card
            cardStyle="positive"
            headerEnd={
              <IconButton icon="trash" onClick={() => handleInvoiceChange()} />
            }
            headerStart={
              <AppIcon app="invoice" size="small">
                <strong>{values?.invoice?.vendorInvoiceNo}</strong>
              </AppIcon>
            }
          >
            <InvoiceInfo invoice={values?.invoice} />
          </Card>
        )}
      </>
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
