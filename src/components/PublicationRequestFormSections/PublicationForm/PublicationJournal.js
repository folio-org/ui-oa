/* eslint-disable import/no-unresolved */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';

import {
  Col,
  Headline,
  Row,
  Select,
  TextField,
  Checkbox,
} from '@folio/stripes/components';
import {
  generateKiwtQuery,
  QueryTypedown,
} from '@k-int/stripes-kint-components';

import { EditCard } from '@folio/stripes-erm-components';

import useOARefdata from '../../../util/useOARefdata';
import selectifyRefdata from '../../../util/selectifyRefdata';
import JournalDetails from '../../PublicationRequestSections/JournalDetails';
import PartyInfo from '../../PublicationRequestSections/PartyInfo';


// @TODO
// Placeholdsers for journal title etc. replace with title, ISSN Print and Elec.
// Change path to endpoint for Journal Entries
// Change onChange Function
// useFormState?

const [
  OA_STATUS
] = [
  'PublicationRequest.OaStatus'
];

const PublicationJournal = () => {
  const refdataValues = useOARefdata([
    OA_STATUS
  ]);

  const oaStatusValues = selectifyRefdata(refdataValues, OA_STATUS);
  const { values } = useFormState();
  const { change } = useForm();

  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      // searchKey:"journalTitle"
      { searchKey: 'familyName', stats: false },
      { query: input }
    );
    return `${path}${query}`;
  };

  const renderListItem = (journal) => {
    return (
      <>
        {/* {journal.journalTitle} -
        ISSN (Print): {journal.issnPrint} -
        ISSN (Electronic): {journal.issnElectronic} -
        OA Status: {journal.oaStatus} */}
        {journal.title} - ISSN (Print): {journal.familyName} - ISSN (Electronic):{journal.givenNames}
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
            // path="oa/titleInstances"
            path="oa/party"
            pathMutator={pathMutator}
            renderListItem={renderListItem}
          />
        </Col>
      </Row>

      {values.selectJournal?.journal &&
        <EditCard
          header={<FormattedMessage id="ui-oa.publicationRequest.selectedJournal" />}
        >
          {/* <JournalDetails request={} /> */}
          <PartyInfo party={values.selectJournal.journal} />
        </EditCard>
      }
    </>
  );
};

export default PublicationJournal;
