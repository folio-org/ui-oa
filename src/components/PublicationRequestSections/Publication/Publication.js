import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  KeyValue,
  Label,
  MultiColumnList,
  NoValue,
  Row
} from '@folio/stripes/components';

const propTypes = {
  request: PropTypes.object
};

const formatter = {
  type: e => {
    return e?.type?.label;
  },
};

const Publication = ({ request }) => {
  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.publication" />}
    >
      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.doi" />}>
            <div>
              {request?.doi ?
                <div>{request.doi}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
      </Row>

      <Row start="xs">
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />}>
            <div>
              {request?.publicationTitle ?
                <div>{request.publicationTitle}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={6}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.authorNames" />}>
            <div>
              {request?.authorNames?.length ?
                <div>{request.authorNames}</div>
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
                <div>{request.publicationType.label}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.subtype" />}>
            <div>
              {request?.subtype ?
                <div>{request.subtype.label}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publisher" />}>
            <div>
              {request?.publisher ?
                <div>{request.publisher.label}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.license" />}>
            <div>
              {request?.license ?
                <div>{request.license.label}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
      </Row>

      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.localReference" />}>
            <div>
              {request?.localReference ?
                <div>{request.localReference}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={9}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publicationUrl" />}>
            <div>
              {request?.publicationUrl ?
                <div>{request.publicationUrl}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
      </Row>

      <Row>
        <Col>
          <Label>
            <FormattedMessage id="ui-oa.publicationRequest.identifiers" />
          </Label>
        </Col>
      </Row>

      <Row>
        <MultiColumnList
          columnMapping={{
            type: <FormattedMessage id="ui-oa.identifiers.type" />,
            publicationIdentifier: <FormattedMessage id="ui-oa.identifiers.identifier" />,
          }}
          contentData={request?.identifiers}
          formatter={formatter}
          visibleColumns={['type', 'publicationIdentifier']}
        />
      </Row>

    </Accordion>
  );
};

Publication.propTypes = propTypes;

export default Publication;
