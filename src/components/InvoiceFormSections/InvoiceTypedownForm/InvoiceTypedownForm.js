import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field, useForm, useFormState } from 'react-final-form';

import { useQueryClient } from 'react-query';

import {
  Button,
  Layout,
  IconButton,
  Card,
  Tooltip,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import { requiredValidator } from '@folio/stripes-erm-components';

import {
  QueryTypedown,
  typedownQueryKey,
} from '@k-int/stripes-kint-components';

import { InvoiceModal } from '../../Modals';
import { InvoiceInfo } from '../../InvoiceSections';

const propTypes = {
  charge: PropTypes.object,
};

const InvoiceTypedownForm = ({ charge }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const invoicesPath = 'invoice/invoices';
  const queryClient = useQueryClient();

  const handleInvoiceChange = (invoice) => {
    if (values?.invoiceLine) {
      change('invoiceLine', null);
    }
    change('selectedInvoice', invoice);
    setShowInvoiceModal(false);
    queryClient.invalidateQueries(typedownQueryKey(invoicesPath));
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
    return (
      <>
        {invoice?.vendorInvoiceNo}
        {', ' + invoice?.status}
        {invoice?.total ? ', ' + invoice.total + ' ' + invoice?.currency : ''}
      </>
    );
  };

  return (
    <>
      {/* Field name must be "selectedInvoice" to prevent both typedowns from being opened */}
      <Field
        component={QueryTypedown}
        dataFormatter={(data) => data?.invoices}
        label={<FormattedMessage id="ui-oa.charge.invoice.addInvoice" />}
        name="selectedInvoice"
        onChange={() => {
          if (values?.invoiceLine) {
            change('invoiceLine', null);
          }
        }}
        path={invoicesPath}
        pathMutator={pathMutator}
        renderFooter={renderFooter}
        renderListItem={renderListItem}
        required
        validate={requiredValidator}
      />
      {values?.selectedInvoice && (
        <Card
          cardStyle="positive"
          headerEnd={
            <Tooltip
              text={
                <FormattedMessage
                  id="ui-oa.charge.invoice.removeInvoice"
                />
              }
            >
              {({ ref, ariaIds }) => (
                <IconButton
                  ref={ref}
                  aria-describedby={ariaIds.sub}
                  aria-labelledby={ariaIds.text}
                  icon="trash"
                  onClick={() => handleInvoiceChange()}
                />
              )}
            </Tooltip>
          }
          headerStart={
            <AppIcon app="invoice" size="small">
              <strong>{values?.selectedInvoice?.vendorInvoiceNo}</strong>
            </AppIcon>
          }
        >
          <InvoiceInfo charge={charge} invoice={values?.selectedInvoice} />
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
