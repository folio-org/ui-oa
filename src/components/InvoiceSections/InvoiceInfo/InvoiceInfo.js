import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { useOkapiKy } from '@folio/stripes/core';
import { Col, KeyValue, Row, FormattedUTCDate } from '@folio/stripes/components';
import { useBatchGroup, useVendorOrg } from '../../../hooks/invoiceHooks';

const propTypes = {
  invoice: PropTypes.object,
};

const InvoiceInfo = ({ invoice }) => {
  console.log(invoice);
  const batchGroup = useBatchGroup(invoice?.batchGroupId);
  const vendorOrg = useVendorOrg(invoice?.vendorId);
  console.log(vendorOrg);

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
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.charge.invoice.vendorOrganisation" />
            }
            value={vendorOrg?.name}
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
            value={batchGroup?.name}
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
