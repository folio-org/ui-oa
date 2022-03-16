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
import { Pluggable } from '@folio/stripes/core';

const CreateInvoiceForm = () => {
  const intl = useIntl();
  const { change } = useForm();

  const handleOrganizationSelected = (org) => {
    change('vendorOrganisation', org.name);
    change('paymentMethod', org.paymentMethod);
  };

  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.invoice.invoiceNumber" />}
            name="number"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            label={<FormattedMessage id="ui-oa.charge.invoice.invoiceDate" />}
            name="date"
            required
            timeZone="UTC"
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        {/* Org and Batch group should be select fields, see agreements */}
        <Col xs={3}>
          <Field
            component={TextField}
            label={
              <FormattedMessage id="ui-oa.charge.invoice.vendorOrganisation" />
            }
            name="vendorOrganisation"
            required
            validate={requiredValidator}
          />
          <Pluggable
            aria-haspopup="true"
            dataKey="organization"
            id="plugin"
            searchButtonStyle="link"
            searchLabel={
              <FormattedMessage id="stripes-acq-components.filter.organization.lookup" />
            }
            selectVendor={handleOrganizationSelected}
            type="find-organization"
          >
            <FormattedMessage id="stripes-acq-components.filter.organization.lookupNoSupport" />
          </Pluggable>
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.invoice.paymentMethod" />}
            name="paymentMethod"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.invoice.batchGroup" />}
            name="batchGroup"
            required
            validate={requiredValidator}
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
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              {
                value: 'GBP',
                label: intl.formatMessage({
                  id: 'ui-oa.charge.currency.gbp',
                }),
              },
            ]}
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
export default CreateInvoiceForm;
