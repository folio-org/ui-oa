import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Field, useForm } from 'react-final-form';
import {
  Row,
  Col,
  TextField,
  Select,
  Datepicker,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import {
  FieldSelectFinal,
  FieldSelectionFinal,
  FieldOrganization,
  PAYMENT_METHOD_OPTIONS,
} from '@folio/stripes-acq-components';

import getBatchGroupsOptions from '../../../util/invoiceUtils';

const propTypes = {
  batchGroups: PropTypes.object,
};

const CreateInvoiceForm = ({ batchGroups }) => {
  const [selectedVendor, setSelectedVendor] = useState();
  const intl = useIntl();
  const { change } = useForm();

  const selectVendor = (vendor) => {
    if (selectedVendor?.id !== vendor.id) {
      setSelectedVendor(vendor);
    }
    change('paymentMethod', vendor.paymentMethod);
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
            onSelect={selectVendor}
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
      <Row>
        {/* Both rows below should be poulated from selected charge */}
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              {
                value: 'USD',
                label: intl.formatMessage({
                  id: 'ui-oa.charge.currency.usd',
                }),
              },
            ]}
            id="invoice-currency"
            label={<FormattedMessage id="ui-oa.charge.currency" />}
            name="currency"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            id="invoice-exchangeRate"
            label={<FormattedMessage id="ui-oa.charge.exchangeRate" />}
            name="exchangeRate"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
    </>
  );
};

CreateInvoiceForm.propTypes = propTypes;

export default CreateInvoiceForm;
