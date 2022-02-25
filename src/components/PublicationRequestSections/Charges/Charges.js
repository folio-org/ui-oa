import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { IfPermission } from '@folio/stripes/core';
import {
  Accordion,
  Badge,
  Button,
  MultiColumnList,
  Row,
  Col,
} from '@folio/stripes/components';

import urls from '../../../util/urls';

const propTypes = {
  request: PropTypes.object,
};

const Charges = ({ request }) => {
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
      return charge?.localAmount?.value - charge?.discount;
    }
    if (charge?.discountType?.value === 'percentage') {
      return (
        charge?.localAmount?.value -
        (charge?.localAmount?.value * charge?.discount) / 100
      );
    }
    return charge?.localAmount?.value;
  };

  const renderAddChargesButton = () => {
    return (
      <>
        <IfPermission perm="oa.publicationRequest.edit">
          <Button
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
                values={{ localCurrency: e?.exchangeRate?.fromCurrency }}
              />
              :{' '}
            </strong>
            {calculatePrice(e)}
          </div>
          <div>
            <strong>
              <FormattedMessage
                id="ui-oa.charge.estimatedPriceSpecified"
                values={{ specifiedCurrency: e?.exchangeRate?.toCurrency }}
              />
              :{' '}
            </strong>
            {calculatePrice(e) * e?.exchangeRate?.coefficient}
          </div>
        </div>
      );
    },
    amount: (e) => {
      return e?.amount?.value;
    },
    currency: (e) => {
      return e?.exchangeRate?.fromCurrency;
    },
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.charges)}
      displayWhenOpen={renderAddChargesButton()}
      label={<FormattedMessage id="ui-oa.publicationRequest.charges" />}
    >
      <Row>
        <Col xs={12}>
          <MultiColumnList
            columnMapping={{
              description: <FormattedMessage id="ui-oa.charge.description" />,
              amount: <FormattedMessage id="ui-oa.charge.amount" />,
              currency: <FormattedMessage id="ui-oa.charge.currency" />,
              discount: <FormattedMessage id="ui-oa.charge.discount" />,
              tax: <FormattedMessage id="ui-oa.charge.tax" />,
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
    </Accordion>
  );
};

Charges.propTypes = propTypes;

export default Charges;
