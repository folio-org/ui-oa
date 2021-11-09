import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';
import {
  Accordion,
  Label,
} from '@folio/stripes/components';
import { generateKiwtQuery } from '@k-int/stripes-kint-components';
import QueryTypedown from '@k-int/stripes-kint-components/src/lib/QueryTypedown';
import { EditCard } from '@folio/stripes-erm-components';
import PartyInfo from '../../PublicationRequestSections/PartyInfo';
import css from './CorrespondingAuthorForm.css';

const CorrespondingAuthorForm = () => {
  const { values } = useFormState();

  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      {
        searchKey: 'fullName',
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
      <Label className={css.partyFormLabel}>
        <FormattedMessage id="ui-oa.publicationRequest.person" />
      </Label>
      <Field
        component={QueryTypedown}
        name="correspondingAuthor.partyOwner"
        path="oa/party"
        pathMutator={pathMutator}
        renderListItem={renderListItem}
      />
      {values.correspondingAuthor?.partyOwner &&
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
