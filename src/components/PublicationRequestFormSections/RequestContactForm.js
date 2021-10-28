import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';
import {
  Accordion,
  Checkbox,
  Col,
  Row,
} from '@folio/stripes/components';
import { generateKiwtQuery, TypeDown } from '@k-int/stripes-kint-components';
import { EditCard } from '@folio/stripes-erm-components';

import PartyInfo from '../PublicationRequestSections/PartyInfo';

const RequestContactForm = () => {
  const { change } = useForm();
  const { values } = useFormState();

  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      {
        searchKey: 'familyName',
        stats: false
      }, {
      query: input,
    }
    );
    return `${path}${query}`;
  };

  const renderListItem = (party) => {
    return (
      <>
        {party.title} {party.familyName}, {party.givenNames} - {party.orcidId} - {party.mainEmail}
      </>
    );
  };

  const renderPartyInfo = (party) => {
    if (party)
      return <EditCard header={<FormattedMessage id="ui-oa.publicationRequest.requestContact" />}>
        <PartyInfo party={party} />
      </EditCard>
  };

  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.requestContact" />}
    >
      <Row end="xs">
        <Col xs={3}>
          <Field
            component={Checkbox}
            label={<FormattedMessage id="ui-oa.publicationRequest.useCorrespondingAuthor" />}
            onChange={e => {
              if (e.target.checked) change("requestContact", values.correspondingAuthor)
              else change("requestContact", undefined)
              change("useCorrespondingAuthor", e.target.checked)
            }}
            name="useCorrespondingAuthor"
            type="checkbox"
          />
        </Col>
        <Col xs={9} />
      </Row>

      {values.useCorrespondingAuthor ?
        renderPartyInfo(values.correspondingAuthor)
        :
        <Field
          component={TypeDown}
          name="requestContact"
          path="oa/party"
          pathMutator={pathMutator}
          renderListItem={renderListItem}
        />
      }
      {values.requestContact ? renderPartyInfo(values.requestContact) : <></>}

    </Accordion>
  );
};

export default RequestContactForm;
