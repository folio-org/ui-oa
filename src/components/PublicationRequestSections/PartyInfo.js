import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Card,
  Col,
  KeyValue,
  Label,
  NoValue,
  Row
} from '@folio/stripes/components';

const propTypes = {
  otherStreetAddresses: PropTypes.object,
  party: PropTypes.object,
  streetAddresses: PropTypes.object
};

const renderStreetAddresses = (streetAddresses) => {
  return (
    <div>
      {streetAddresses.map((address, index) => (
        <Row>
          <Card
            headerStart={
              <Label>
                <FormattedMessage id="ui-oa.streetAddresses.streetAddressTitle" values={{ number: index }} />
              </Label>
            }
          >
            <Row start="xs">
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.addressType" />}>
                  {address?.addressType ?
                    <div>{address.addressType}</div>
                    :
                    <NoValue />
                  }
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.addressLine1" />}>
                  {address?.addressLine1 ?
                    <div>{address.addressLine1}</div>
                    :
                    <NoValue />
                  }
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.addressLine1" />}>
                  {address?.addressLine2 ?
                    <div>{address.addressLine2}</div>
                    :
                    <NoValue />
                  }
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.city" />}>
                  {address?.city ?
                    <div>{address.city}</div>
                    :
                    <NoValue />
                  }
                </KeyValue>
              </Col>
            </Row>

            <Row start="xs">
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.stateRegion" />}>
                  {address?.stateRegion ?
                    <div>{address.stateRegion}</div>
                    :
                    <NoValue />
                  }
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.postalCode" />}>
                  {address?.postalCode ?
                    <div>{address.postalCode}</div>
                    :
                    <NoValue />
                  }
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.country" />}>
                  {address?.country ?
                    <div>{address.country}</div>
                    :
                    <NoValue />
                  }
                </KeyValue>
              </Col>
              <Col xs={3} />
            </Row>
          </Card>
        </Row>
      ))}
    </div>
  );
};

const PartyInfo = ({ party, streetAddresses, otherEmailAddresses }) => {
  console.log(party)
  return (
    <div>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.title" />}>
            {party ?
              <div>{party.title}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.familyName" />}>
            {party ?
              <div>{party.familyName}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.givenName" />}>
            {party ?
              <div>{party.givenNames}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.orcidId" />}>
            {party ?
              <div>{party.orcidId}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
      </Row>

      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.mainEmail" />}>
            {party ?
              <div>{party.mainEmail}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.phone" />}>
            {party ?
              <div>{party.phone}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.mobile" />}>
            {party ?
              <div>{party.mobile}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3} />
      </Row>

      {otherEmailAddresses && <Row start="xs">
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-oa.otherEmail.otherEmailAddresses" />}>
            {otherEmailAddresses ?
              <ul>
                {otherEmailAddresses.map(email => <li key={email?.id}>{email?.emailAddress}</li>)}
              </ul>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
      </Row>}

      {streetAddresses && <Row>
        <Col xs={12}>
          <Label>
            <FormattedMessage id="ui-oa.publicationRequest.streetAddresses" />
          </Label>
          {streetAddresses ? renderStreetAddresses(streetAddresses) : <NoValue />}
        </Col>
      </Row>}

    </div>
  );
};

PartyInfo.propTypes = propTypes;

export default PartyInfo;
