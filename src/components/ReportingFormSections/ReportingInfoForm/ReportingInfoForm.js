import {
  Col,
  Label,
  MultiSelection,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useOARefdata } from '../../../util';
import { validateYear } from '../../../util/validators';

const ReportingInfoForm = () => {
  const chargeStatusesValues = useOARefdata('Charge.ChargeStatus');
  const chargeCategoriesValues = useOARefdata('Charge.Category');
  const institutionsValues = useOARefdata('InstitutionName');

  return (
    <>
      <Row>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...institutionsValues]}
            disabled={institutionsValues.length < 2}
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
            component={MultiSelection}
            dataOptions={[...chargeCategoriesValues]}
            label={<FormattedMessage id="ui-oa.report.chargeCategories" />}
            name="chargeCategory"
          />
        </Col>
        <Col xs={6}>
          <Field
            component={MultiSelection}
            dataOptions={[...chargeStatusesValues]}
            label={<FormattedMessage id="ui-oa.report.chargeStatuses" />}
            name="chargeStatus"
          />
        </Col>
      </Row>
    </>
  );
};

export default ReportingInfoForm;
