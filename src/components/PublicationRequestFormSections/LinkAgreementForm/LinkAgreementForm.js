import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useForm, useFormState } from 'react-final-form';

import {
  Accordion,
  Row,
  Col,
  Checkbox,
  TextField,
  IconButton,
} from '@folio/stripes/components';

import { Registry } from '@folio/handler-stripes-registry';

const LinkAgreementForm = () => {
  const { initialValues, values } = useFormState();
  const { change } = useForm();

  const resourceReg = Registry.getResource('agreement');
  const LookupComponent = resourceReg?.getLookupComponent() ?? TextField;

  const initialAgreement = initialValues?.agreement?.remoteId_object;
  const [agreement, setAgreement] = useState(initialAgreement ?? {});

  useEffect(() => {
    if (initialAgreement) {
      setAgreement(initialAgreement);
    }
  }, [initialAgreement]);

  const handleAgreementSelected = (a) => {
    setAgreement(a);
    change('agreement.remoteId', a?.id);
  };

  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.agreement" />}
    >
      <Row between="xs">
        <Col xs={3}>
          <Field
            checked={values.withoutAgreement}
            component={Checkbox}
            label={
              <FormattedMessage id="ui-oa.publicationRequest.noAgreement" />
            }
            name="withoutAgreement"
            onChange={(e) => {
              handleAgreementSelected();
              change('withoutAgreement', e.target.checked);
            }}
          />
        </Col>
        <Col>
          {values.agreement && (
            <IconButton icon="trash" onClick={() => handleAgreementSelected()} />
          )}
        </Col>
      </Row>
      {!values.withoutAgreement && (
        <Field
          component={LookupComponent}
          name="agreement.remoteId"
          onResourceSelected={handleAgreementSelected}
          resource={agreement}
        />
      )}
    </Accordion>
  );
};

export default LinkAgreementForm;
