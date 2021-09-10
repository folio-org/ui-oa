import React from 'react';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  AccordionSet,
  Button,
  Col,
  Icon,
  KeyValue,
  MetaSection,
  NoValue,
  Pane,
  Row
} from '@folio/stripes/components';

const propTypes = {
  data: PropTypes.object,
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
      actionMenu={() => (
        <Button
          buttonStyle="dropdownItem"
          id="clickable-dropdown-edit-publication-request"
          // onClick={handlers.onEdit}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-oa.publicationRequest.edit" />
          </Icon>
        </Button>
      )}
      paneTitle={<FormattedMessage id="ui-oa.publicationRequest.requestTitle" values={{ number: request?.requestNumber }} />}
    >
      <MetaSection
        contentId="publicationRequestMetaContent"
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
      <AccordionSet>
        <Accordion
          label={<FormattedMessage id="ui-oa.publicationRequest.publication" />}
        >
          <Row start="xs">
            <Col xs={6}>
              <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />}>
                <div>
                  {request?.publicationTitle?.length ?
                    <div>{request?.publicationTitle}</div>
                    :
                    <NoValue />
                  }
                </div>
              </KeyValue>
            </Col>
          </Row>

          <Row start="xs">
            <Col xs={3}>
              <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publicationType" />}>
                <div>
                  {request?.publicationType ?
                    <div>{request?.publicationType.label}</div>
                    :
                    <NoValue />
                  }
                </div>
              </KeyValue>
            </Col>
          </Row>
        </Accordion>
      </AccordionSet>
    </Pane>
  );
};

publicationRequest.propTypes = propTypes;

export default publicationRequest;
