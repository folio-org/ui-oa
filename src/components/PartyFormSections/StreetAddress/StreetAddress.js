import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import { Col, Row, TextField, Card, Label } from '@folio/stripes/components';
import { requiredValidator } from '@folio/stripes-erm-components';

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
              name="streetAddress.address.addressLineTwo"
              parse={(v) => v}
            />
          </Col>
          <Col xs={3}>
            <Field
              component={TextField}
              label={<FormattedMessage id="ui-oa.party.streetAddress.city" />}
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
              name="streetAddress.address.country"
            />
          </Col>
          <Col xs={3}>
            <Field
              component={TextField}
              label={
                <FormattedMessage id="ui-oa.party.streetAddress.postalCode" />
              }
              name="streetAddress.address.postalCode"
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default StreetAddress;
