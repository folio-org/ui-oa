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
import { findIdentifierByNamespace, findSubtypeByNamespace } from '../../../util/journalUtils';


const PublicationJournal = () => {
  const { values } = useFormState();

  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      { searchKey: 'title', stats: false },
      { query: input }
    );
    return `${path}${query}`;
  };

  const renderListItem = (journal) => {
    console.log("Original Journal: %o" , journal);
   
    const printInstance = findSubtypeByNamespace(journal, 'print');
    const printIssn = findIdentifierByNamespace(printInstance, 'issn');

    const electronicInstance = findSubtypeByNamespace(journal, 'electronic');
    const electronicIssn = findIdentifierByNamespace(electronicInstance, 'issn');
    console.log("Found Instance: %o" ,printIssn);

    return (
      <FormattedMessage
        id="ui-oa.publicationJournal.typedown"
        values={{ title: journal.title, printIssn: printIssn?.value || "", electronicIssn: electronicIssn?.value || "" }}
      />
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
            name="journal"
            path="oa/works"
            pathMutator={pathMutator}
            renderListItem={renderListItem}
          />
        </Col>
      </Row>

      {values.journal &&
        <EditCard header={<FormattedMessage id="ui-oa.publicationRequest.selectedJournal" />}>
          <JournalDetails journal={values.journal} />
        </EditCard>
      }
    </>
  );
};

export default PublicationJournal;
