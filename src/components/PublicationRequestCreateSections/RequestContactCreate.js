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

import OtherEmailFieldArray from './FieldArrays/OtherEmailFieldArray';
import StreetAddressesFieldArray from './FieldArrays/StreetAddressesFieldArray';

const RequestContactCreate = () => {
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
            name="requestContact.title"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.familyName" />}
            maxLength={255}
            name="requestContact.familyName"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.givenName" />}
            maxLength={255}
            name="requestContact.givenName"
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
            name="requestContact.mainEmail"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.phone" />}
            maxLength={255}
            name="requestContact.phone"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.mobile" />}
            maxLength={255}
            name="requestContact.mobile"
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

export default RequestContactCreate;
