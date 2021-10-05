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

const BookDetails = ({ request }) => {
  return (
    <div>
      <Row start="xs">
        <Col xs={3}>
          <Headline margin="small" size="large" tag="h5">
            <FormattedMessage id="ui-oa.publicationRequest.bookDetails" />
          </Headline>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publicationYear" />}>
            <div>
              {request?.publicationYear ?
                <div>{request.publicationYear}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.publicationPlace" />}>
            <div>
              {request?.publicationPlace ?
                <div>{request.publicationPlace}</div>
                :
                <NoValue />
              }
            </div>
          </KeyValue>
        </Col>
        <Col xs={6} />
      </Row>
    </div>
  );
};

BookDetails.propTypes = propTypes;

export default BookDetails;
