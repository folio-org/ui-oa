import {
  Accordion,
  Row,
  Col,
  Checkbox,
  TextField,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { Field, useForm, useFormState } from 'react-final-form';
import { Registry } from '@folio/handler-stripes-registry';
import { useState } from 'react';

const LinkAgreementForm = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const [agreement, setAgreement] = useState({});

  const resourceReg = Registry.getResource('agreement');
  const LookupComponent = resourceReg?.getLookupComponent() ?? TextField;

  const handleAgreementSelected = (a) => {
    setAgreement(a);
    change('agreement.name', a.id);
  };

  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.agreement" />}
    >
      <Row>
        <Col xs={3}>
          <Field
            component={Checkbox}
            label={
              <FormattedMessage id="ui-oa.publicationRequest.noAgreement" />
            }
            name="noAgreement"
            onChange={(e) => {
              if (agreement) {
                setAgreement({});
                change('agreement.name', undefined);
              }
              change('noAgreement', e.target.checked);
            }}
          />
        </Col>
      </Row>
      {!values.noAgreement && (
        <Field
          component={LookupComponent}
          name="agreement.name"
          onResourceSelected={handleAgreementSelected}
          resource={agreement}
        />
      )}
    </Accordion>
  );
};

export default LinkAgreementForm;
