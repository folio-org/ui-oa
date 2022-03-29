import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Col, KeyValue, Row } from '@folio/stripes/components';

const propTypes = {
  invoiceLine: PropTypes.object,
};

const InvoiceLineInfo = ({ invoiceLine }) => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.charge.invoiceLine.description" />
            }
            value={invoiceLine?.description}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoiceLine.status" />}
            value={invoiceLine?.invoiceLineStatus}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoiceLine.quantity" />}
            value={invoiceLine?.quantity}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoiceLine.total" />}
            value={invoiceLine?.total}
          />
        </Col>
      </Row>
    </>
  );
};

InvoiceLineInfo.propTypes = propTypes;

export default InvoiceLineInfo;
