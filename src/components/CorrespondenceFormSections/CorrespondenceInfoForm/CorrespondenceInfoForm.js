import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Row,
  Col,
  TextField,
  Datepicker,
  Select,
  TextArea
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

const CorrespondenceInfoForm = () => {
  return (
    <>
      <Row start="xs">
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.correspondence.correspondent" />}
            name="correspondent"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            backendDateStandard="YYYY-MM-DD"
            component={Datepicker}
            label={
              <FormattedMessage id="ui-oa.correspondence.dateOfCorrespondence" />
            }
            name="dateOfCorrespondence"
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
              { value: 'awaiting_reply', label: 'Awaiting Reply' },
              { value: 'response_needed', label: 'Response Needed' },
              { value: 'closed', label: 'Closed' },
            ]}
            label={<FormattedMessage id="ui-oa.correspondence.status" />}
            name="status.value"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              { value: 'email', label: 'Email' },
              { value: 'telephone', label: 'Telephone' },
            ]}
            label={<FormattedMessage id="ui-oa.correspondence.mode" />}
            name="mode.value"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              { value: 'invoice', label: 'Invoice' },
              { value: 'funding', label: 'Funding' }
            ]}
            label={<FormattedMessage id="ui-oa.correspondence.category" />}
            name="category.value"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={9}>
          <Field
            component={TextArea}
            fullWidth
            label={<FormattedMessage id="ui-oa.correspondence.description" />}
            name="content"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
    </>
  );
};
export default CorrespondenceInfoForm;
