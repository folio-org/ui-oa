import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Col,
  FormattedUTCDate,
  InfoPopover,
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
        <Col xs={3}>
          <KeyValue
            label={
              <>
                <FormattedMessage id="ui-oa.publicationRequest.retrospectiveOA" />
                <InfoPopover
                  content={
                    <FormattedMessage id="ui-oa.publicationRequest.retrospectiveOA.viewTooltip" />
                  }
                />
              </>
            }
            value={
              request?.retrospectiveOA ? (
                <FormattedMessage id="ui-oa.yes" />
              ) : (
                <FormattedMessage id="ui-oa.no" />
              )
            }
          />
        </Col>
      </Row>
      {request?.externalRequestIds?.length > 0 && (
        <Row start="xs">
          <Col xs={12}>
            <KeyValue
              label={
                <FormattedMessage id="ui-oa.publicationRequest.externalRequestIds" />
              }
              value={
                <ul>
                  {request?.externalRequestIds
                    ?.sort((a, b) => {
                      return a?.externalId < b?.externalId ? -1 : 1;
                    })
                    ?.map((requestId) => (
                      <li key={requestId?.id}>{requestId?.externalId}</li>
                    ))}
                </ul>
              }
            />
          </Col>
        </Row>
      )}
    </>
  );
};

RequestInfo.propTypes = propTypes;

export default RequestInfo;
