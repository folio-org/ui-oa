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
  const chargeDiscountAmount = calculateDiscountAmount(
    charge,
    charge?.amount?.value
  );
  const localDiscountAmount = calculateDiscountAmount(
    charge,
    charge?.amount?.value * charge?.exchangeRate?.coefficient,
    charge?.exchangeRate?.coefficient
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
          {(charge?.amount?.value * charge?.exchangeRate?.coefficient)?.toFixed(2)}
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
          {localDiscountAmount?.toFixed(2)}
        </>
      ),
    },
    {
      description: <FormattedMessage id="ui-oa.charge.tax" />,
      chargeAmount: (
        <>
          {charge?.amount?.baseCurrency}
          {calculateTaxAmount(charge?.tax, charge?.amount?.value - chargeDiscountAmount)?.toFixed(2)}
        </>
      ),
      localAmount: (
        <>
          {charge?.exchangeRate?.toCurrency}
          {calculateTaxAmount(charge?.tax, charge?.amount?.value * charge?.exchangeRate?.coefficient - localDiscountAmount)?.toFixed(2)}
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
  );
};

ChargeBreakdown.propTypes = propTypes;

export default ChargeBreakdown;
