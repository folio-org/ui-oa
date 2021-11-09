import PropTypes from 'prop-types';
import { CheckboxFilter } from '@folio/stripes/smart-components';
import {
  Accordion,
  AccordionSet,
  Button,
  FilterAccordionHeader,
  Icon,
  SearchField,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { DateFilter } from '@folio/stripes-erm-components';
import { useRefdata } from '@k-int/stripes-kint-components';

import css from './OAFilters.css';

const propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
};

function OAFilters({ activeFilters, filterHandlers }) {
  const { 0: { values: requestStatusValues = [] } = {} } = useRefdata({ desc: 'PublicationRequest.RequestStatus', endpoint: 'oa/refdata' });

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

OAFilters.propTypes = propTypes;

export default OAFilters;
