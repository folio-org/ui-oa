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
                  <div>
                    {address?.addressType ?
                      <div>{address.addressType}</div>
                      :
                      <NoValue />
                    }
                  </div>
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.addressLine1" />}>
                  <div>
                    {address?.addressLine1 ?
                      <div>{address.addressLine1}</div>
                      :
                      <NoValue />
                    }
                  </div>
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.addressLine1" />}>
                  <div>
                    {address?.addressLine2 ?
                      <div>{address.addressLine2}</div>
                      :
                      <NoValue />
                    }
                  </div>
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.city" />}>
                  <div>
                    {address?.city ?
                      <div>{address.city}</div>
                      :
                      <NoValue />
                    }
                  </div>
                </KeyValue>
              </Col>
            </Row>

            <Row start="xs">
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.stateRegion" />}>
                  <div>
                    {address?.stateRegion ?
                      <div>{address.stateRegion}</div>
                      :
                      <NoValue />
                    }
                  </div>
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.postalCode" />}>
                  <div>
                    {address?.postalCode ?
                      <div>{address.postalCode}</div>
                      :
                      <NoValue />
                    }
                  </div>
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-oa.streetAddresses.country" />}>
                  <div>
                    {address?.country ?
                      <div>{address.country}</div>
                      :
                      <NoValue />
                    }
                  </div>
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

const RequestContact = ({ request }) => {
  return (
    <div>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.title" />}>
            <div>
              {request?.correspondingAuthor ?
                <div>{request.correspondingAuthor.partyOwner.title}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.familyName" />}>
            <div>
              {request?.correspondingAuthor ?
                <div>{request.correspondingAuthor.partyOwner.familyName}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.givenName" />}>
            <div>
              {request?.correspondingAuthor ?
                <div>{request.correspondingAuthor.partyOwner.givenNames}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.orcidId" />}>
            <div>
              {request?.correspondingAuthor ?
                <div>{request.correspondingAuthor.partyOwner.orcidId}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
      </Row>

      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.mainEmail" />}>
            <div>
              {request?.correspondingAuthor ?
                <div>{request.correspondingAuthor.partyOwner.mainEmail}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.phone" />}>
            <div>
              {request?.correspondingAuthor ?
                <div>{request.correspondingAuthor.partyOwner.phone}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.mobile" />}>
            <div>
              {request?.correspondingAuthor ?
                <div>{request.correspondingAuthor.partyOwner.mobile}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3} />
      </Row>

      <Row start="xs">
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-oa.otherEmail.otherEmailAddresses" />}>
            <div>
              {request?.otherEmailAddresses?.length ?
                <ul>
                  {request?.otherEmailAddresses?.map(email => <li key={email?.id}>{email?.emailAddress}</li>)}
                </ul>
                :
                <NoValue />
              }
            </div>
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

RequestContact.propTypes = propTypes;

export default RequestContact;
