import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';
import { Link } from 'react-router-dom';

import {
  Accordion,
  Button,
  Label,
  Layout,
  Card,
  IconButton,
} from '@folio/stripes/components';
import {
  generateKiwtQuery,
  QueryTypedown,
} from '@k-int/stripes-kint-components';
import { AppIcon } from '@folio/stripes/core';
import PartyInfo from '../../PartySections/PartyInfo';
import urls from '../../../util/urls';
import css from './CorrespondingAuthorForm.css';
import PartyModal from '../../PartyModal';

const CorrespondingAuthorForm = () => {
  const { values } = useFormState();
  const { change } = useForm();
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

  const handlePartyChange = (party) => {
    change('correspondingAuthor.partyOwner', party);
  };

  const renderFooter = () => {
    return (
      <Layout className="textCentered">
        <Button
          buttonStyle="primary"
          marginBottom0
          onClick={() => setShowPartyModal(true)}
        >
          <FormattedMessage id="ui-oa.publicationRequest.newPerson" />
        </Button>
      </Layout>
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

  const renderPartyLink = () => {
    return values.correspondingAuthor?.partyOwner?.id ? (
      <Link to={urls.party(values.correspondingAuthor.partyOwner.id)}>
        <strong>{values.correspondingAuthor?.partyOwner?.fullName}</strong>
      </Link>
    ) : (
      <strong>{values.correspondingAuthor?.partyOwner?.fullName}</strong>
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
          <Card
            cardStyle="positive"
            headerEnd={
              <IconButton icon="trash" onClick={() => handlePartyChange()} />
            }
            headerStart={<AppIcon size="small">{renderPartyLink()}</AppIcon>}
          >
            <PartyInfo party={values.correspondingAuthor.partyOwner} />
          </Card>
        )}
      </Accordion>
      <PartyModal
        handlePartyChange={handlePartyChange}
        setShowModal={setShowPartyModal}
        showModal={showPartyModal}
      />
    </>
  );
};

export default CorrespondingAuthorForm;
