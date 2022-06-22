/* eslint-disable react/style-prop-object */
import PropTypes from 'prop-types';

import {
  FormattedMessage,
  FormattedNumber,
  FormattedDisplayName,
} from 'react-intl';
import { Col, KeyValue, Row } from '@folio/stripes/components';

const propTypes = {
  charge: PropTypes.object,
};

const ChargeInfo = ({ charge }) => {
  return (
    <>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.category" />}
            value={charge?.category?.label}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.status" />}
            value={charge?.chargeStatus?.label}
          />
        </Col>
        <Col xs={6}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.chargeDescription" />}
            value={charge?.description}
          />
        </Col>
      </Row>
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
            label={<FormattedMessage id="ui-oa.charge.exchangeRateApplied" />}
            value={charge?.exchangeRate?.coefficient}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.tax" />}
            value={charge?.tax + '%'}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.discount" />}
            value={
              charge?.discountType?.value === 'percentage'
                ? charge?.discount + '%'
                : charge?.discount
            }
          />
        </Col>
        <Col xs={9}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.discountNote" />}
            value={charge?.discountNote}
          />
        </Col>
      </Row>
    </>
  );
};

ChargeInfo.propTypes = propTypes;

export default ChargeInfo;
