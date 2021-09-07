import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Field,
  useFormState
} from 'react-final-form';
import {
  Col,
  Datepicker,
  KeyValue,
  NoValue,
  Row,
  Select,
} from '@folio/stripes/components';
import { useRefdata } from '@k-int/stripes-kint-components';

import ExternalRequestIdFieldArray from './fieldArrays/externalRequestIdFieldArray';

const propTypes = {
};

const RequestInfo = () => {
  const { values } = useFormState();
  // TODO: Switch to useRefData in stripes-kint-components v2.0.0
  const { 0: { values: requestStatusValues = [] } = {} } = useRefdata({ desc: "PublicationRequest.RequestStatus", endpoint: "oa/refdata" })
  const { 0: { values: rejectionReasonValues = [] } = {} } = useRefdata({ desc: "PublicationRequest.RejectionReason", endpoint: "oa/refdata" })

  return (
    <div>
      <Row start="xs">
        <Col xs={3}>
          {/* TODO: Request number value? */}
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.requestNumber" />}>
            <div>
              <NoValue />
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <Field
            component={Datepicker}
            label={<FormattedMessage id="ui-oa.publicationRequest.requestDate" />}
            name="requestDate"
            required
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...requestStatusValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.status" />}
            name="requestStatus"
            required
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...rejectionReasonValues]}
            disabled={values.requestStatus !== 'rejected'}
            label={<FormattedMessage id="ui-oa.publicationRequest.rejectionReason" />}
            name="rejectionReason"
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
