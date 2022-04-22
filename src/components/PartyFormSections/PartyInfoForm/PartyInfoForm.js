import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import { Col, Row, TextField } from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

const PartyInfoForm = () => {
  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            id="party-title"
            label={<FormattedMessage id="ui-oa.party.title" />}
            maxLength={20}
            name="title"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.familyName" />}
            name="familyName"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.givenNames" />}
            name="givenNames"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.orcidId" />}
            name="orcidId"
            parse={(v) => v}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.mainEmailAddress" />}
            name="mainEmail"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.phone" />}
            name="phone"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.mobilePhone" />}
            name="mobile"
            parse={(v) => v}
          />
        </Col>
      </Row>
    </>
  );
};

export default PartyInfoForm;
