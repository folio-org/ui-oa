import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import {
  Col,
  KeyValue,
  Row,
  FormattedUTCDate,
} from '@folio/stripes/components';
import { ExchangeRateValue } from '@folio/stripes-acq-components';
import { BatchGroupValue, VendorOrgValue } from './InvoiceElementValues';

const propTypes = {
  invoice: PropTypes.object,
  charge: PropTypes.object,
};

const InvoiceInfo = ({ invoice, charge }) => {
  return (
    <>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoice.invoiceDate" />}
            value={<FormattedUTCDate value={invoice?.invoiceDate} />}
          />
        </Col>
        <Col xs={3}>
          <VendorOrgValue invoice={invoice} />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoice.status" />}
            value={invoice?.status}
          />
        </Col>
        <Col xs={3}>
          <BatchGroupValue invoice={invoice} />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoice.paymentMethod" />}
            value={invoice?.paymentMethod}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoice.currency" />}
            value={invoice?.currency}
          />
        </Col>
        <Col xs={3}>
          <ExchangeRateValue
            exchangeFrom={invoice?.currency}
            exchangeTo={charge?.exchangeRate?.toCurrency}
            labelId="ui-oa.charge.exchangeRate"
            manualExchangeRate={invoice?.exchangeRate}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoice.total" />}
            value={invoice?.total}
          />
        </Col>
      </Row>
    </>
  );
};

InvoiceInfo.propTypes = propTypes;

export default InvoiceInfo;
