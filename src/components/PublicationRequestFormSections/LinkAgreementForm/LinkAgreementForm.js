import {
  Accordion,
  Row,
  Col,
  Checkbox,
  TextField
} from "@folio/stripes/components";
import { FormattedMessage } from "react-intl";
import { Field, useForm } from 'react-final-form';
import { Registry } from '@folio/handler-stripes-registry';


const LinkAgreementForm = () => {
  const { change } = useForm();
  const resourceReg = Registry.getResource('agreement');
  const LookupComponent = resourceReg?.getLookupComponent() ?? TextField;


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
            onChange={(e) => { change('noAgreement', e.target.checked); }}
            type="checkbox"
          />
        </Col>
      </Row>
      <Field
        component={LookupComponent}
        id="selectedAgreement"
        name="selectedAgreement"
      />
    </Accordion>
  );
};

export default LinkAgreementForm;
