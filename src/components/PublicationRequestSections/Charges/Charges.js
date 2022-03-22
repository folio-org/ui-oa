import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { IfPermission, useStripes } from '@folio/stripes/core';
import {
  Accordion,
  Badge,
  Button,
  MultiColumnList,
  Row,
  Col,
  MessageBanner,
  Layout,
} from '@folio/stripes/components';

import urls from '../../../util/urls';

const propTypes = {
  request: PropTypes.object,
};

const Charges = ({ request }) => {
  const stripes = useStripes();
  const history = useHistory();

  const renderBadge = (charges) => {
    return charges ? <Badge>{charges?.length}</Badge> : <Badge>0</Badge>;
  };

  const handleRowClick = (e, charge) => {
    history.push(
      `${urls.publicationRequestChargeView(request?.id, charge?.id)}`
    );
  };

  const calculatePrice = (charge) => {
    if (charge?.discountType?.value === 'subtracted') {
      const withoutTax = charge?.amount?.value - charge?.discount;
      return withoutTax + (withoutTax * charge?.tax) / 100;
    }
    if (charge?.discountType?.value === 'percentage') {
      const withoutTax =
        charge?.amount?.value -
        (charge?.amount?.value * charge?.discount) / 100;
      return withoutTax + (withoutTax * charge?.tax) / 100;
    }
    return charge?.amount?.value;
  };

  const renderAddChargesButton = () => {
    return (
      <>
        <IfPermission perm="oa.publicationRequest.edit">
          <Button
            disabled={!stripes?.currency}
            id="add-charge-button"
            to={`${urls.publicationRequestChargeCreate(request?.id)}`}
          >
            <FormattedMessage id="ui-oa.publicationRequest.addCharge" />
          </Button>
        </IfPermission>
      </>
    );
  };

  const formatter = {
    description: (e) => {
      return (
        <div>
          <div>
            <strong>
              <FormattedMessage id="ui-oa.charge.status" />:{' '}
            </strong>
            {e?.chargeStatus?.label}
          </div>
          <div>
            <strong>
              <FormattedMessage id="ui-oa.charge.category" />:{' '}
            </strong>
            {e?.category?.label}
          </div>
          <div>
            <strong>
              <FormattedMessage id="ui-oa.charge.payer" />:{' '}
            </strong>
            {e?.payer?.label}
          </div>
          <div>
            <strong>
              <FormattedMessage id="ui-oa.charge.description" />:{' '}
            </strong>
            {e?.description}
          </div>
        </div>
      );
    },
    estimatedPrices: (e) => {
      return (
        <div>
          <div>
            <strong>
              <FormattedMessage
                id="ui-oa.charge.estimatedPriceLocal"
                values={{ localCurrency: e?.exchangeRate?.toCurrency }}
              />
              :{' '}
            </strong>
            {Math.round(calculatePrice(e) * 100) / 100}
          </div>
          <div>
            <strong>
              <FormattedMessage
                id="ui-oa.charge.estimatedPriceSpecified"
                values={{ specifiedCurrency: e?.exchangeRate?.fromCurrency }}
              />
              :{' '}
            </strong>
            {Math.round(
              calculatePrice(e) * e?.exchangeRate?.coefficient * 100
            ) / 100}
          </div>
        </div>
      );
    },
    amount: (e) => {
      return e?.amount?.value;
    },
    currency: (e) => {
      return e?.exchangeRate?.toCurrency;
    },
    discount: (e) => {
      return e?.discountType?.value === 'percentage'
        ? e?.discount + '%'
        : e?.discount;
    },
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.charges)}
      displayWhenOpen={renderAddChargesButton()}
      label={<FormattedMessage id="ui-oa.publicationRequest.charges" />}
    >
      {stripes?.currency ? (
        <Row>
          <Col xs={12}>
            <MultiColumnList
              columnMapping={{
                description: <FormattedMessage id="ui-oa.charge.description" />,
                amount: <FormattedMessage id="ui-oa.charge.amount" />,
                currency: <FormattedMessage id="ui-oa.charge.currency" />,
                discount: <FormattedMessage id="ui-oa.charge.discount" />,
                tax: <FormattedMessage id="ui-oa.charge.taxPercentage" />,
                estimatedPrices: (
                  <FormattedMessage id="ui-oa.charge.estimatedPrices" />
                ),
              }}
              contentData={request?.charges}
              formatter={formatter}
              onRowClick={handleRowClick}
              visibleColumns={[
                'description',
                'amount',
                'currency',
                'discount',
                'tax',
                'estimatedPrices',
              ]}
            />
          </Col>
        </Row>
      ) : (
        <Layout className="padding-all-gutter">
          <MessageBanner type="warning">
            <FormattedMessage id="ui-oa.publicationRequest.noCurrencySet" />
          </MessageBanner>
        </Layout>
      )}
    </Accordion>
  );
};

Charges.propTypes = propTypes;

export default Charges;
