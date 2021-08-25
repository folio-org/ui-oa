import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Accordion,
  Button,
  Col,
  Headline,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import IdentifiersFieldArray from './fieldArrays/identifiersFieldArray';

const Publication = () => {
  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.publication" />}
    >
      <Row start="xs" bottom="xs">
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[]}
            label={<FormattedMessage id="ui-oa.publicationRequest.doi" />}
            name="asdf"
          />
        </Col>
        <Col xs={3}>
          <Button>
            <FormattedMessage id="ui-oa.publicationRequest.lookupPublication" />
          </Button>
        </Col>
        <Col xs={3}>
        </Col>
        <Col xs={3}>
        </Col>
      </Row>

      <Row end="xs">
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[]}
            label={<FormattedMessage id="ui-oa.publicationRequest.publicationType" />}
            name="asdf"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[]}
            label={<FormattedMessage id="ui-oa.publicationRequest.subtype" />}
            name="asdf"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[]}
            label={<FormattedMessage id="ui-oa.publicationRequest.publisher" />}
            name="asdf"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[]}
            label={<FormattedMessage id="ui-oa.publicationRequest.license" />}
            name="asdf"
          />
        </Col>
      </Row>

      <Row end="xs">
        <Col xs={6}>
          <Field
            component={TextArea}
            label={<FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />}
            name="asdf"
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextArea}
            label={<FormattedMessage id="ui-oa.publicationRequest.authorNames" />}
            name="asdf"
          />
        </Col>
      </Row>

      <Row end="xs">
        <Col xs={6}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.publicationUrl" />}
            name="asdf"
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.localReference" />}
            name="asdf"
          />
        </Col>
      </Row>

      <Row>
        <Col xs>
          <Headline size="large" margin="small" tag="h3">
            <FormattedMessage id="ui-oa.publicationRequest.identifiers" />
          </Headline>
        </Col>
      </Row>

      <Row>
        <Col xs>
          <IdentifiersFieldArray />
        </Col>
      </Row>

      <Row end="xs">
        <Col xs={6}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.journalTitle" />}
            name="asdf"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.issnPrint" />}
            name="asdf"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.issnElectronic" />}
            name="asdf"
          />
        </Col>
      </Row>


      <Row end="xs">
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[]}
            label={<FormattedMessage id="ui-oa.publicationRequest.oaStatus" />}
            name="asdf"
          />
        </Col>
        <Col xs={9}>
        </Col>
      </Row>

      <Row>
        <Col xs>
          <Headline size="large" margin="small" tag="h3">
            <FormattedMessage id="ui-oa.publicationRequest.bookDetails" />
          </Headline>
        </Col>
      </Row>

      <Row end="xs">
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.publicationYear" />}
            name="asdf"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.publicationPlace" />}
            name="asdf"
          />
        </Col>
        <Col xs={6}>
        </Col>
      </Row>
    </Accordion>

  )
}

export default Publication;