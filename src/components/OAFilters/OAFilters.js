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

import css from './OAFilters.css';

const propTypes = {
  activeFilters: PropTypes.object,
  disableReset: PropTypes.func,
  filterHandlers: PropTypes.object,
  resetAll: PropTypes.func,
  searchHandlers: PropTypes.object,
  searchValue: PropTypes.object,
};

function OAFilters({ activeFilters, disableReset, filterHandlers, resetAll, searchHandlers, searchValue }) {
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
      <SearchField
        autoFocus
        className={css.searchField}
        marginBottom0
        name="query"
        onChange={searchHandlers.query}
        onClear={searchHandlers.reset}
        value={searchValue.query}
      />
      <Button
        buttonStyle="primary"
        disabled={!searchValue.query || searchValue.query === ''}
        fullWidth
        type="submit"
      >
        <FormattedMessage id="stripes-smart-components.search" />
      </Button>
      <Button
        buttonStyle="none"
        disabled={disableReset()}
        id="clickable-reset-all"
        onClick={resetAll}
      >
        <Icon icon="times-circle-solid">
          <FormattedMessage id="stripes-smart-components.resetAll" />
        </Icon>
      </Button>
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
            dataOptions={[
              { id: 'new', label: 'New', value: 'new' },
              { id: 'inProgress', label: 'In progress', value: 'inProgress' },
              { id: 'rejected', label: 'Rejected', value: 'rejected' }
            ]}
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
