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
  request: PropTypes.object
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

const RequestPartyInfo = ({ request }) => {
  return (
    <div>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.title" />}>
            {request?.correspondingAuthor ?
              <div>{request.correspondingAuthor.partyOwner.title}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.familyName" />}>
            {request?.correspondingAuthor ?
              <div>{request.correspondingAuthor.partyOwner.familyName}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.givenName" />}>
            {request?.correspondingAuthor ?
              <div>{request.correspondingAuthor.partyOwner.givenNames}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.orcidId" />}>
            {request?.correspondingAuthor ?
              <div>{request.correspondingAuthor.partyOwner.orcidId}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
      </Row>

      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.mainEmail" />}>
            {request?.correspondingAuthor ?
              <div>{request.correspondingAuthor.partyOwner.mainEmail}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.phone" />}>
            {request?.correspondingAuthor ?
              <div>{request.correspondingAuthor.partyOwner.phone}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.mobile" />}>
            {request?.correspondingAuthor ?
              <div>{request.correspondingAuthor.partyOwner.mobile}</div>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3} />
      </Row>

      <Row start="xs">
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-oa.otherEmail.otherEmailAddresses" />}>
            {request?.otherEmailAddresses?.length ?
              <ul>
                {request?.otherEmailAddresses?.map(email => <li key={email?.id}>{email?.emailAddress}</li>)}
              </ul>
              :
              <NoValue />
            }
          </KeyValue>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Label>
            <FormattedMessage id="ui-oa.publicationRequest.streetAddresses" />
          </Label>
          {request?.streetAddresses ? renderStreetAddresses(request.streetAddresses) : <NoValue />}
        </Col>
      </Row>
    </div>
  );
};

RequestPartyInfo.propTypes = propTypes;

export default RequestPartyInfo;
