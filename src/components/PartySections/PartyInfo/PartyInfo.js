import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Card, Col, KeyValue, Label, Row } from '@folio/stripes/components';

import ExternalLink from '../../ExternalLink';
import urls from '../../../util/urls';

const propTypes = {
  party: PropTypes.object,
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

const renderStreetAddresses = (address) => {
  return (
    <>
      <Row>
        <Card
          headerStart={
            <Label>
              <FormattedMessage
                id="ui-oa.party.streetAddress.index"
                values={{ index: '' }}
              />
            </Label>
          }
        >
          <Row start="xs">
            <Col xs={3}>
              <KeyValue
                label={<FormattedMessage id="ui-oa.party.streetAddress.name" />}
                value={address?.name}
              />
            </Col>
            <Col xs={3}>
              <KeyValue
                label={
                  <FormattedMessage id="ui-oa.party.streetAddress.addressLineOne" />
                }
                value={address?.addressLineOne}
              />
            </Col>
            <Col xs={3}>
              <KeyValue
                label={
                  <FormattedMessage id="ui-oa.party.streetAddress.addressLineTwo" />
                }
                value={address?.addressLineTwo}
              />
            </Col>
            <Col xs={3}>
              <KeyValue
                label={<FormattedMessage id="ui-oa.party.streetAddress.city" />}
                value={address?.city}
              />
            </Col>
          </Row>

          <Row start="xs">
            <Col xs={3}>
              <KeyValue
                label={
                  <FormattedMessage id="ui-oa.party.streetAddress.region" />
                }
                value={address?.region}
              />
            </Col>
            <Col xs={3}>
              <KeyValue
                label={<FormattedMessage id="ui-oa.party.streetAddress.country" />}
                value={address?.country}
              />
            </Col>
            <Col xs={3}>
              <KeyValue
                label={
                  <FormattedMessage id="ui-oa.party.streetAddress.postalCode" />
                }
                value={address?.postalCode}
              />
            </Col>
          </Row>
        </Card>
      </Row>
    </>
  );
};

const PartyInfo = ({ party, compact }) => {
  return !compact ? (
    <>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.party.name" />}
            value={
              <Link to={urls.party(party?.id)}>
                {party?.title && party?.title + ' '}
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
        {party?.alternateEmails?.length
          ? renderOtherEmailAddresses(party?.alternateEmails)
          : ''}
      </Row>

      {party?.streetAddress && (
        <Row>
          <Col xs={12}>
            <Label>
              <FormattedMessage id="ui-oa.party.streetAddresses" />
            </Label>
            {renderStreetAddresses(party?.streetAddress?.address)}
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
        {party?.alternateEmails?.length
          ? renderOtherEmailAddresses(party?.alternateEmails)
          : ''}
      </Row>
    </>
  );
};

PartyInfo.propTypes = propTypes;

export default PartyInfo;
