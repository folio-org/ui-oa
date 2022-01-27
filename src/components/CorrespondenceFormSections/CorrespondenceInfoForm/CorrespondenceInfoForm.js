import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Row,
  Col,
  TextField,
  Datepicker,
  Select,
  TextArea,
} from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

const CorrespondenceInfoForm = () => {
  const intl = useIntl();

  return (
    <>
      <Row start="xs">
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.correspondence.correspondent" />}
            maxLength={255}
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
              {
                value: 'awaiting_reply',
                label: intl.formatMessage({
                  id: 'ui-oa.correspondence.status.awaitingReply',
                }),
              },
              {
                value: 'response_needed',
                label: intl.formatMessage({
                  id: 'ui-oa.correspondence.status.responseNeeded',
                }),
              },
              {
                value: 'closed',
                label: intl.formatMessage({
                  id: 'ui-oa.correspondence.status.responseNeeded',
                }),
              },
            ]}
            id="correspondence-status"
            label={<FormattedMessage id="ui-oa.correspondence.status" />}
            name="status.value"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              {
                value: 'email',
                label: intl.formatMessage({
                  id: 'ui-oa.correspondence.mode.email',
                }),
              },
              {
                value: 'telephone',
                label: intl.formatMessage({
                  id: 'ui-oa.correspondence.mode.telephone',
                }),
              },
            ]}
            id="correspondence-mode"
            label={<FormattedMessage id="ui-oa.correspondence.mode" />}
            name="mode.value"
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
              {
                value: 'invoice',
                label: intl.formatMessage({
                  id: 'ui-oa.correspondence.category.invoice',
                }),
              },
              {
                value: 'funding',
                label: intl.formatMessage({
                  id: 'ui-oa.correspondence.category.funding',
                }),
              },
            ]}
            id="correspondence-category"
            label={<FormattedMessage id="ui-oa.correspondence.category" />}
            name="category.value"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
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
