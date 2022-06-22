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
  MessageBanner,
  Tooltip,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import { requiredValidator } from '@folio/stripes-erm-components';

import {
  highlightString,
  QueryTypedown,
  typedownQueryKey,
} from '@k-int/stripes-kint-components';

import css from './InvoiceLineTypedownForm.css';
import { InvoiceLineInfo } from '../../InvoiceSections';
import { InvoiceLineModal } from '../../Modals';

const propTypes = {
  charge: PropTypes.object,
  lineGenerated: PropTypes.bool,
  setLineGenerated: PropTypes.func
};

const InvoiceLineTypedownForm = ({ charge, lineGenerated, setLineGenerated }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const [showInvoiceLineModal, setShowInvoiceLineModal] = useState(false);

  const invoiceLinesPath = 'invoice/invoice-lines';
  const invoicesPath = 'invoice/invoices';

  const queryClient = useQueryClient();
  const canCreate = ['Paid', 'Approved', 'Cancelled'].every((value) => {
    return value !== values?.selectedInvoice?.status;
  });

  const handleInvoiceLineChange = (invoiceLine) => {
    change('invoiceLine', invoiceLine);
    if (invoiceLine?.total) {
      change(
        'selectedInvoice.total',
        values?.selectedInvoice?.total + invoiceLine?.total
      );
    }
    setShowInvoiceLineModal(false);
    setLineGenerated(true);
    queryClient.invalidateQueries(typedownQueryKey(invoiceLinesPath));
    queryClient.invalidateQueries(typedownQueryKey(invoicesPath));
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
          disabled={!canCreate || lineGenerated}
          marginBottom0
          onClick={() => setShowInvoiceLineModal(true)}
        >
          <FormattedMessage id="ui-oa.charge.invoiceLine.newInvoiceLine" />
        </Button>
      </Layout>
    );
  };

  const renderListItem = (invoiceLine, input) => {
    return (
      <>
        {highlightString(input, invoiceLine?.invoiceLineNumber)}
        {', '}
        {invoiceLine?.description?.length > 50
          ? invoiceLine?.description.substr(0, 49) + '...'
          : invoiceLine?.description}
        {invoiceLine?.total && ', ' + invoiceLine.total}
        {invoiceLine?.invoiceLineStatus && ', ' + invoiceLine.invoiceLineStatus}
      </>
    );
  };

  const renderEndOFList = () => {
    return (
      <Layout className={css.endOfList}>
        <FormattedMessage id="ui-oa.party.noResultsFound" />
      </Layout>
    );
  };

  return (
    <>
      <div key={values?.selectedInvoice?.id}>
        <Field
          component={QueryTypedown}
          dataFormatter={(data) => data?.invoiceLines}
          endOfList={renderEndOFList()}
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
      </div>
      {!canCreate && !values?.invoiceLine && (
        <MessageBanner type="warning">
          <FormattedMessage id="ui-oa.charge.invoiceLine.noNewInvoiceLine" />
        </MessageBanner>
      )}
      {values?.invoiceLine && (
        <Card
          cardStyle="positive"
          headerEnd={
            <Tooltip
              id="invoice-line-trash-button-tooltip"
              text={
                <FormattedMessage id="ui-oa.charge.invoiceLine.removeInvoiceLine" />
              }
            >
              {({ ref, ariaIds }) => (
                <IconButton
                  ref={ref}
                  aria-describedby={ariaIds.sub}
                  aria-labelledby={ariaIds.text}
                  icon="trash"
                  onClick={() => handleInvoiceLineChange()}
                />
              )}
            </Tooltip>
          }
          headerStart={
            <AppIcon app="invoice" size="small">
              <strong>{values?.invoiceLine?.invoiceLineNumber}</strong>
            </AppIcon>
          }
          roundedBorder
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
