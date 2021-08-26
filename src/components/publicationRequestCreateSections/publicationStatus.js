import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  Row,
} from '@folio/stripes/components';

import PublicationStatusFieldArray from './fieldArrays/publicationStatusFieldArray';

const PublicationStatus = () => {
  return (
    <Accordion label={<FormattedMessage id="ui-oa.publicationRequest.publicationStatus" />}>
      <Row>
        <Col xs>
          <PublicationStatusFieldArray />
        </Col>
      </Row>
    </Accordion>
  );
};

export default PublicationStatus;
