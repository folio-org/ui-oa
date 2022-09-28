import PropTypes from 'prop-types';
import { MultiSelectionFilter } from '@folio/stripes/smart-components';
import {
  Accordion,
  AccordionSet,
  FilterAccordionHeader,
  Headline,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

import { useOARefdata } from '../../../util';

const propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
};

const PartiesFilters = ({ activeFilters, filterHandlers }) => {
  const institutionLevelOneValues = useOARefdata('Party.InstitutionLevel1');

  const onChangeHandler = (group) => {
    filterHandlers.state({
      ...activeFilters,
      [group.name]: group.values,
    });
  };

  const renderInstitutionLevelOneFilter = () => {
    return (
      <Accordion
        displayClearButton={activeFilters?.institutionLevelOne?.length > 0}
        header={FilterAccordionHeader}
        id="institution-level-one-filter-accordion"
        label={<FormattedMessage id="ui-oa.party.institutionLevelOne" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('institutionLevelOne');
        }}
        separator={false}
      >
        <MultiSelectionFilter
          ariaLabelledBy="institution-level-one-filter"
          dataOptions={institutionLevelOneValues}
          id="institution-level-one-filter"
          name="institutionLevelOne"
          onChange={onChangeHandler}
          selectedValues={activeFilters?.institutionLevelOne || []}
        />
      </Accordion>
    );
  };

  return (
    <>
      <AccordionSet>
        <Headline faded margin="none" size="large">
          <FormattedMessage id="ui-oa.searchAndFilter.peopleFilters" />
        </Headline>
        {renderInstitutionLevelOneFilter()}
      </AccordionSet>
    </>
  );
};

PartiesFilters.propTypes = propTypes;

export default PartiesFilters;
