import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Card,
  Col,
  Headline,
  KeyValue,
  Label,
  NoValue,
  Row
} from '@folio/stripes/components';

const propTypes = {
  request: PropTypes.object
};

const JournalDetails = ({ request }) => {
  return (
    <div>
      <Row start="xs">
        <Col xs={12}>
          <Headline margin="small" size="large" tag="h5">
            <FormattedMessage id="ui-oa.publicationRequest.journalDetails" />
          </Headline>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.journalTitle" />}>
            <div>
              {request?.journalTitle ?
                <div>{request.journalTitle}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
      </Row>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.issnPrint" />}>
            <div>
              {request?.issnPrint ?
                <div>{request.issnPrint}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.issnElectronic" />}>
            <div>
              {request?.issnElectronic ?
                <div>{request.issnElectronic}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.oaStatus" />}>
            <div>
              {request?.oaStatus ?
                <div>{request.oaStatus}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3} />
      </Row>
    </div>
  );
};

JournalDetails.propTypes = propTypes;

export default JournalDetails;
