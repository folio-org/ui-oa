import PropTypes from 'prop-types';
import {
  Col,
  Label,
  Row,
  Select,
  TextField,
  MultiSelection,
} from '@folio/stripes/components';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { requiredValidator } from '@folio/stripes-erm-components';
import { validateYear } from '../../../util/validators';

const ReportingInfoForm = ({ institutionName }) => {
  const insututionDataOptions = [institutionName];

  return (
    <>
      <Row>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={insututionDataOptions}
            disabled
            label={<FormattedMessage id="ui-oa.report.institution" />}
            name="institutionName"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={[{ value: 'openapc_apc', label: 'OpenAPC APC' }]}
            disabled
            label={<FormattedMessage id="ui-oa.report.reportFormat" />}
            name="reportFormat"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
      <Label
        style={{ marginBottom: '1rem', marginTop: '1.5rem', fontSize: 'large' }}
      >
        <FormattedMessage id="ui-oa.report.reportParameters" />
      </Label>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.report.paymentPeriod" />}
            name="paymentPeriod"
            validate={validateYear}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            component={MultiSelection}
            label={<FormattedMessage id="ui-oa.report.chargeCategories" />}
            name="chargeCategories"
          />
        </Col>
        <Col xs={6}>
          <Field
            component={MultiSelection}
            label={<FormattedMessage id="ui-oa.report.chargeStatuses" />}
            name="chargeStatuses"
          />
        </Col>
      </Row>
    </>
  );
};

ReportingInfoForm.propTypes = {
  institutionName: PropTypes.object,
};

export default ReportingInfoForm;
