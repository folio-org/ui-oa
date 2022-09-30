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
import { useOARefdata, selectifyRefdata } from '../../../util';
import { validateYear } from '../../../util/validators';

const ReportingInfoForm = ({ institutionName }) => {
  const chargeStatusesValues = selectifyRefdata(
    useOARefdata('Charge.ChargeStatus'),
    null,
    'value'
  );
  const chargeCategoriesValues = selectifyRefdata(
    useOARefdata('Charge.Category'),
    null,
    'value'
  );
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
        style={{
          marginBottom: '1rem',
          marginTop: '1.5rem',
          fontSize: '1.2rem',
        }}
      >
        <FormattedMessage id="ui-oa.report.reportParameters" />
      </Label>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.report.paymentPeriod" />}
            name="paymentPeriod"
            type="number"
            validate={validateYear}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <Field
            component={MultiSelection}
            dataOptions={chargeCategoriesValues}
            label={<FormattedMessage id="ui-oa.report.chargeCategories" />}
            name="chargeCategories"
          />
        </Col>
        <Col xs={6}>
          <Field
            component={MultiSelection}
            dataOptions={chargeStatusesValues}
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
