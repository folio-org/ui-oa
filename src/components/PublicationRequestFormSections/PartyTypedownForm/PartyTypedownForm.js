import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';
import { Link } from 'react-router-dom';

import {
  Accordion,
  Button,
  Layout,
  Card,
  IconButton,
  Row,
  Col,
  Checkbox,
  Tooltip,
  Select,
  TextField,
} from '@folio/stripes/components';
import {
  highlightString,
  generateKiwtQuery,
  QueryTypedown,
} from '@k-int/stripes-kint-components';
import { AppIcon } from '@folio/stripes/core';
import { requiredValidator } from '@folio/stripes-erm-components';
import PartyInfo from '../../PartySections/PartyInfo';
import urls from '../../../util/urls';
import css from './PartyTypedownForm.css';
import { PartyModal } from '../../Modals';
import { PARTIES_ENDPOINT } from '../../../constants/endpoints';
import { MAX_CHAR_LONG } from '../../../constants/config';
import { useOARefdata, selectifyRefdata } from '../../../util';

const propTypes = {
  formName: PropTypes.string.isRequired,
};

const PartyTypedownForm = ({ formName }) => {
  const { values } = useFormState();
  const { change } = useForm();
  const [showPartyModal, setShowPartyModal] = useState(false);
  const institutionLevel1Refdata = selectifyRefdata(useOARefdata('Party.InstitutionLevel1'));

  const pathMutator = (input, path) => {
    const query = generateKiwtQuery(
      {
        searchKey: 'familyName,givenNames',
        stats: false,
        sort: [{ path: 'familyName' }, { path: 'givenNames' }],
      },
      {
        query: input,
      }
    );
    return `${path}${query}`;
  };

  const handlePartyChange = (party) => {
    change(`${formName}.partyOwner`, party);
    if (formName === 'correspondingAuthor') {
      change('correspondingInstitutionLevel1.id', party?.institutionLevel1?.id);
      change('correspondingInstitutionLevel2', party?.institutionLevel2);
    }
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

  const renderListItem = (party, input) => {
    return (
      <>
        {party?.title} {highlightString(input, party?.familyName)}
        {', '}
        {highlightString(input, party?.givenNames)}
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

  const renderEndOFList = () => {
    return (
      <Layout className={css.endOfList}>
        <FormattedMessage id="ui-oa.party.noResultsFound" />
      </Layout>
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
            <Field
              component={QueryTypedown}
              endOfList={renderEndOFList()}
              id={`${formName}-typedown`}
              label={
                <FormattedMessage id="ui-oa.publicationRequest.addPerson" />
              }
              name={`${formName}.partyOwner`}
              onChange={(e) => handlePartyChange(e)}
              path={PARTIES_ENDPOINT}
              pathMutator={pathMutator}
              renderFooter={renderFooter}
              renderListItem={renderListItem}
            />
          </>
        )}

        {values[formName]?.partyOwner && (
          <>
            <Card
              cardStyle="positive"
              headerEnd={
                (!values.useCorrespondingAuthor ||
                  formName === 'correspondingAuthor') && (
                  <Tooltip
                    id={`${formName}-trash-button-tooltip`}
                    text={
                      <FormattedMessage
                        id={`ui-oa.publicationRequest.removeParty.${formName}`}
                      />
                    }
                  >
                    {({ ref, ariaIds }) => (
                      <IconButton
                        ref={ref}
                        aria-describedby={ariaIds.sub}
                        aria-labelledby={ariaIds.text}
                        icon="trash"
                        onClick={() => handlePartyChange()}
                      />
                    )}
                  </Tooltip>
                )
              }
              headerStart={
                <AppIcon app="oa" iconKey="party" size="small">
                  {renderPartyLink()}
                </AppIcon>
              }
              roundedBorder
            >
              <PartyInfo isCard party={values[formName].partyOwner} />
            </Card>
            {formName === 'correspondingAuthor' && (
              <Row>
                <Col xs={3}>
                  <Field
                    component={Select}
                    dataOptions={[{ value: '', label: '' }, ...institutionLevel1Refdata]}
                    id="publication-request-corresponding-institution-level-1"
                    label={
                      <FormattedMessage id="ui-oa.party.institutionLevelOne" />
                    }
                    name="correspondingInstitutionLevel1.id"
                    required
                    validate={requiredValidator}
                  />
                </Col>
                <Col xs={3}>
                  <Field
                    component={TextField}
                    id="publication-request-corresponding-institution-level-2"
                    label={
                      <FormattedMessage id="ui-oa.party.institutionLevelTwo" />
                    }
                    maxLength={MAX_CHAR_LONG}
                    name="correspondingInstitutionLevel2"
                    parse={(v) => v}
                  />
                </Col>
              </Row>
            )}
          </>
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
