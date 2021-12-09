/* eslint-disable import/no-unresolved */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';

import {
  Col,
  Headline,
  Row,
} from '@folio/stripes/components';
import {
  generateKiwtQuery,
  QueryTypedown,
} from '@k-int/stripes-kint-components';

import { EditCard } from '@folio/stripes-erm-components';

import JournalDetails from '../../PublicationRequestSections/JournalDetails';


// @TODO
//Use correct path/endpoint to retrieve title,issn etc.

const PublicationJournal = () => {
  
  const { values } = useFormState();
  
  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      { searchKey: 'journalTitle', stats: false },
      { query: input }
    );
    return `${path}${query}`;
  };

  const renderListItem = (journal) => {
    return (
      <>
        Title: {journal.journalTitle} - 
        ISSN (Print): {journal.issnPrint} - 
        ISSN (Electronic): {journal.issnElectronic} - 
        OA Status: {journal.oaStatus}
      </>
    );
  };

  return (
    <>
      <Row>
        <Col xs>
          <Headline margin="small" size="large" tag="h3">
            <FormattedMessage id="ui-oa.publicationRequest.journalDetails" />
          </Headline>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Field
            component={QueryTypedown}
            label={<FormattedMessage id="ui-oa.publicationRequest.journalTitle" />}
            name="selectJournal.journal"
            path="oa/titleInstances"
            pathMutator={pathMutator}
            renderListItem={renderListItem}
          />
        </Col>
      </Row>

      {values.selectJournal?.journal &&
        <EditCard header={<FormattedMessage id="ui-oa.publicationRequest.selectedJournal" />}>
          <JournalDetails request={values.selectJournal.journal} />
        </EditCard>
      }
    </>
  );
};

export default PublicationJournal;
