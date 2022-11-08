import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Field, useForm } from 'react-final-form';

import {
  Col,
  Datepicker,
  KeyValue,
  Row,
  Select,
  Checkbox,
  Label,
  InfoPopover,
} from '@folio/stripes/components';

import { requiredValidator } from '@folio/stripes-erm-components';

import { useOARefdata, selectifyRefdata } from '../../../util';

import { ExternalRequestIdFieldArray } from '../FieldArrays';

const propTypes = {
  request: PropTypes.object,
};

const RequestInfoForm = ({ request }) => {
  const { change } = useForm();
  const requestStatusValues = useOARefdata('PublicationRequest.RequestStatus');

  return (
    <>
      <Row start="xs">
        <Col xs={3}>
          <KeyValue
            label={
              <FormattedMessage id="ui-oa.publicationRequest.requestNumber" />
            }
            value={request?.requestNumber}
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            id="request-date"
            label={
              <FormattedMessage id="ui-oa.publicationRequest.requestDate" />
            }
            name="requestDate"
            required
            timeZone="UTC"
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              ...selectifyRefdata(requestStatusValues),
            ]}
            id="request-status"
            label={<FormattedMessage id="ui-oa.publicationRequest.status" />}
            name="requestStatus.id"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Label>
            <FormattedMessage id="ui-oa.publicationRequest.retrospectiveOpenAccess" />
            <InfoPopover
              content={
                <FormattedMessage id="ui-oa.publicationRequest.retrospectiveOpenAccess.formTooltip" />
              }
              id="retrospective-oa-tooltip"
            />
          </Label>

          <Field
            component={Checkbox}
            name="retrospectiveOA"
            onChange={(e) => {
              change('retrospectiveOA', e.target.checked);
            }}
            type="checkbox"
          />
        </Col>
      </Row>
      <Row>
        <Col xs>
          <ExternalRequestIdFieldArray />
        </Col>
      </Row>
    </>
  );
};

RequestInfoForm.propTypes = propTypes;

export default RequestInfoForm;
