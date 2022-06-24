import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, MultiColumnList } from '@folio/stripes/components';
import {
  calculateTaxAmount,
  calculateDiscountAmount,
} from '../../../util/chargeUtils';

const propTypes = {
  charge: PropTypes.object,
};

const ChargeBreakdown = ({ charge }) => {
  const exchangeRate = charge?.exchangeRate?.coefficient;
  const chargeDiscountAmount = calculateDiscountAmount(
    charge,
    charge?.amount?.value
  );
  const chargeTaxAmount = calculateTaxAmount(
    charge?.tax,
    charge?.amount?.value - chargeDiscountAmount
  );

  const breakdownArray = [
    {
      description: <FormattedMessage id="ui-oa.charge.netAmount" />,
      chargeAmount: (
        <>
          {charge?.amount?.baseCurrency}
          {charge?.amount?.value.toFixed(2)}
        </>
      ),
      localAmount: (
        <>
          {charge?.exchangeRate?.toCurrency}
          {(charge?.amount?.value * exchangeRate)?.toFixed(2)}
        </>
      ),
    },
    {
      description: <FormattedMessage id="ui-oa.charge.discount" />,
      chargeAmount: (
        <>
          {charge?.amount?.baseCurrency}
          {chargeDiscountAmount?.toFixed(2)}
        </>
      ),
      localAmount: (
        <>
          {charge?.exchangeRate?.toCurrency}
          {(chargeDiscountAmount * exchangeRate)?.toFixed(2)}
        </>
      ),
    },
    {
      description: <FormattedMessage id="ui-oa.charge.tax" />,
      chargeAmount: (
        <>
          {charge?.amount?.baseCurrency}
          {chargeTaxAmount?.toFixed(2)}
        </>
      ),
      localAmount: (
        <>
          {charge?.exchangeRate?.toCurrency}
          {(chargeTaxAmount * exchangeRate)?.toFixed(2)}
        </>
      ),
    },
    {
      description: (
        <strong>
          <FormattedMessage id="ui-oa.charge.calculatedAmount" />
        </strong>
      ),
      chargeAmount: (
        <strong>
          {charge?.amount?.baseCurrency}
          {charge?.estimatedInvoicePrice?.value?.toFixed(2)}
        </strong>
      ),
      localAmount: (
        <strong>
          {charge?.exchangeRate?.toCurrency}
          {charge?.estimatedPrice?.value?.toFixed(2)}
        </strong>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col xs={12}>
          <br />
          <strong>
            <FormattedMessage id="ui-oa.charge.chargeBreakdown" />
          </strong>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              description: <FormattedMessage id="ui-oa.charge.description" />,
              chargeAmount: (
                <FormattedMessage
                  id="ui-oa.charge.amountCurrency"
                  values={{ currency: charge?.amount?.baseCurrency }}
                />
              ),
              localAmount: (
                <FormattedMessage
                  id="ui-oa.charge.amountCurrency"
                  values={{ currency: charge?.exchangeRate?.toCurrency }}
                />
              ),
            }}
            contentData={breakdownArray}
            visibleColumns={['description', 'chargeAmount', 'localAmount']}
          />
        </Col>
      </Row>
    </>
  );
};

ChargeBreakdown.propTypes = propTypes;

export default ChargeBreakdown;
