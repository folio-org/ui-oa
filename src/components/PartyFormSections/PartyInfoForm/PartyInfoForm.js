import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import { Col, Row, TextField } from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { MAX_CHAR_LONG, MAX_CHAR_SHORT } from '../../../constants/config';

const PartyInfoForm = () => {
  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            id="party-title"
            label={<FormattedMessage id="ui-oa.party.title" />}
            maxLength={12}
            name="title"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.familyName" />}
            maxLength={MAX_CHAR_SHORT}
            name="familyName"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.givenNames" />}
            maxLength={MAX_CHAR_SHORT}
            name="givenNames"
            required
            validate={requiredValidator}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.orcidId" />}
            maxLength={MAX_CHAR_SHORT}
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
            maxLength={MAX_CHAR_LONG}
            name="mainEmail"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.phone" />}
            maxLength={MAX_CHAR_SHORT}
            name="phone"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.mobilePhone" />}
            maxLength={MAX_CHAR_SHORT}
            name="mobile"
            parse={(v) => v}
          />
        </Col>
      </Row>
    </>
  );
};

export default PartyInfoForm;
