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
import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdataValues';

import { ExternalRequestIdFieldArray } from '../FieldArrays';

const RequestInfoForm = () => {
  const requestStatusValues = useOARefdata('PublicationRequest.RequestStatus');

  return (
    <div>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.requestNumber" />}>
            <div>
              <NoValue />
            </div>
          </KeyValue>
        </Col>
        <Col xs={3}>
          <Field
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            label={<FormattedMessage id="ui-oa.publicationRequest.requestDate" />}
            name="requestDate"
            required
            timeZone="UTC"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...selectifyRefdata(requestStatusValues)]}
            label={<FormattedMessage id="ui-oa.publicationRequest.status" />}
            name="requestStatus.id"
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

export default RequestInfoForm;
