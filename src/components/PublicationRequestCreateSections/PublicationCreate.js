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
import { useRefdata } from '@k-int/stripes-kint-components';
import IdentifiersFieldArray from './FieldArrays/IdentifiersFieldArray';

const PublicationCreate = () => {
  const { 0: { values: publicationTypeValues = [] } = {} } = useRefdata({ desc: 'PublicationRequest.PublicationType', endpoint: 'oa/refdata' });

  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.publication" />}
    >
      <Row bottom="xs" start="xs">
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
        <Col xs={3} />
        <Col xs={3} />
      </Row>

      <Row end="xs">
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...publicationTypeValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.publicationType" />}
            name="publicationType"
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
            name="publicationTitle"
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
          <Headline margin="small" size="large" tag="h3">
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
        <Col xs={9} />
      </Row>

      <Row>
        <Col xs>
          <Headline margin="small" size="large" tag="h3">
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
        <Col xs={6} />
      </Row>
    </Accordion>
  );
};

export default PublicationCreate;
