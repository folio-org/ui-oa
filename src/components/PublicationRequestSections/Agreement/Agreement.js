import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Link } from 'react-router-dom';

import {
  Accordion,
  Badge,
  Card,
  Row,
  Col,
  KeyValue,
  NoValue,
  FormattedUTCDate,
} from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';

import urls from '../../../util/urls';

const propTypes = {
  request: PropTypes.object,
};

const Agreement = ({ request }) => {
  const renderBadge = (agreement) => {
    return agreement ? <Badge>1</Badge> : <Badge>0</Badge>;
  };

  const renderAgreement = (agreement) => {
    return (
      <>
        <Row>
          <Col md={4} xs={6}>
            <KeyValue
              label={
                <FormattedMessage id="ui-oa.publicationRequest.agreementStartDate" />
              }
              value={
                agreement?.startDate ? (
                  <FormattedUTCDate value={agreement.startDate} />
                ) : (
                  <NoValue />
                )
              }
            />
          </Col>
          <Col md={4} xs={6}>
            <KeyValue
              label={
                <FormattedMessage id="ui-oa.publicationRequest.agreementEndDate" />
              }
              value={
                agreement?.endDate ? (
                  <FormattedUTCDate value={agreement.endDate} />
                ) : (
                  <NoValue />
                )
              }
            />
          </Col>
          <Col md={4} xs={12}>
            <KeyValue
              label={
                <FormattedMessage id="ui-oa.publicationRequest.agreementStatus" />
              }
              value={agreement?.agreementStatus?.label ?? <NoValue />}
            />
          </Col>
        </Row>
      </>
    );
  };
  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.agreement)}
      displayWhenOpen={renderBadge(request?.agreement)}
      label={<FormattedMessage id="ui-oa.publicationRequest.agreement" />}
    >
      <Card
        cardStyle="positive"
        headerStart={
          <AppIcon app="agreements" size="small">
            <Link to={urls.agreementView(request?.agreement?.remoteId)}>
              <strong>
                {request?.agreement?.remoteId_object?.name}
              </strong>
            </Link>
          </AppIcon>
        }
      >
        {renderAgreement(request?.agreement?.remoteId_object)}
      </Card>
    </Accordion>
  );
};

Agreement.propTypes = propTypes;

export default Agreement;
