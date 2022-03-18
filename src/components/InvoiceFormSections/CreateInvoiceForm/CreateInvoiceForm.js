import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, useForm, useFormState } from 'react-final-form';
import {
  Row,
  Col,
  TextField,
  Datepicker,
  RadioButton,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import {
  FieldCurrency,
  FieldSelectFinal,
  FieldSelectionFinal,
  FieldOrganization,
  PAYMENT_METHOD_OPTIONS,
} from '@folio/stripes-acq-components';

import getBatchGroupsOptions from '../../../util/invoiceUtils';

const propTypes = {
  batchGroups: PropTypes.object,
  charge: PropTypes.object,
};

const CreateInvoiceForm = ({ batchGroups, charge }) => {
  const { values } = useFormState();
  const { change } = useForm();

  const handleVendorChange = (vendor) => {
    change('paymentMethod', vendor.paymentMethod);
  };

  const handleCurrencyChange = (currency) => {
    change('currency', currency);
  };

  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.invoice.invoiceNumber" />}
            name="vendorInvoiceNo"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            label={<FormattedMessage id="ui-oa.charge.invoice.invoiceDate" />}
            name="invoiceDate"
            required
            timeZone="UTC"
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <FieldOrganization
            change={change}
            labelId="ui-oa.charge.invoice.vendorOrganisation"
            name="vendorId"
            onSelect={handleVendorChange}
            required
          />
          {/* Change to registry when it becomes available */}
        </Col>
        <Col xs={3}>
          <FieldSelectFinal
            dataOptions={PAYMENT_METHOD_OPTIONS}
            label={<FormattedMessage id="ui-oa.charge.invoice.paymentMethod" />}
            name="paymentMethod"
            required
          />
        </Col>
        <Col xs={3}>
          <FieldSelectionFinal
            dataOptions={getBatchGroupsOptions(batchGroups)}
            labelId="ui-oa.charge.invoice.batchGroup"
            name="batchGroupId"
            required
          />
        </Col>
      </Row>
      <Row middle="xs">
        {/* Both rows below should be poulated from selected charge */}
        <Col xs={3}>
          <FieldCurrency
            id="invoice-currency"
            labelId="ui-oa.charge.currency"
            name="currency"
            onChange={handleCurrencyChange}
            required
          />
        </Col>
        <Col xs={4}>
          <RadioButton
            checked={!values.exchangeRate}
            label="Use current exchange rate"
            onChange={() => change('exchangeRate', null)}
          />
        </Col>
        <Col xs={4}>
          <RadioButton
            checked={values.exchangeRate !== null}
            label="Use charge exchange rate"
            onChange={() => change('exchangeRate', charge?.exchangeRate?.coefficient)}
          />
        </Col>
      </Row>
    </>
  );
};

CreateInvoiceForm.propTypes = propTypes;

export default CreateInvoiceForm;
