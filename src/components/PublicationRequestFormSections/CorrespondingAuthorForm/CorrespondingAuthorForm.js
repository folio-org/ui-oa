import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';
import {
  Accordion,
  Label,
} from '@folio/stripes/components';
import { generateKiwtQuery, TypeDown } from '@k-int/stripes-kint-components';
import { EditCard } from '@folio/stripes-erm-components';
import PartyInfo from '../../PublicationRequestSections/PartyInfo';
import css from './CorrespondingAuthorForm.css';

const CorrespondingAuthorForm = () => {
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

  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.correspondingAuthor" />}
    >
      <Field
        initialValue="corresponding_author"
        name="correspondingAuthor.role"
        render={() => (null)}
      />
      <Label className={css.partyFormLabel}>
        <FormattedMessage id="ui-oa.publicationRequest.person" />
      </Label>
      <Field
        component={TypeDown}
        name="correspondingAuthor.partyOwner"
        path="oa/party"
        pathMutator={pathMutator}
        renderListItem={renderListItem}
      />
      {values.correspondingAuthor &&
        <EditCard
          className={css.partyCard}
          header={<FormattedMessage id="ui-oa.publicationRequest.correspondingAuthor" />}
        >
          <PartyInfo party={values.correspondingAuthor.partyOwner} />
        </EditCard>
      }
    </Accordion>
  );
};

export default CorrespondingAuthorForm;
