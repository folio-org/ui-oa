import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Col,
  Headline,
  Row,
  TextField,
} from '@folio/stripes/components';

const PublicationBook = () => {
  return (
    <>
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
    </>
  );
};

export default PublicationBook;
