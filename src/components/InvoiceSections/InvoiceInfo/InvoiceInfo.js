import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import {
  Col,
  KeyValue,
  Row,
  FormattedUTCDate,
  Loading,
} from '@folio/stripes/components';
import { ExchangeRateValue } from '@folio/stripes-acq-components';
import { useBatchGroup, useVendorOrg } from '../../../hooks/invoiceHooks';

const propTypes = {
  invoice: PropTypes.object,
  charge: PropTypes.object,
};

const InvoiceInfo = ({ invoice, charge }) => {
  const BatchGroupValue = () => {
    const { batchGroup, isFetching } = useBatchGroup(invoice?.batchGroupId);
    return (
      <KeyValue
        label={<FormattedMessage id="ui-oa.charge.invoice.batchGroup" />}
        value={isFetching ? <Loading /> : batchGroup?.name}
      />
    );
  };
  const VendorOrgValue = () => {
    const { vendorOrg, isFetching } = useVendorOrg(invoice?.vendorId);
    return (
      <KeyValue
        label={
          <FormattedMessage id="ui-oa.charge.invoice.vendorOrganisation" />
        }
        value={isFetching ? <Loading /> : vendorOrg?.name}
      />
    );
  };
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
          <VendorOrgValue />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.invoice.status" />}
            value={invoice?.status}
          />
        </Col>
        <Col xs={3}>
          <BatchGroupValue />
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
            label={<FormattedMessage id="ui-oa.charge.currency" />}
            value={invoice?.currency}
          />
        </Col>
        <Col xs={3}>
          <ExchangeRateValue
            exchangeFrom={invoice?.currency}
            exchangeTo={charge?.exchangeRate?.toCurrency}
            label={<FormattedMessage id="ui-oa.charge.currency" />}
            manualExchangeRate={invoice?.exchangeRate}
          />
        </Col>
        <KeyValue
          label={<FormattedMessage id="ui-oa.charge.invoice.total" />}
          value={invoice?.total}
        />
      </Row>
    </>
  );
};

InvoiceInfo.propTypes = propTypes;

export default InvoiceInfo;
