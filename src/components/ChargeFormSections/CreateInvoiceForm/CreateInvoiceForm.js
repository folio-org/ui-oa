import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Row,
  Col,
  TextField,
  Select,
  TextArea,
  Datepicker,
} from '@folio/stripes/components';
import {
  requiredValidator,
} from '@folio/stripes-erm-components';

const CreateInvoiceForm = () => {
  const intl = useIntl();

  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.invoice.invoiceNumber" />}
            name="invoice.number"
            required
          />
        </Col>
        <Col xs={3}>
          <Field
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            label={<FormattedMessage id="ui-oa.charge.invoice.invoiceDate" />}
            name="invoice.date"
            timeZone="UTC"
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
            name="invoice.vendorOrganisation"
            required
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.invoice.paymentMethod" />}
            name="invoice.paymentMethod"
            required
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.invoice.batchGroup" />}
            name="invoice.batchGroup"
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
            name="invoice.currency"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.charge.exchangeRate" />}
            name="invoice.exchangeRate"
            type="number"
          />
        </Col>
      </Row>
    </>
  );
};
export default CreateInvoiceForm;
