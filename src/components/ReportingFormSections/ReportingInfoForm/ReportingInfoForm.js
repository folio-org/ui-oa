import PropTypes from 'prop-types';
import { Col, Label, Row, Select, TextField } from '@folio/stripes/components';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useOARefdata } from '../../../util';
import { validateYear } from '../../../util/validators';

const ReportingInfoForm = ({ institution }) => {
  const chargeStatusesValues = useOARefdata('Charge.ChargeStatus');
  const chargeCategoriesValues = useOARefdata('Charge.Category');
  const insututionDataOptions = [institution];

  return (
    <>
      <Row>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={insututionDataOptions}
            disabled
            label={<FormattedMessage id="ui-oa.report.institution" />}
            name="institution"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              { value: 'openApcChargesReport', label: 'OpenAPC APC' },
              { value: 'openApcBcpReport', label: 'OpenAPC BPC' },
            ]}
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
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...chargeCategoriesValues]}
            label={<FormattedMessage id="ui-oa.report.chargeCategories" />}
            name="chargeCategory"
          />
        </Col>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...chargeStatusesValues]}
            label={<FormattedMessage id="ui-oa.report.chargeStatuses" />}
            name="chargeStatus"
          />
        </Col>
      </Row>
    </>
  );
};

ReportingInfoForm.propTypes = {
  institution: PropTypes.object,
};

export default ReportingInfoForm;
