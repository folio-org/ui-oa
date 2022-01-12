import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useForm, useFormState } from 'react-final-form';

import {
  Accordion,
  Row,
  Col,
  Checkbox,
  TextField,
} from '@folio/stripes/components';

import { get } from 'lodash';
import { Registry } from '@folio/handler-stripes-registry';


const LinkAgreementForm = () => {
  const { initialValues, values } = useFormState();
  const { change } = useForm();

  const resourceReg = Registry.getResource('agreement');
  const LookupComponent = resourceReg?.getLookupComponent() ?? TextField;

  const initialAgreement = (get(initialValues, 'agreement.remoteId_object'));
  const [agreement, setAgreement] = useState(initialAgreement ?? {});

  useEffect(() => {
    if (initialAgreement) {
      setAgreement(initialAgreement);
    }
  }, [initialAgreement]);

  const handleAgreementSelected = (a) => {
    setAgreement(a);
    change('agreement.remoteId', a.id);
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
                change('agreement.remoteId', undefined);
              }
              change('noAgreement', e.target.checked);
            }}
          />
        </Col>
      </Row>
      {!values.noAgreement && (
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
