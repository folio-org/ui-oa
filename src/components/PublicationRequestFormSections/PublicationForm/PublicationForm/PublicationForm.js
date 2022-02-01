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
import { IdentifiersFieldArray } from '../../FieldArrays';
import useOARefdata from '../../../../util/useOARefdata';
import selectifyRefdata from '../../../../util/selectifyRefdata';

import PublicationJournal from '../PublicationJournal';
import PublicationBook from '../PublicationBook';

const [
  PUBLICATION_TYPE,
  PUBLISHER,
  SUBTYPE,
  LICENSE,
 ] = [
  'PublicationRequest.PublicationType',
  'PublicationRequest.Publisher',
  'PublicationRequest.Subtype',
  'PublicationRequest.License',
];

const PublicationForm = () => {
  const { values } = useFormState();

  const refdataValues = useOARefdata([
    PUBLICATION_TYPE,
    PUBLISHER,
    SUBTYPE,
    LICENSE
   ]);

  const publicationTypeValues = selectifyRefdata(refdataValues, PUBLICATION_TYPE);
  const publisherValues = selectifyRefdata(refdataValues, PUBLISHER);
  const subtypeValues = selectifyRefdata(refdataValues, SUBTYPE);
  const licenseValues = selectifyRefdata(refdataValues, LICENSE);

  const getRDVId = (desc, value) => {
    // First filter by desc
    const refdataDescValues = refdataValues?.find(rdc => rdc.desc === desc);
    // Then grab the values and filter by value
    const refdataValue = refdataDescValues?.values?.find(rdv => rdv.value === value);
    // At this point we have the refdataValue object, which is an id, a value and a label (or undefined).
    // Return the id
    return refdataValue?.id;
  };

  const bookId = getRDVId(PUBLICATION_TYPE, 'book');
  const journalArticleId = getRDVId(PUBLICATION_TYPE, 'journal_article');

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
            name="publicationType.id"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...subtypeValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.subtype" />}
            name="subtype.id"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...publisherValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.publisher" />}
            name="publisher.id"
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...licenseValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.license" />}
            name="license.id"
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

      <Row middle="xs">
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

      {values.publicationType?.id === journalArticleId &&
        <PublicationJournal />
      }

      {values.publicationType?.id === bookId &&
        <PublicationBook />
      }

    </Accordion>
  );
};

export default PublicationForm;
