import { FormattedMessage } from 'react-intl';
import { Field, Form } from 'react-final-form';
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
      <Row>
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
              { value: 'Awaiting Reply', label: 'Awaiting Reply' },
              { value: 'Response Needed', label: 'Response Needed' },
              { value: 'Closed', label: 'Closed' },
            ]}
            label={<FormattedMessage id="ui-oa.correspondence.status" />}
            name="status"
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
              { value: 'Email', label: 'Email' },
              { value: 'Telephone', label: 'Telephone' },
            ]}
            label={<FormattedMessage id="ui-oa.correspondence.mode" />}
            name="mode"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              { value: 'Invoice', label: 'Invoice' },
              { value: 'Funding', label: 'Funding' }
            ]}
            label={<FormattedMessage id="ui-oa.correspondence.category" />}
            name="category"
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
