import PropTypes from 'prop-types';
import { CheckboxFilter } from '@folio/stripes/smart-components';
import {
  Accordion,
  AccordionSet,
  FilterAccordionHeader,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { DateFilter } from '@folio/stripes-erm-components';

import useOARefdata from '../../../util/useOARefdata';

const propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
};

function PublicationRequestsFilters({ activeFilters, filterHandlers }) {
  const requestStatusValues = useOARefdata('PublicationRequest.RequestStatus');

  const onChangeHandler = (group) => {
    filterHandlers.state({
      ...activeFilters,
      [group.name]: group.values
    });
  };

  const renderRequestDateFilter = () => {
    return <DateFilter
      accordionLabel={<FormattedMessage id="ui-oa.publicationRequest.requestDate" />}
      activeFilters={activeFilters}
      filterHandlers={filterHandlers}
      hideNoDateSetCheckbox
      name="requestDate"
    />;
  };

  return (
    <>
      <AccordionSet>
        <Accordion
          displayClearButton={activeFilters?.requestStatus?.length > 0}
          header={FilterAccordionHeader}
          id="filter-accordion-status"
          label={<FormattedMessage id="ui-oa.publicationRequest.status" />}
          onClearFilter={() => { filterHandlers.clearGroup('requestStatus'); }}
          separator={false}
        >
          <CheckboxFilter
            dataOptions={requestStatusValues}
            name="requestStatus"
            onChange={onChangeHandler}
            selectedValues={activeFilters?.requestStatus || []}
          />
        </Accordion>
        {renderRequestDateFilter()}
      </AccordionSet>
    </>
  );
}

PublicationRequestsFilters.propTypes = propTypes;

export default PublicationRequestsFilters;
