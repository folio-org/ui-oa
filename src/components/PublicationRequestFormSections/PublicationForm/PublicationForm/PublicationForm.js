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
import getRDVId from '../../../../util/getRDVId';

import PublicationJournal from '../PublicationJournal';
import PublicationBook from '../PublicationBook';
import { MAX_CHAR_LONG, MAX_CHAR_SHORT } from '../../../../constants/config';
import { validateURL } from '../../../../util/validators';

const [PUBLICATION_TYPE, PUBLISHER, SUBTYPE, LICENSE] = [
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
    LICENSE,
  ]);

  const publicationTypeValues = selectifyRefdata(
    refdataValues,
    PUBLICATION_TYPE
  );
  const publisherValues = selectifyRefdata(refdataValues, PUBLISHER);
  const subtypeValues = selectifyRefdata(refdataValues, SUBTYPE);
  const licenseValues = selectifyRefdata(refdataValues, LICENSE);

  const bookId = getRDVId(refdataValues, PUBLICATION_TYPE, 'book');
  const journalArticleId = getRDVId(
    refdataValues,
    PUBLICATION_TYPE,
    'journal_article'
  );

  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.publication" />}
    >
      <Row bottom="xs" start="xs">
        <Col xs={3}>
          <Field
            component={TextField}
            label={<FormattedMessage id="ui-oa.publicationRequest.doi" />}
            maxLength={MAX_CHAR_SHORT}
            name="doi"
            parse={(v) => v}
          />
        </Col>
        <Col xs={9} />
      </Row>

      <Row end="xs">
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...publicationTypeValues]}
            label={
              <FormattedMessage id="ui-oa.publicationRequest.publicationType" />
            }
            name="publicationType.id"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...subtypeValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.subtype" />}
            name="subtype.id"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...publisherValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.publisher" />}
            name="publisher.id"
            parse={(v) => v}
          />
        </Col>
        <Col xs={3}>
          <Field
            component={Select}
            dataOptions={[{ value: '', label: '' }, ...licenseValues]}
            label={<FormattedMessage id="ui-oa.publicationRequest.license" />}
            name="license.id"
            parse={(v) => v}
          />
        </Col>
      </Row>

      <Row end="xs">
        <Col xs={6}>
          <Field
            component={TextArea}
            label={
              <FormattedMessage id="ui-oa.publicationRequest.publicationTitle" />
            }
            maxLength={MAX_CHAR_LONG}
            name="publicationTitle"
            parse={(v) => v}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextArea}
            label={
              <FormattedMessage id="ui-oa.publicationRequest.authorNames" />
            }
            maxLength={MAX_CHAR_LONG}
            name="authorNames"
            parse={(v) => v}
          />
        </Col>
      </Row>

      <Row end="xs">
        <Col xs={6}>
          <Field
            component={TextField}
            label={
              <FormattedMessage id="ui-oa.publicationRequest.publicationUrl" />
            }
            maxLength={MAX_CHAR_LONG}
            name="publicationUrl"
            parse={(v) => v}
            validate={validateURL}
          />
        </Col>
        <Col xs={6}>
          <Field
            component={TextField}
            label={
              <FormattedMessage id="ui-oa.publicationRequest.localReference" />
            }
            maxLength={MAX_CHAR_SHORT}
            name="localReference"
            parse={(v) => v}
          />
        </Col>
      </Row>

      <Row middle="xs">
        <Col xs>
          <Headline margin="small" size="large" tag="h3">
            <FormattedMessage id="ui-oa.identifiers.otherIdentifiers" />
          </Headline>
        </Col>
      </Row>

      <Row>
        <Col xs>
          <IdentifiersFieldArray />
        </Col>
      </Row>

      {values.publicationType?.id === journalArticleId && (
        <PublicationJournal />
      )}

      {values.publicationType?.id === bookId && <PublicationBook />}
    </Accordion>
  );
};

export default PublicationForm;
