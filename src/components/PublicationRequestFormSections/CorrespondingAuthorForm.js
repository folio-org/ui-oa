import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';
import {
  Accordion,
  Col,
  Headline,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import OtherEmailFieldArray from './FieldArrays/OtherEmailFieldArray';
import AffiliationFieldArray from './FieldArrays/AffiliationFieldArray';
import StreetAddressesFieldArray from './FieldArrays/StreetAddressesFieldArray';

const CorrespondingAuthorForm = () => {
  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.correspondingAuthor" />}
    >
      <Row end="xs">
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[]}
            label={<FormattedMessage id="ui-oa.publicationRequest.title" />}
            name="correspondingAuthor.title"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.familyName" />}
            maxLength={255}
            name="correspondingAuthor.familyName"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.givenName" />}
            maxLength={255}
            name="correspondingAuthor.givenNames"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.orcidId" />}
            maxLength={255}
            name="correspondingAuthor.orcidId"
          />
        </Col>
      </Row>

      <Row>
        <Col xs>
          {/* TODO: Author Lookup Button */}
        </Col>
      </Row>

      <Row end="xs">
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.mainEmail" />}
            maxLength={255}
            name="correspondingAuthor.mainEmail"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.phone" />}
            maxLength={255}
            name="correspondingAuthor.phone"
          />
        </Col>
        <Col xs={3}>
          <Field
            autoFocus
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.mobile" />}
            maxLength={255}
            name="correspondingAuthor.mobile"
          />
        </Col>
        <Col xs={3} />
      </Row>

      <Row>
        <Col xs>
          <OtherEmailFieldArray name="correspondingAuthorOtherEmail" />
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
          <StreetAddressesFieldArray name="correspondingAuthorStreetAddress" section="corresponding author" />
        </Col>
      </Row>

      <Row>
        <Col xs>
          <Headline margin="small" size="large" tag="h3">
            <FormattedMessage id="ui-oa.publicationRequest.affiliations" />
          </Headline>
        </Col>
      </Row>

      <Row>
        <Col xs>
          <AffiliationFieldArray />
        </Col>
      </Row>

    </Accordion>
  );
};

export default CorrespondingAuthorForm;