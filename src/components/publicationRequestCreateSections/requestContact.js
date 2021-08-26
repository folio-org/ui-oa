import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  Accordion,
  Checkbox,
  Col,
  Headline,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import OtherEmailFieldArray from './fieldArrays/otherEmailFieldArray';
import StreetAddressesFieldArray from './fieldArrays/streetAddressesFieldArray';

const RequestContact = () => {
  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.requestContact" />}
    >
      <Row end="xs">
        <Col xs={3}>
          <Field
            component={Checkbox}
            label={<FormattedMessage id="ui-oa.publicationRequest.useCorrespondingAuthor" />}
            name="useCorrespondingAuthor"
            type="checkbox"
          />
        </Col>
        <Col xs={9} />
      </Row>
      <Row end="xs">
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[]}
            label={<FormattedMessage id="ui-oa.publicationRequest.title" />}
            name="asdf"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.familyName" />}
            maxLength={255}
            name="asdf"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.givenName" />}
            maxLength={255}
            name="asdf"
          />
        </Col>
        <Col xs={3} />
      </Row>

      <Row end="xs">
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.mainEmail" />}
            maxLength={255}
            name="asdf"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.phone" />}
            maxLength={255}
            name="asdf"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.mobile" />}
            maxLength={255}
            name="asdf"
          />
        </Col>
        <Col xs={3} />
      </Row>

      <Row>
        <Col xs>
          <OtherEmailFieldArray name="requestContactOtherEmail" />
        </Col>
      </Row>

      <Row>
        <Col xs>
          <Headline margin="small" size="large" tag="h3">
            <FormattedMessage id="ui-oa.publicationRequest.streetAddresses" />
          </Headline>
        </Col>
      </Row>

      <Row>
        <Col xs>
          <StreetAddressesFieldArray name="requestContactStreetAddresses" section="request contact" />
        </Col>
      </Row>
    </Accordion>
  );
};

export default RequestContact;
