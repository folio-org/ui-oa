import { Accordion, Row, Col, Checkbox } from "@folio/stripes/components";
import { FormattedMessage } from "react-intl";
import { Field, useForm } from 'react-final-form';
import React from "react";

const LinkAgreementForm = () => {
    const { change } = useForm();
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
    </Accordion>
  );
};

export default LinkAgreementForm;
