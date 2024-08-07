import { useState } from 'react';

import { Field, useForm, useFormState } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { NumberField } from '@k-int/stripes-kint-components';

import {
  Col,
  Select,
  Row,
  MessageBanner,
} from '@folio/stripes/components';
import { Registry } from '@folio/handler-stripes-registry';
import {
  composeValidators,
  requiredValidator,
} from '@folio/stripes-erm-components';

import { useOARefdata, selectifyRefdata } from '../../../util';
import { validateYear } from '../../../util/validators';

const [PUBLICATION_STATUS] = ['PublicationStatus.PublicationStatus'];

const ReportingAgreementForm = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const intl = useIntl();
  const refdataValues = useOARefdata([PUBLICATION_STATUS]);
  const [agreement, setAgreement] = useState({});

  const resourceReg = Registry.getResource('agreement');
  const LookupComponent = resourceReg?.getLookupComponent() ?? null;

  const publicationStatusValues = selectifyRefdata(
    refdataValues,
    PUBLICATION_STATUS,
    'value'
  ).map((e) => {
    return {
      label: `${e.label}${intl.formatMessage({
        id: 'ui-oa.report.reportParams.inPeriodAffix',
      })}`,
      value: e.value,
    };
  });

  const handleAgreementSelected = (a) => {
    setAgreement(a);
    change('agreementId', a?.id);
  };

  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={NumberField}
            label={<FormattedMessage id="ui-oa.report.paymentPeriod" />}
            name="paymentPeriod"
            required={!!values?.publicationStatus || !!values?.paymentPeriod}
            validate={(value, allValues, meta) => {
              if (allValues?.publicationStatus || value) {
                return composeValidators(requiredValidator, validateYear)(
                  value,
                  allValues,
                  meta
                );
              } else {
                return null;
              }
            }}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...publicationStatusValues]}
            label={
              <FormattedMessage id="ui-oa.publicationRequest.publicationStatus" />
            }
            name="publicationStatus"
            required={!!values?.paymentPeriod || !!values?.publicationStatus}
            validate={(value, allValues, meta) => {
              if (allValues?.paymentPeriod || value) {
                return requiredValidator(value, allValues, meta);
              } else {
                return null;
              }
            }}
          />
        </Col>
      </Row>
      <br />
      <Field name="agreementId" validate={requiredValidator}>
        {({ input }) => {
          if (LookupComponent) {
            return (
              <LookupComponent
                input={input}
                onResourceSelected={handleAgreementSelected}
                resource={agreement}
              />
            );
          } else {
            return (
              <MessageBanner type="error">
                <FormattedMessage id="ui-oa.publicationRequest.agreementsNotWorking" />
              </MessageBanner>
            );
          }
        }}
      </Field>
    </>
  );
};

export default ReportingAgreementForm;
