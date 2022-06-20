/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';

import { MessageBanner, Row, Col, KeyValue } from '@folio/stripes/components';
import {
  FormattedMessage,
  FormattedNumber,
  FormattedDisplayName,
} from 'react-intl';

const propTypes = {
  charge: PropTypes.object,
};

const InvoiceHelper = ({ charge }) => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <MessageBanner>
            <FormattedMessage id="ui-oa.charge.invoice.invoiceHelperMessage" />
          </MessageBanner>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.calculatedAmount" />}
            value={
              <FormattedNumber
                currency={charge?.estimatedInvoicePrice?.baseCurrency}
                style="currency"
                value={charge?.estimatedInvoicePrice?.value}
              />
            }
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.currency" />}
            value={
              <FormattedDisplayName
                type="currency"
                value={charge?.amount?.baseCurrency}
              />
            }
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.category" />}
            value={charge?.category?.label}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.exchangeRateApplied" />}
            value={charge?.exchangeRate?.coefficient}
          />
        </Col>
      </Row>
    </>
  );
};

InvoiceHelper.propTypes = propTypes;

export default InvoiceHelper;
