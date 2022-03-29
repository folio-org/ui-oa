import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Card, Col, KeyValue, Label, Row } from '@folio/stripes/components';

import ExternalLink from '../../ExternalLink';
import urls from '../../../util/urls';

const propTypes = {
  party: PropTypes.object,
  streetAddresses: PropTypes.object,
  compact: PropTypes.bool,
};

const renderOrcidId = (orcidId) => {
  return (
    <Col xs={3}>
      <KeyValue
        label={<FormattedMessage id="ui-oa.party.orcidId" />}
        value={
          orcidId && (
            <ExternalLink
              content={orcidId}
              href={'https://orcid.org/' + orcidId}
              icon
            />
          )
        }
      />
    </Col>
  );
};

const renderOtherEmailAddresses = (otherEmailAddresses) => {
  return (
    <Col xs={6}>
      <KeyValue
        label={<FormattedMessage id="ui-oa.otherEmail.otherEmailAddresses" />}
        value={
          otherEmailAddresses && (
            <ul>
              {otherEmailAddresses.map((email) => (
                <li key={email?.id}>{email?.email}</li>
              ))}
            </ul>
          )
        }
      />
    </Col>
  );
};

const renderContactInformation = (party) => {
  return (
    <>
      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-oa.party.mainEmailAddress" />}
          value={
            party?.mainEmail && (
              <ExternalLink
                content={party.mainEmail}
                href={'mailto:' + party.mainEmail}
              />
            )
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
    </>
  );
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

const PartyInfo = ({ party, streetAddresses, compact }) => {
  return !compact ? (
    <>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.party.name" />}
            value={
              <Link to={urls.party(party?.id)}>
                {party?.title + ' '}
                {party?.givenNames + ' '}
                {party?.familyName}
              </Link>
            }
          />
        </Col>
        {renderOrcidId(party?.orcidId)}
      </Row>
      <Row>{renderContactInformation(party)}</Row>
      <Row>
        {party?.alternateEmails.length
          ? renderOtherEmailAddresses(party?.alternateEmails)
          : ''}
      </Row>

      {streetAddresses && (
        <Row>
          <Col xs={12}>
            <Label>
              <FormattedMessage id="ui-oa.publicationRequest.streetAddresses" />
            </Label>
            {renderStreetAddresses(streetAddresses)}
          </Col>
        </Row>
      )}
    </>
  ) : (
    <>
      <Row>
        {renderContactInformation(party)}
        {renderOrcidId(party?.orcidId)}
      </Row>
      <Row>
        {party?.alternateEmails.length
          ? renderOtherEmailAddresses(party?.alternateEmails)
          : ''}
      </Row>
    </>
  );
};

PartyInfo.propTypes = propTypes;

export default PartyInfo;
