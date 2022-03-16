import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Col, KeyValue, Row } from '@folio/stripes/components';

const propTypes = {
  invoice: PropTypes.object,
};

const InvoiceInfo = ({ invoice }) => {
  return (
    <>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoice.invoiceDate" />}
            value={invoice?.date}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoice.vendorOrganisation" />}
            value={invoice?.vendorOrganisation}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoice.paymentMethod" />}
            value={invoice?.paymentMethod}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoice.batchGroup" />}
            value={invoice?.batchGroup}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.currency" />}
            value={invoice?.currency}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.exchangeRate" />}
            value={invoice?.exchangeRate}
          />
        </Col>
      </Row>
    </>
  );
};

InvoiceInfo.propTypes = propTypes;

export default InvoiceInfo;
