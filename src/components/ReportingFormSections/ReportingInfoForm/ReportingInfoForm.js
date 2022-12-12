import { Col, Label, Row, Select } from '@folio/stripes/components';
import { Field, useForm, useFormState } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { requiredValidator } from '@folio/stripes-erm-components';
import { useOARefdata, selectifyRefdata } from '../../../util';

import ReportingChargeForm from '../ReportingChargeForm';
import ReportingAgreementForm from '../ReportingAgreementForm';

const [INSTITUTION_NAME] = ['InstitutionName'];

const ReportingInfoForm = () => {
  const { values } = useFormState();
  const { reset } = useForm();
  const intl = useIntl();

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
          <Field name="reportFormat" validate={requiredValidator}>
            {({ input }) => {
              return (
                <Select
                  {...input}
                  dataOptions={[
                    { value: '', label: '' },
                    {
                      value: 'openApcChargesReport',
                      label: intl.formatMessage({
                        id: 'ui-oa.report.reportFormat.openApc',
                      }),
                    },
                    {
                      value: 'openApcBpcReport',
                      label: intl.formatMessage({
                        id: 'ui-oa.report.reportFormat.openApcBpc',
                      }),
                    },
                    {
                      value: 'openApcTransformativeAgreementReport',
                      label: intl.formatMessage({
                        id: 'ui-oa.report.reportFormat.openApcTransformativeAgreement',
                      }),
                    },
                  ]}
                  label={<FormattedMessage id="ui-oa.report.reportFormat" />}
                  onChange={(e) => {
                    reset();
                    input.onChange(e);
                  }}
                  required
                  validate={requiredValidator}
                />
              );
            }}
          </Field>
        </Col>
      </Row>
      {!!values?.reportFormat && (
        <Label
          style={{
            marginBottom: '1rem',
            marginTop: '1.5rem',
            fontSize: '1.2rem',
          }}
        >
          <FormattedMessage id="ui-oa.report.reportParameters" />
        </Label>
      )}
      {(values?.reportFormat === 'openApcChargesReport' ||
        values?.reportFormat === 'openApcBpcReport') && <ReportingChargeForm />}
      {values?.reportFormat === 'openApcTransformativeAgreementReport' && (
        <ReportingAgreementForm />
      )}
    </>
  );
};

export default ReportingInfoForm;
