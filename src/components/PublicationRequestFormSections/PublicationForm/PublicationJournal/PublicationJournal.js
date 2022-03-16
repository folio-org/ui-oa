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
            label={<FormattedMessage id="ui-oa.publicationRequest.addJournal" />}
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
            <IconButton icon="trash" onClick={() => handleWorkChange()} />
          }
          headerStart={<AppIcon size="small">{renderJournalLink()}</AppIcon>}
        >
          <JournalDetails journal={values?.work} />
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
