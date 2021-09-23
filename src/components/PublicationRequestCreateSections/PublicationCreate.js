import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';

import {
  Accordion,
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
  const { values } = useFormState();
  const { 0: { values: publicationTypeValues = [] } = {} } = useRefdata({ desc: 'PublicationRequest.PublicationType', endpoint: 'oa/refdata' });
  const { 0: { values: subtypeValues = [] } = {} } = useRefdata({ desc: 'PublicationRequest.Subtype', endpoint: 'oa/refdata' });
  const { 0: { values: publisherValues = [] } = {} } = useRefdata({ desc: 'PublicationRequest.Publisher', endpoint: 'oa/refdata' });
  const { 0: { values: licenseValues = [] } = {} } = useRefdata({ desc: 'PublicationRequest.License', endpoint: 'oa/refdata' });
  const { 0: { values: oaStatusValues = [] } = {} } = useRefdata({ desc: 'PublicationRequest.OaStatus', endpoint: 'oa/refdata' });
  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.publication" />}
    >
      <Row bottom="xs" start="xs">
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.doi" />}
            name="doi"
          />
        </Col>
        <Col xs={9} />
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
            dataOptions={[{ value: '', label: '' }, ...subtypeValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.subtype" />}
            name="subtype"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...publisherValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.publisher" />}
            name="publisher"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...licenseValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.license" />}
            name="license"
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
            name="authorNames"
          />
        </Col>
      </Row>

      <Row end="xs">
        <Col xs={6}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.publicationUrl" />}
            name="publicationUrl"
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.localReference" />}
            name="localReference"
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

      {values.publicationType === 'journal_article' &&
        <div>
          <Row>
            <Col xs>
              <Headline margin="small" size="large" tag="h3">
                <FormattedMessage id="ui-oa.publicationRequest.journalDetails" />
              </Headline>
            </Col>
          </Row>

          <Row end="xs">
            <Col xs={6}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.publicationRequest.journalTitle" />}
                name="journalTitle"
              />
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.publicationRequest.issnPrint" />}
                name="issnPrint"
              />
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.publicationRequest.issnElectronic" />}
                name="issnElectronic"
              />
            </Col>
          </Row>

          <Row end="xs">
            <Col xs={3}>
              <Field
                component={Select}
                dataOptions={[{ value: '', label: '' }, ...oaStatusValues]}
                label={<FormattedMessage id="ui-oa.publicationRequest.oaStatus" />}
                name="oaStatus"
              />
            </Col>
            <Col xs={9} />
          </Row>
        </div>
      }

      {values.publicationType === 'book' &&
        <div>
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
                name="publicationYear"
              />
            </Col>
            <Col xs={3}>
              <Field
                component={TextField}
                label={<FormattedMessage id="ui-oa.publicationRequest.publicationPlace" />}
                name="publicationPlace"
              />
            </Col>
            <Col xs={6} />
          </Row>
        </div>
      }

    </Accordion>
  );
};

export default PublicationCreate;
