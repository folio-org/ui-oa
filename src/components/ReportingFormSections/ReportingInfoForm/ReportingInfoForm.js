import { Col, Label, Row, Select } from '@folio/stripes/components';
import { Field, useFormState } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useOARefdata, selectifyRefdata } from '../../../util';

import ReportingChargeForm from '../ReportingChargeForm';
import ReportingAgreementForm from '../ReportingAgreementForm';

const [INSTITUTION_NAME] = ['InstitutionName'];

const ReportingInfoForm = () => {
  const { values } = useFormState();
  console.log(values?.reportFormat);

  const refdataValues = useOARefdata([INSTITUTION_NAME]);
  const institutionsValues = selectifyRefdata(
    refdataValues,
    INSTITUTION_NAME,
    'value'
  );

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
              { value: 'openApcBpcReport', label: 'OpenAPC BPC' },
              {
                value: 'openApcTransformativeAgreementReport',
                label: 'OpenAPC Transformative Agreement',
              },
            ]}
            label={<FormattedMessage id="ui-oa.report.reportFormat" />}
            name="reportFormat"
            required
            validate={requiredValidator}
          />
        </Col>
      </Row>
      {values?.reportFormat !== 'openApcTransformativeAgreementReport' && (
        <>
          <Label
            style={{
              marginBottom: '1rem',
              marginTop: '1.5rem',
              fontSize: '1.2rem',
            }}
          >
            <FormattedMessage id="ui-oa.report.reportParameters" />
          </Label>
          <ReportingChargeForm />
        </>
      )}
      {values?.reportFormat === 'openApcTransformativeAgreementReport' && (
        <>
          <Label
            style={{
              marginBottom: '1rem',
              marginTop: '1.5rem',
              fontSize: '1.2rem',
            }}
          >
            <FormattedMessage id="ui-oa.report.reportParameters" />
          </Label>
          <ReportingAgreementForm />
        </>
      )}
    </>
  );
};

export default ReportingInfoForm;
