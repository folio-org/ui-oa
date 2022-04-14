import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Col,
  FormattedUTCDate,
  KeyValue,
  Row,
} from '@folio/stripes/components';

const propTypes = {
  request: PropTypes.object,
};

const RequestInfo = ({ request }) => {
  return (
    <>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.requestNumber" />
            }
            value={request?.requestNumber}
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.requestDate" />
            }
            value={
              request?.requestDate && (
                <FormattedUTCDate value={request.requestDate} />
              )
            }
          />
        </Col>
        <Col xs={3}>
          <KeyValue
            label={<FormattedMessage id="ui-oa.publicationRequest.status" />}
            value={request?.requestStatus?.label}
          />
        </Col>
        <Col xs={3} />
      </Row>
      <Row start="xs">
        <Col xs={12}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.externalRequestIds" />
            }
            value={
              request?.externalRequestIds?.length > 0 && (
                <ul>
                  {request?.externalRequestIds?.map((requestId) => (
                    <li key={requestId?.id}>{requestId?.externalId}</li>
                  ))}
                </ul>
              )
            }
          />
        </Col>
      </Row>
    </>
  );
};

RequestInfo.propTypes = propTypes;

export default RequestInfo;
