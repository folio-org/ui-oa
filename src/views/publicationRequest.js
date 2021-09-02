import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  AccordionSet,
  Col,
  KeyValue,
  Label,
  MetaSection,
  NoValue,
  Pane,
  Row
} from '@folio/stripes/components';

const propTypes = {
  handlers: PropTypes.shape({
    onClose: PropTypes.func.isRequired
  }).isRequired
};

const publicationRequest = ({ handlers, data: { publicationRequest: request } = {} }) => {
  const paneProps = {
    defaultWidth: '55%',
    dismissible: true,
    onClose: handlers.onClose,
  };

  return (
    <Pane
      {...paneProps}
    >
      <MetaSection
        contentId="agreementInfoRecordMetaContent"
        // TODO: Update createdDate
        createdDate={request?.dateModified}
        hideSource
        lastUpdatedDate={request?.dateModified}
      />
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
              {request?.requestStatus?.label ?
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
                <div>{request?.rejectionReason}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
      </Row>
      <Row start="xs">
        <Col>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.externalRequestIds" />}>
            <div>
              <ul>
                {request?.externalRequestIds?.length ?
                  request?.externalRequestIds.map(id => <li>{id}</li>)
                  :
                  <NoValue />
                }
              </ul>
            </div>
          </KeyValue>
        </Col>
      </Row>
    </Pane>
  );
};

publicationRequest.propTypes = propTypes;

export default publicationRequest;
