import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { EditCard } from '@folio/stripes-erm-components';

import {
  Button,
} from '@folio/stripes/components';

const AffiliationFieldArray = () => {
  const renderAffiliations = (fields) => {
    return (
      <div>
        { fields.map((affiliation, index) => (
          <EditCard
            key={affiliation}
            deleteButtonTooltipText={<FormattedMessage id="ui-oa.affiliation.removeAffiliation" values={{ number: index + 1 }} />}
            header={<FormattedMessage id="ui-oa.affiliation.affiliationTitle" values={{ number: index + 1 }} />}
            onDelete={index !== 0 ? () => fields.remove(index) : undefined}
          >
            {/* TODO: Detect if affiliation is selected / new and render correct func */}
          </EditCard>
        )) }
      </div>
    );
  };

  const renderEmpty = () => {
    return (
      <div />
    );
  };

  return (
    <FieldArray name="affiliation">
      {({ fields }) => (
        <div>
          <div>
            {fields.length ? renderAffiliations(fields) : renderEmpty()}
          </div>
          <Button
            onClick={() => fields.push({})}
          >
            <FormattedMessage id="ui-oa.affiliation.addAffiliation" />
          </Button>
        </div>
      )}
    </FieldArray>);
};

export default AffiliationFieldArray;
