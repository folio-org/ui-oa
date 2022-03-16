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
  Layout,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import { Registry } from '@folio/handler-stripes-registry';
import { CustomPropertiesList } from '@folio/stripes-erm-components';

import css from './Agreement.css';

const propTypes = {
  request: PropTypes.object,
};

const Agreement = ({ request }) => {
  const resourceReg = Registry?.getResource('agreement');
  const agreementLinkFunction = resourceReg?.getViewResource();

  const customProperties =
    request?.agreement?.remoteId_object?.customProperties;

  const renderBadge = (agreement) => {
    return agreement ? <Badge>1</Badge> : <Badge>0</Badge>;
  };

  const renderAgreementLink = () => {
    return agreementLinkFunction ? (
      <Link to={agreementLinkFunction(request?.agreement?.remoteId_object)}>
        <strong>{request?.agreement?.remoteId_object?.name}</strong>
      </Link>
    ) : (
      <strong>{request?.agreement?.remoteId_object?.name}</strong>
    );
  };

  const renderEmpty = () => {
    return (
      <Layout className={css.agreementEmptyMessage}>
        <FormattedMessage id="ui-oa.publicationRequest.agreementNotLinked" />
      </Layout>
    );
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

  const renderCustomProperties = () => {
    const openAccessProperties = Object.values(customProperties)
      .filter((cp) => cp[0]?.type?.ctx === 'OpenAccess')
      .map((cp) => cp[0]?.type);

    return (
      <CustomPropertiesList
        customProperties={openAccessProperties}
        resource={request?.agreement?.remoteId_object}
      />
    );
  };

  return (
    <Accordion
      closedByDefault
      displayWhenClosed={renderBadge(request?.agreement)}
      displayWhenOpen={renderBadge(request?.agreement)}
      label={<FormattedMessage id="ui-oa.publicationRequest.agreement" />}
    >
      {request?.agreement ? (
        <>
          <Card
            cardStyle="positive"
            headerStart={
              <AppIcon app="agreements" size="small">
                {renderAgreementLink()}
              </AppIcon>
            }
          >
            {renderAgreement(request?.agreement?.remoteId_object)}
          </Card>
          {customProperties && renderCustomProperties()}
        </>
      ) : (
        renderEmpty()
      )}
    </Accordion>
  );
};

Agreement.propTypes = propTypes;

export default Agreement;
