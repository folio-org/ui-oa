import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { AppIcon } from '@folio/stripes/core';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Pane,
  Row,
  Col,
  KeyValue,
  Button,
  Icon,
} from '@folio/stripes/components';
import urls from '../../../util/urls';

const propTypes = {
  resource: PropTypes.object,
};

const ChargeView = ({ resource: request }) => {
  const location = useLocation();
  const history = useHistory();

  const chargeId = location.pathname.split('/').pop();
  const charge = request?.charges?.find((e) => e?.id === chargeId);

  const handleClose = () => {
    history.push(`/oa/publicationRequests/${request.id}`);
  };

  const handleLink = () => {
    history.push(`${urls.publicationRequestChargeLinkInvoice(request.id, chargeId)}`);
  };

  const getActionMenu = () => {
    return (
      <>
        <Button
          buttonStyle="dropdownItem"
          id="link-invoice-button"
          onClick={handleLink}
        >
          <Icon icon="link">
            <FormattedMessage id="ui-oa.charge.invoice.linkInvoice" />
          </Icon>
        </Button>
      </>
    );
  };

  return (
    <Pane
      actionMenu={getActionMenu}
      appIcon={<AppIcon app="oa" iconKey="app" size="small" />}
      defaultWidth="55%"
      dismissible
      onClose={handleClose}
      paneTitle={<FormattedMessage id="ui-oa.charge.title" />}
    >
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.amount" />}
            value={charge?.amount?.value + ' ' + charge?.amount?.baseCurrency}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.discount" />}
            value={charge?.discount + ' ' + charge?.amount?.baseCurrency}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.exchangeRate" />}
            value={charge?.exchangeRate?.toCurrency}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.charge.coefficient" />}
            value={charge?.exchangeRate?.coefficient}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
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
