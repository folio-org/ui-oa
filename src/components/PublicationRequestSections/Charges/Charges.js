import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

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
  const renderBadge = (charges) => {
    return charges ? <Badge>{charges?.length}</Badge> : <Badge>0</Badge>;
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
    amount: (e) => {
      return e?.amount?.value;
    },
    coefficient: (e) => {
      return e?.exchangeRate?.coefficient;
    },

    currency: (e) => {
      return e?.exchangeRate?.fromCurrency;
    },
    exchangeRate: (e) => {
      return e?.exchangeRate?.toCurrency;
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
              discount: <FormattedMessage id="ui-oa.charge.discount" />,
              currency: <FormattedMessage id="ui-oa.charge.currency" />,
              exchangeRate: <FormattedMessage id="ui-oa.charge.exchangeRate" />,
              coefficient: <FormattedMessage id="ui-oa.charge.coefficient" />,
            }}
            contentData={request?.charges}
            formatter={formatter}
            visibleColumns={[
              'description',
              'amount',
              'discount',
              'currency',
              'exchangeRate',
              'coefficient',
            ]}
          />
        </Col>
      </Row>
    </Accordion>
  );
};

Charges.propTypes = propTypes;

export default Charges;
