import { FormattedMessage } from 'react-intl';
import { Field, useFormState, useForm } from 'react-final-form';
import {
  Accordion,
  Checkbox,
  Col,
  Label,
  Row,
} from '@folio/stripes/components';
import { generateKiwtQuery, TypeDown } from '@k-int/stripes-kint-components';
import { EditCard } from '@folio/stripes-erm-components';

import PartyInfo from '../../PublicationRequestSections/PartyInfo';
import css from './RequestContactForm.css';

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

  return (
    <Accordion
      label={<FormattedMessage id="ui-oa.publicationRequest.requestContact" />}
    >
      <Row end="xs">
        <Col xs={3}>
          <Field
            component={Checkbox}
            label={<FormattedMessage id="ui-oa.publicationRequest.useCorrespondingAuthor" />}
            name="useCorrespondingAuthor"
            onChange={e => {
              if (e.target.checked) change('requestContact.partyOwner', values.correspondingAuthor?.partyOwner);
              else change('requestContact.partyOwner', undefined);
              change('useCorrespondingAuthor', e.target.checked);
            }}
            type="checkbox"
          />
        </Col>
        <Col xs={9} />
      </Row>
      {!values.useCorrespondingAuthor &&
        <>
          <Label className={css.partyFormLabel}>
            <FormattedMessage id="ui-oa.publicationRequest.person" />
          </Label>
          <Field
            component={TypeDown}
            name="requestContact.partyOwner"
            path="oa/party"
            pathMutator={pathMutator}
            renderListItem={renderListItem}
          />
        </>
      }

      {values.requestContact?.partyOwner &&
        <EditCard
          className={css.partyCard}
          header={<FormattedMessage id="ui-oa.publicationRequest.requestContact" />}
        >
          <PartyInfo party={values.requestContact.partyOwner} />
        </EditCard>
      }
    </Accordion>
  );
};

export default RequestContactForm;
