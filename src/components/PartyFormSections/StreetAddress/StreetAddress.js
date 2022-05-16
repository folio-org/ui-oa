import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import { Col, Row, TextField, Label } from '@folio/stripes/components';
import { MAX_CHAR_LONG } from '../../../constants/config';

const StreetAddress = () => {
  return (
    <>
      <Label>
        <FormattedMessage
          id="ui-oa.party.streetAddress.index"
          values={{ index: '' }}
        />
      </Label>
      <br />
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={
              <FormattedMessage id="ui-oa.party.streetAddress.addressLineOne" />
            }
            maxLength={MAX_CHAR_LONG}
            name="streetAddress.address.addressLineOne"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={
              <FormattedMessage id="ui-oa.party.streetAddress.addressLineTwo" />
            }
            maxLength={MAX_CHAR_LONG}
            name="streetAddress.address.addressLineTwo"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.streetAddress.city" />}
            maxLength={MAX_CHAR_LONG}
            name="streetAddress.address.city"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.streetAddress.region" />}
            maxLength={MAX_CHAR_LONG}
            name="streetAddress.address.region"
            parse={(v) => v}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.party.streetAddress.country" />}
            maxLength={MAX_CHAR_LONG}
            name="streetAddress.address.country"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={
              <FormattedMessage id="ui-oa.party.streetAddress.postalCode" />
            }
            maxLength={MAX_CHAR_LONG}
            name="streetAddress.address.postalCode"
          />
        </Col>
      </Row>
    </>
  );
};

export default StreetAddress;
