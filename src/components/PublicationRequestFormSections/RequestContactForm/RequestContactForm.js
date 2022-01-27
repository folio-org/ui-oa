import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';
import {
  Accordion,
  Checkbox,
  Col,
  Label,
  Row,
  Layout,
  Button,
} from '@folio/stripes/components';
import {
  generateKiwtQuery,
  QueryTypedown,
} from '@k-int/stripes-kint-components';

import { EditCard } from '@folio/stripes-erm-components';

import PartyInfo from '../../PublicationRequestSections/PartyInfo';
import PartyModal from '../../PartyModal';
import css from './RequestContactForm.css';

const RequestContactForm = () => {
  const { change } = useForm();
  const { values } = useFormState();
  const [showPartyModal, setShowPartyModal] = useState(false);

  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      {
        searchKey: 'familyName',
        stats: false,
      },
      {
        query: input,
      }
    );
    return `${path}${query}`;
  };

  const handlePartyChange = (party) => {
    change('requestContact.partyOwner', party);
  };

  const renderFooter = () => {
    return (
      <Layout className="textCentered">
        <Button
          buttonStyle="primary"
          marginBottom0
          onClick={() => setShowPartyModal(true)}
        >
          <FormattedMessage id="ui-oa.publicationRequest.createPerson" />
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

  return (
    <>
      <Accordion
        label={
          <FormattedMessage id="ui-oa.publicationRequest.requestContact" />
        }
      >
        <Row end="xs">
          <Col xs={3}>
            <Field
              component={Checkbox}
              label={
                <FormattedMessage id="ui-oa.publicationRequest.useCorrespondingAuthor" />
              }
              name="useCorrespondingAuthor"
              onChange={(e) => {
                if (e.target.checked) {
                  change(
                    'requestContact.partyOwner',
                    values.correspondingAuthor?.partyOwner
                  );
                } else {
                  change('requestContact.partyOwner', undefined);
                }

                change('useCorrespondingAuthor', e.target.checked);
              }}
              type="checkbox"
            />
          </Col>
          <Col xs={9} />
        </Row>
        {!values.useCorrespondingAuthor && (
          <>
            <Label className={css.partyFormLabel}>
              <FormattedMessage id="ui-oa.publicationRequest.person" />
            </Label>
            <Field
              component={QueryTypedown}
              name="requestContact.partyOwner"
              path="oa/party"
              pathMutator={pathMutator}
              renderFooter={renderFooter}
              renderListItem={renderListItem}
            />
          </>
        )}

        {values.requestContact?.partyOwner && (
          <EditCard
            className={css.partyCard}
            header={
              <FormattedMessage id="ui-oa.publicationRequest.requestContact" />
            }
          >
            <PartyInfo party={values.requestContact.partyOwner} />
          </EditCard>
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

export default RequestContactForm;
