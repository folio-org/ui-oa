import React from 'react';

import { FormattedMessage } from 'react-intl';

import {
  Col,
  KeyValue,
  NoValue,
  Row
} from '@folio/stripes/components';

const RequestInfo = ({request}) => {
  return (
    <div>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.requestNumber" />}>
            <div>
              {request?.requestNumber ?
                <div>{request?.requestNumber}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.requestDate" />}>
            <div>
              {request?.requestDate ?
                <div>{request?.requestDate}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.status" />}>
            <div>
              {request?.requestStatus ?
                <div>{request?.requestStatus?.label}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.rejectionReason" />}>
            <div>
              {request?.rejectionReason ?
                <div>{request?.rejectionReason.label}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
      </Row>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.externalRequestIds" />}>
            <div>
              <ul>
                {request?.externalRequestIds?.length ?
                  request?.externalRequestIds.map(requestId => <li key={requestId.id}>{requestId.externalId}</li>)
                  :
                  <NoValue />
                }
              </ul>
            </div>
          </KeyValue>
        </Col>
      </Row>
    </div>
  );
};

export default RequestInfo;
