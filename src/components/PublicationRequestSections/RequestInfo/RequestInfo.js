import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Col,
  FormattedUTCDate,
  KeyValue,
  NoValue,
  Row
} from '@folio/stripes/components';

const propTypes = {
  request: PropTypes.object
};

const RequestInfo = ({ request }) => {
  return (
    <div>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.requestNumber" />}>
            {request?.requestNumber ?
              request.requestNumber :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.requestDate" />}>
            {request?.requestDate ?
              <FormattedUTCDate value={request.requestDate} /> :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.status" />}>
            {request?.requestStatus ?
              request.requestStatus.label :
              <NoValue />
            }
          </KeyValue>
        </Col>
        <Col xs={3} />
      </Row>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.externalRequestIds" />}>
            {request?.externalRequestIds?.length ?
              <ul>
                {request?.externalRequestIds?.map(requestId => (
                  <li key={requestId?.id}>
                    {requestId?.externalId}
                  </li>
                ))}
              </ul> :
              <NoValue />
            }
          </KeyValue>
        </Col>
      </Row>
    </div>
  );
};

RequestInfo.propTypes = propTypes;

export default RequestInfo;
