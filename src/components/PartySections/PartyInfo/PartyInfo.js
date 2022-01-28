import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import { Col, KeyValue, Row } from '@folio/stripes/components';

import ExternalLink from '../../ExternalLink';

const propTypes = {
  party: PropTypes.object,
};

const PartyInfo = ({ party }) => {
  return (
    <>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.party.title" />}
            value={party?.title}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.party.familyName" />}
            value={party?.familyName}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.party.givenNames" />}
            value={party?.givenNames}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.party.orcidId" />}
            value={
              party?.orcidId ? (
                <ExternalLink
                  content={party.orcidId}
                  href={'https://orcid.org/' + party.orcidId}
                />
              ) : null
            }
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.party.mainEmailAddress" />}
            value={
              party?.mainEmail ? (
                <ExternalLink
                  content={party.mainEmail}
                  href={'mailto:' + party.mainEmail}
                />
              ) : null
            }
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.party.phone" />}
            value={party?.phone}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.party.mobilePhone" />}
            value={party?.mobile}
          />
        </Col>
      </Row>
    </>
  );
};

PartyInfo.propTypes = propTypes;

export default PartyInfo;
