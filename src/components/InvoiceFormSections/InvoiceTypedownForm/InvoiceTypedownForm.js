import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Field } from 'react-final-form';

import { Button, Layout, Label } from '@folio/stripes/components';
import { Typedown } from '@k-int/stripes-kint-components';
import { InvoiceModal } from '../../Modals';

const propTypes = {
  charge: PropTypes.object,
};

const InvoiceTypedownForm = ({ charge }) => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

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
        setShowModal={setShowInvoiceModal}
        showModal={showInvoiceModal}
      />
    </>
  );
};

InvoiceTypedownForm.propTypes = propTypes;

export default InvoiceTypedownForm;
