import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Col,
  Headline,
  KeyValue,
  NoValue,
  Row
} from '@folio/stripes/components';

import { findIdentifierByNamespace } from '../../util/journalUtils';

const propTypes = {
  journal: PropTypes.object
};

const JournalDetails = ({ journal }) => {
  const issn = findIdentifierByNamespace(journal, 'issn');
  return (
    <div>
      <Row start="xs">
        <Col xs={12}>
          <Headline margin="small" size="large" tag="h5">
            <FormattedMessage id="ui-oa.publicationRequest.journalDetails" />
          </Headline>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationJournal.title" />}>
            {journal?.title ?? <NoValue />}
          </KeyValue>
        </Col>
      </Row>
      <Row start="xs">
        {/* <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationRequest.issnPrint" />}>
          {journal?.issn?? <NoValue />}
          </KeyValue>
        </Col> */}
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-oa.publicationJournal.issn" />}>
            {issn?.value ?? <NoValue />}
          </KeyValue>
        </Col>
      </Row>
    </div>
  );
};

JournalDetails.propTypes = propTypes;

export default JournalDetails;
