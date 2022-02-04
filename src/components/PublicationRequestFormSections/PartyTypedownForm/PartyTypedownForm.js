import { useState } from 'react';
import PropTypes from 'prop-types';
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
  Row,
  Col,
  Checkbox,
} from '@folio/stripes/components';
import {
  generateKiwtQuery,
  QueryTypedown,
} from '@k-int/stripes-kint-components';
import { AppIcon } from '@folio/stripes/core';
import PartyInfo from '../../PartySections/PartyInfo';
import urls from '../../../util/urls';
import css from './PartyTypedownForm.css';
import PartyModal from '../../PartyModal';

const propTypes = {
  formName: PropTypes.string.isRequired,
};

const PartyTypedownForm = ({ formName }) => {
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
    change(`${formName}.partyOwner`, party);
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
        {party?.title} {party?.familyName + ','} {party?.givenNames}
        {party?.orcidId && ' - ' + party.orcidId}
        {party?.mainEmail && ' - ' + party.mainEmail}
      </>
    );
  };

  const renderPartyLink = () => {
    return values[formName]?.partyOwner?.id ? (
      <Link to={urls.party(values[formName].partyOwner.id)}>
        <strong>{values[formName]?.partyOwner?.fullName}</strong>
      </Link>
    ) : (
      <strong>{values[formName]?.partyOwner?.fullName}</strong>
    );
  };

  return (
    <>
      <Accordion
        label={<FormattedMessage id={`ui-oa.publicationRequest.${formName}`} />}
      >
        <Row end="xs">
          <Col xs={3}>
            {formName === 'requestContact' && (
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
                      values[formName]?.partyOwner
                    );
                  } else {
                    change('requestContact.partyOwner', undefined);
                  }

                  change('useCorrespondingAuthor', e.target.checked);
                }}
                type="checkbox"
              />
            )}
          </Col>
          <Col xs={9} />
        </Row>
        {(!values.useCorrespondingAuthor ||
          formName === 'correspondingAuthor') && (
          <>
            <Label className={css.partyFormLabel}>
              <FormattedMessage id="ui-oa.publicationRequest.addPerson" />
            </Label>
            <Field
              component={QueryTypedown}
              name={`${formName}.partyOwner`}
              path="oa/party"
              pathMutator={pathMutator}
              renderFooter={renderFooter}
              renderListItem={renderListItem}
            />
          </>
        )}

        {values[formName]?.partyOwner && (
          <Card
            cardStyle="positive"
            headerEnd={
              (!values.useCorrespondingAuthor ||
                formName === 'correspondingAuthor') && (
                <IconButton icon="trash" onClick={() => handlePartyChange()} />
              )
            }
            headerStart={<AppIcon size="small">{renderPartyLink()}</AppIcon>}
          >
            <PartyInfo compact party={values[formName].partyOwner} />
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

PartyTypedownForm.propTypes = propTypes;

export default PartyTypedownForm;
