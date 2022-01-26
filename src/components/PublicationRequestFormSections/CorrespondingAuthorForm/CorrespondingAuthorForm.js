import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';
import { Accordion, Button, Label } from '@folio/stripes/components';
import {
  generateKiwtQuery,
  QueryTypedown,
} from '@k-int/stripes-kint-components';
import { EditCard } from '@folio/stripes-erm-components';
import PartyInfo from '../../PublicationRequestSections/PartyInfo';
import css from './CorrespondingAuthorForm.css';
import PartyModal from '../../PartyModal';

const CorrespondingAuthorForm = () => {
  const { values } = useFormState();
  const [showPartyModal, setShowPartyModal] = useState(false);

  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      {
        searchKey: 'fullName',
        stats: false,
      },
      {
        query: input,
      }
    );
    return `${path}${query}`;
  };

  const renderFooter = () => {
    return (
      <Button onClick={() => setShowPartyModal(true)}>
        <FormattedMessage id="ui-oa.publicationRequest.createPerson" />
      </Button>
    );
  };

  const renderListItem = (party) => {
    return (
      <>
        {party.title} {party.familyName}, {party.givenNames} - {party.orcidId} -{' '}
        {party.mainEmail}
      </>
    );
  };

  return (
    <>
      <Accordion
        label={
          <FormattedMessage id="ui-oa.publicationRequest.correspondingAuthor" />
        }
      >
        <Label className={css.partyFormLabel}>
          <FormattedMessage id="ui-oa.publicationRequest.addPerson" />
        </Label>
        <Field
          component={QueryTypedown}
          name="correspondingAuthor.partyOwner"
          path="oa/party"
          pathMutator={pathMutator}
          renderFooter={renderFooter}
          renderListItem={renderListItem}
        />
        {values.correspondingAuthor?.partyOwner && (
          <EditCard
            className={css.partyCard}
            header={
              <FormattedMessage id="ui-oa.publicationRequest.correspondingAuthor" />
            }
          >
            <PartyInfo party={values.correspondingAuthor.partyOwner} />
          </EditCard>
        )}
      </Accordion>
      <PartyModal setShowModal={setShowPartyModal} showModal={showPartyModal} />
    </>
  );
};

export default CorrespondingAuthorForm;
