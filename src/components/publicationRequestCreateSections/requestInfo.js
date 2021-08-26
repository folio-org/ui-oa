import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  Col,
  Datepicker,
  Row,
  Select,
  TextLink
} from '@folio/stripes/components';

import ExternalRequestIdFieldArray from './fieldArrays/externalRequestIdFieldArray';

const propTypes = {
  refValues: PropTypes.object
};


const RequestInfo = ({ refValues }) => {
  return (
    <div>
      <Row end="xs">
        <Col xs={3}>
          <Field
            component={TextLink}
            label={<FormattedMessage id="ui-oa.publicationRequest.createPublicationRequest" />}
            name="requestDate"
          // required
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Datepicker}
            label={<FormattedMessage id="ui-oa.publicationRequest.createPublicationRequest" />}
            name="requestDate"
            required
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={['', ...refValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.status" />}
            name="requestStatus"
            required
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={['']}
            label={<FormattedMessage id="ui-oa.publicationRequest.rejectionReason" />}
            name="asdf"
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <ExternalRequestIdFieldArray />
        </Col>
      </Row>
    </div>
  );
};

RequestInfo.propTypes = propTypes;

export default RequestInfo;
