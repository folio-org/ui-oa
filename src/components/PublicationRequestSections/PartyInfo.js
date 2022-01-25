import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Card,
  Col,
  KeyValue,
  Label,
  Row,
} from '@folio/stripes/components';

import ExternalLink from '../ExternalLink';

const propTypes = {
  otherEmailAddresses: PropTypes.object,
  party: PropTypes.object,
  streetAddresses: PropTypes.object,
};

const renderStreetAddresses = (streetAddresses) => {
  return (
    <>
      {streetAddresses.map((address, index) => (
        <Row>
          <Card
            headerStart={
              <Label>
                <FormattedMessage
                  id="ui-oa.streetAddresses.streetAddressTitle"
                  values={{ number: index }}
                />
              </Label>
            }
          >
            <Row start="xs">
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.addressType" />
                  }
                  value={address?.addressType}
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.addressLine1" />
                  }
                  value={address?.addressLine1}
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.addressLine1" />
                  }
                  value={address?.addressLine2}
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={<FormattedMessage id="ui-oa.streetAddresses.city" />}
                  value={address?.city}
                />
              </Col>
            </Row>

            <Row start="xs">
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.stateRegion" />
                  }
                  value={address?.stateRegion}
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.postalCode" />
                  }
                  value={address?.postalCode}
                />
              </Col>
              <Col xs={3}>
                <KeyValue
                  label={
                    <FormattedMessage id="ui-oa.streetAddresses.country" />
                  }
                  value={address?.country}
                />
              </Col>
              <Col xs={3} />
            </Row>
          </Card>
        </Row>
      ))}
    </>
  );
};

const PartyInfo = ({ party, streetAddresses, otherEmailAddresses }) => {
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

      {otherEmailAddresses && (
        <Row start="xs">
          <Col xs={6}>
            <KeyValue
              label={
                <FormattedMessage id="ui-oa.otherEmail.otherEmailAddresses" />
              }
            >
              {otherEmailAddresses ? (
                <ul>
                  {otherEmailAddresses.map((email) => (
                    <li key={email?.id}>{email?.emailAddress}</li>
                  ))}
                </ul>
              ) : null}
            </KeyValue>
          </Col>
        </Row>
      )}

      {streetAddresses && (
        <Row>
          <Col xs={12}>
            <Label>
              <FormattedMessage id="ui-oa.publicationRequest.streetAddresses" />
            </Label>
            {streetAddresses ? renderStreetAddresses(streetAddresses) : null}
          </Col>
        </Row>
      )}
    </>
  );
};

PartyInfo.propTypes = propTypes;

export default PartyInfo;
