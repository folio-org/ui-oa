import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Field, useForm, useFormState } from 'react-final-form';

import { Button, Layout, Label } from '@folio/stripes/components';
import { Typedown } from '@k-int/stripes-kint-components';
import { InvoiceModal } from '../../Modals';

const propTypes = {
  charge: PropTypes.object,
};

const InvoiceTypedownForm = ({ charge }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleInvoiceChange = (invoice) => {
    change('invoice', invoice);
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
  return (
    <>
      <>
        <Label>
          <FormattedMessage id="ui-oa.charge.invoice.addInvoice" />
        </Label>
        <Field
          component={Typedown}
          name="invoice"
          renderFooter={renderFooter}
        />
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
