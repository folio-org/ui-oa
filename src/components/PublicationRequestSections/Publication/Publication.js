import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  KeyValue,
  NoValue,
  Row
} from '@folio/stripes/components';

const propTypes = {
  request: PropTypes.object
};

const Publication = ({ request }) => {
  return (
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
  );
};

Publication.propTypes = propTypes;

export default Publication;
