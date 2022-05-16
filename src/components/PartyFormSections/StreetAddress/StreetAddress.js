import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import { Col, Row, TextField, Card, Label } from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';
import { MAX_CHAR_LONG } from '../../../constants/config';

const StreetAddress = () => {
  return (
    <>
      <Label>
        <FormattedMessage id="ui-oa.party.streetAddresses" />
      </Label>
      <Card
        headerStart={
          <strong>
            <FormattedMessage
              id="ui-oa.party.streetAddress.index"
              values={{ index: '' }}
            />
          </strong>
        }
        roundedBorder
      >
        <Row>
          <Col xs={3}>
            <Field
              component={TextField}
              label={<FormattedMessage id="ui-oa.party.streetAddress.name" />}
              name="streetAddress.address.name"
              parse={(v) => v}
            />
          </Col>
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
        </Row>
        <Row>
          <Col xs={3}>
            <Field
              component={TextField}
              label={<FormattedMessage id="ui-oa.party.streetAddress.region" />}
              maxLength={MAX_CHAR_LONG}
              name="streetAddress.address.region"
              parse={(v) => v}
            />
          </Col>
          <Col xs={3}>
            <Field
              component={TextField}
              label={
                <FormattedMessage id="ui-oa.party.streetAddress.country" />
              }
              maxLength={MAX_CHAR_LONG}
              name="streetAddress.address.country"
              required
              validate={requiredValidator}
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
              required
              validate={requiredValidator}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default StreetAddress;
