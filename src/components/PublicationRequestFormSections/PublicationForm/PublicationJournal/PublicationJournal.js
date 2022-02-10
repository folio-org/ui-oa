/* eslint-disable import/no-unresolved */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';
import { Link } from 'react-router-dom';

import {
  Col,
  Headline,
  Row,
  Card,
  IconButton,
} from '@folio/stripes/components';
import {
  generateKiwtQuery,
  QueryTypedown,
} from '@k-int/stripes-kint-components';
import { AppIcon } from '@folio/stripes/core';

import { JournalDetails } from '../../../PublicationRequestSections/PublicationType';
import { findIssnByNamespace } from '../../../../util/journalUtils';
import urls from '../../../../util/urls';

const PublicationJournal = () => {
  const { values } = useFormState();
  const { change } = useForm();

  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      { searchKey: 'title', stats: false },
      { query: input }
    );
    return `${path}${query}`;
  };

  const handleJournalChange = (journal) => {
    change('journal', journal);
  };

  const renderListItem = (journal) => {
    const printIssn = findIssnByNamespace(journal, 'print');
    const electronicIssn = findIssnByNamespace(journal, 'electronic');

    return (
      <FormattedMessage
        id="ui-oa.publicationJournal.typedown"
        values={{
          title: journal.title,
          printIssn: printIssn?.value || '',
          electronicIssn: electronicIssn?.value || '',
        }}
      />
    );
  };

  const renderJournalLink = () => {
    return values?.journal.id ? (
      <Link to={urls.journal(values.journal.id)}>
        <strong>{values?.journal?.title}</strong>
      </Link>
    ) : (
      <strong>{values?.journal?.title}</strong>
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
            label={
              <FormattedMessage id="ui-oa.publicationRequest.journalTitle" />
            }
            name="journal"
            path="oa/works"
            pathMutator={pathMutator}
            renderListItem={renderListItem}
          />
        </Col>
      </Row>

      {values.journal && (
        <Card
          cardStyle="positive"
          headerEnd={
            <IconButton icon="trash" onClick={() => handleJournalChange()} />
          }
          headerStart={<AppIcon size="small">{renderJournalLink()}</AppIcon>}
        >
          <JournalDetails journal={values?.journal} />
        </Card>
      )}
    </>
  );
};

export default PublicationJournal;
