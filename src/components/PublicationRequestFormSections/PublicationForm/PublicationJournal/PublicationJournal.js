import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';
import { Link } from 'react-router-dom';

import {
  Col,
  Headline,
  Row,
  Card,
  IconButton,
  Layout,
  Button,
  Tooltip,
} from '@folio/stripes/components';
import {
  generateKiwtQuery,
  QueryTypedown,
} from '@k-int/stripes-kint-components';
import { AppIcon } from '@folio/stripes/core';

import { JournalModal } from '../../../Modals';
import { JournalDetails } from '../../../PublicationRequestSections/PublicationType';
import { findIssnByNamespace } from '../../../../util/journalUtils';
import urls from '../../../../util/urls';
import css from './PublicationJournal.css';

const PublicationJournal = () => {
  const { values } = useFormState();
  const { change } = useForm();
  const [showJournalModal, setShowJournalModal] = useState(false);

  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      { searchKey: 'title', stats: false },
      { query: input }
    );
    return `${path}${query}`;
  };

  const handleWorkChange = (work) => {
    change('work', work);
  };

  const renderFooter = () => {
    return (
      <Layout className="textCentered">
        <Button
          buttonStyle="primary"
          marginBottom0
          onClick={() => setShowJournalModal(true)}
        >
          <FormattedMessage id="ui-oa.journal.newJournal" />
        </Button>
      </Layout>
    );
  };

  const renderListItem = (work) => {
    const printIssn = findIssnByNamespace(work, 'print');
    const electronicIssn = findIssnByNamespace(work, 'electronic');

    return (
      <FormattedMessage
        id="ui-oa.publicationJournal.typedown"
        values={{
          title: work.title,
          printIssn: printIssn?.value || '',
          electronicIssn: electronicIssn?.value || '',
        }}
      />
    );
  };

  const renderJournalLink = () => {
    return values?.work.id ? (
      <Link to={urls.journal(values?.work.id)}>
        <strong>{values?.work?.title}</strong>
      </Link>
    ) : (
      <strong>{values?.work?.title}</strong>
    );
  };

  const renderEndOFList = () => {
    return (
      <Layout className={css.endOfList}>
        <FormattedMessage id="ui-oa.journal.noResultsFound" />
      </Layout>
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
            endOfList={renderEndOFList()}
            label={
              <FormattedMessage id="ui-oa.publicationRequest.addJournal" />
            }
            name="work"
            path="oa/works"
            pathMutator={pathMutator}
            renderFooter={renderFooter}
            renderListItem={renderListItem}
          />
        </Col>
      </Row>

      {values?.work && (
        <Card
          cardStyle="positive"
          headerEnd={
            <Tooltip
              id="publication-journal-trash-button-tooltip"
              text={
                <FormattedMessage id="ui-oa.publicationRequest.removeJournal" />
              }
            >
              {({ ref, ariaIds }) => (
                <IconButton
                  ref={ref}
                  aria-describedby={ariaIds.sub}
                  aria-labelledby={ariaIds.text}
                  icon="trash"
                  onClick={() => handleWorkChange()}
                />
              )}
            </Tooltip>
          }
          headerStart={<AppIcon size="small">{renderJournalLink()}</AppIcon>}
        >
          <JournalDetails request={{ work: values?.work }} />
        </Card>
      )}
      <JournalModal
        handleJournalChange={handleWorkChange}
        setShowModal={setShowJournalModal}
        showModal={showJournalModal}
      />
    </>
  );
};

export default PublicationJournal;
