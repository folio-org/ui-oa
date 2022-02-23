import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';
import { useHistory, useLocation } from 'react-router-dom';
import { Pane, Row, Col, KeyValue, Headline } from '@folio/stripes/components';

import useOARefdata from '../../../util/useOARefdata';

const propTypes = {
  resource: PropTypes.object,
};

const [CHARGE_CATEGORY, CHARGE_STATUS, CHARGE_PAYER] = [
  'Charge.Category',
  'Charge.ChargeStatus',
  'Charge.Payer',
];

const ChargeView = ({ resource: request }) => {
  const location = useLocation();
  const history = useHistory();

  const chargeId = location.pathname.split('/').pop();
  const charge = request?.charges?.find((e) => e?.id === chargeId);

  const findRefdataLabel = (refdata, id) => {
    const refdataValue = refdata?.find((rdc) => rdc.id === id);
    return refdataValue?.label;
  };

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${request.id}`);
  };

  return (
    <Pane
      appIcon={<AppIcon app="oa" iconKey="app" size="small" />}
      defaultWidth="55%"
      dismissible
      onClose={handleClose}
      paneTitle={
        <FormattedMessage id="ui-oa.charge.publicationRequestCharge" />
      }
    >
      <Headline margin="large" size="x-large" tag="h2">
        <FormattedMessage id="ui-oa.charge.chargeInformation" />
      </Headline>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.publicationRequest" />}
            value={
              request?.publicationTitle
                ? request?.requestNumber + ' : ' + request?.publicationTitle
                : request.requestNumber
            }
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.category" />}
            value={findRefdataLabel(
              useOARefdata(CHARGE_CATEGORY),
              charge?.category?.id
            )}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.status" />}
            value={findRefdataLabel(
              useOARefdata(CHARGE_STATUS),
              charge?.chargeStatus?.id
            )}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.payer" />}
            value={findRefdataLabel(
              useOARefdata(CHARGE_PAYER),
              charge?.payer?.id
            )}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.payerNote" />}
            value={charge?.payerNote}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.amount" />}
            value={charge?.amount?.value}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.currency" />}
            value={charge?.amount?.baseCurrency}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.exchangeRate" />}
            value={charge?.exchangeRate?.coefficient}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.discount" />}
            value={charge?.discount}
          />
        </Col>
        <Col xs={9}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.discountNote" />}
            value={charge?.discountNote}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.tax" />}
            value={charge?.tax}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.description" />}
            value={charge?.description}
          />
        </Col>
      </Row>
    </Pane>
  );
};

ChargeView.propTypes = propTypes;

export default ChargeView;
