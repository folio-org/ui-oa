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
  const activeFiltersState = activeFilters?.state || activeFilters;
  const institutionLevel1Values = useOARefdata('Party.InstitutionLevel1');

  const onChangeHandler = (group) => {
    filterHandlers.state({
      ...activeFiltersState,
      [group.name]: group.values,
    });
  };

  const renderInstitutionLevel1Filter = () => {
    return (
      <Accordion
        displayClearButton={activeFiltersState?.institutionLevel1?.length > 0}
        header={FilterAccordionHeader}
        id="institution-level-one-filter-accordion"
        label={<FormattedMessage id="ui-oa.party.institutionLevelOne" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('institutionLevel1');
        }}
        separator={false}
      >
        <MultiSelectionFilter
          ariaLabelledBy="institution-level-one-filter-accordion"
          dataOptions={institutionLevel1Values}
          id="institution-level-one-filter"
          name="institutionLevel1"
          onChange={onChangeHandler}
          selectedValues={activeFiltersState?.institutionLevel1 || []}
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
        {renderInstitutionLevel1Filter()}
      </AccordionSet>
    </>
  );
};

PartiesFilters.propTypes = propTypes;

export default PartiesFilters;
