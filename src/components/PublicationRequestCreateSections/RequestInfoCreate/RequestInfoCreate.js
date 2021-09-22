import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Field,
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

import ExternalRequestIdFieldArray from '../FieldArrays/ExternalRequestIdFieldArray';

const RequestInfoCreate = () => {
  // TODO: Switch to useRefData in stripes-kint-components v2.0.0
  const { 0: { values: requestStatusValues = [] } = {} } = useRefdata({ desc: 'PublicationRequest.RequestStatus', endpoint: 'oa/refdata' });

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
        <Col xs={3} />
      </Row>
      <Row>
        <Col xs>
          <ExternalRequestIdFieldArray />
        </Col>
      </Row>
    </div>
  );
};

export default RequestInfoCreate;
