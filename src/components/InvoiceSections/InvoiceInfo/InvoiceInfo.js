import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { Col, KeyValue, Row, FormattedUTCDate } from '@folio/stripes/components';

const propTypes = {
  invoice: PropTypes.object,
};

const InvoiceInfo = ({ invoice }) => {
  const ky = useOkapiKy();

  const { data: batchGroup } = useQuery(
    ['ui-oa', 'InvoiceInfo', 'batchGroup'],
    () => ky(`batch-groups/${invoice?.batchGroupId}`).json()
  );

  const { data: vendorOrg } = useQuery(
    ['ui-oa', 'InvoiceInfo', 'vendorOrg'],
    () => ky(`organizations/organizations/${invoice.vendorId}`).json()
  );

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
