import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Col, KeyValue, Label, Row } from '@folio/stripes/components';

import ExternalLink from '../../ExternalLink';
import urls from '../../../util/urls';

const propTypes = {
  party: PropTypes.object,
  isCard: PropTypes.bool,
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

const renderIdentifiers = (party) => {
  return (
    <>
      <Col xs={3}>
        <KeyValue
          label={<FormattedMessage id="ui-oa.party.orcidId" />}
          value={
            party?.orcidId && (
              <ExternalLink
                content={party?.orcidId}
                href={'https://orcid.org/' + party?.orcidId}
                icon
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
      <Row start="xs">
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

        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.party.streetAddress.region" />}
            value={address?.region}
          />
        </Col>
      </Row>
      <Row start="xs">
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
    </>
  );
};

const PartyInfo = ({ party, isCard }) => {
  const location = useLocation();
  return !isCard ? (
    <>
      <Row>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.party.name" />}
            value={
              location?.pathname !== `/oa/people/${party?.id}` ? (
                <Link to={urls.party(party?.id)}>
                  {party?.title && party?.title + ' '}
                  {party?.givenNames + ' '}
                  {party?.familyName}
                </Link>
              ) : (
                <>
                  {party?.title && party?.title + ' '}
                  {party?.givenNames + ' '}
                  {party?.familyName}
                </>
              )
            }
          />
        </Col>
        {renderIdentifiers(party)}
      </Row>
      <Row>
        <Col xs={12}>
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
      </Row>
      <Row>
        {party?.alternateEmails?.length > 0 &&
          renderOtherEmailAddresses(party?.alternateEmails)}
      </Row>

      {party?.streetAddress && (
        <Row>
          <Col xs={12}>
            <Label>
              <FormattedMessage
                id="ui-oa.party.streetAddress.index"
                values={{ index: '' }}
              />
            </Label>
            <br />
            {renderStreetAddresses(party?.streetAddress?.address)}
          </Col>
        </Row>
      )}
    </>
  ) : (
    <>
      <Row>{renderIdentifiers(party)}</Row>
      <Row>
        <Col xs={12}>
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
      </Row>
      <Row>
        {party?.alternateEmails?.length > 0 &&
          renderOtherEmailAddresses(party?.alternateEmails)}
      </Row>
    </>
  );
};

PartyInfo.propTypes = propTypes;

export default PartyInfo;
