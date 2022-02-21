import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Field } from 'react-final-form';

import {
  Col,
  Datepicker,
  KeyValue,
  Row,
  Select,
  Label,
} from '@folio/stripes/components';

import { Typedown } from '@k-int/stripes-kint-components';

const propTypes = {
  charge: PropTypes.object,
};

const InvoiceTypedownForm = ({ charge }) => {
  return (
    <>
      <Label>
        <FormattedMessage id="ui-oa.charge.invoice.addInvoice" />
      </Label>
      <Field component={Typedown} name="invoice" />
    </>
  );
};

InvoiceTypedownForm.propTypes = propTypes;

export default InvoiceTypedownForm;
