import { FormattedMessage, useIntl } from 'react-intl';
import { Field } from 'react-final-form';

import { Col, Row, Select, TextField } from '@folio/stripes/components';

const PartyInfoForm = () => {
  const intl = useIntl();

  return (
    <>
      <Row>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[
              { value: '', label: '' },
              { value: 'Mr', label: intl.formatMessage({ id : 'ui-oa.party.title.mr' }) },
              { value: 'Ms', label: intl.formatMessage({ id : 'ui-oa.party.title.ms' }) },
              { value: 'Prof', label: intl.formatMessage({ id : 'ui-oa.party.title.prof' }) },
              { value: 'Dr', label: intl.formatMessage({ id : 'ui-oa.party.title.dr' }) },
            ]}
            id="party-title"
            label={<FormattedMessage id="ui-oa.party.title" />}
            name="title"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.familyName" />}
            name="familyName"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.givenNames" />}
            name="givenNames"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.orcidId" />}
            name="orcidId"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.mainEmailAddress" />}
            name="mainEmail"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.phone" />}
            name="phone"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.mobilePhone" />}
            name="mobile"
          />
        </Col>
      </Row>
    </>
  );
};

export default PartyInfoForm;
