import PropTypes from 'prop-types';
import { CheckboxFilter } from '@folio/stripes/smart-components';
import {
  Accordion,
  AccordionSet,
  FilterAccordionHeader,
  Headline,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

import { selectifyRefdata, useOARefdata } from '../../../util';

const propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
};

const [OA_STATUS, YES_NO] = ['Work.OaStatus', 'Global.Yes_No'];

const JournalsFilters = ({ activeFilters, filterHandlers }) => {
  const activeFiltersState = activeFilters?.state || activeFilters;
  const refdataValues = useOARefdata([OA_STATUS, YES_NO]);
  const oaStatusValues = selectifyRefdata(refdataValues, OA_STATUS, 'value');
  const indexedInDOAJ = selectifyRefdata(refdataValues, YES_NO, 'value');

  const onChangeHandler = (group) => {
    filterHandlers.state({
      ...activeFiltersState,
      [group.name]: group.values,
    });
  };

  const renderOAStatusFilter = () => {
    return (
      <Accordion
        displayClearButton={activeFiltersState?.oaStatus?.length > 0}
        header={FilterAccordionHeader}
        id="oa-status-filter-accordion"
        label={<FormattedMessage id="ui-oa.journal.oaStatus" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('oaStatus');
        }}
        separator={false}
      >
        <CheckboxFilter
          dataOptions={oaStatusValues}
          name="oaStatus"
          onChange={onChangeHandler}
          selectedValues={activeFiltersState?.oaStatus || []}
        />
      </Accordion>
    );
  };

  const renderInDOAJFilter = () => {
    return (
      <Accordion
        displayClearButton={activeFiltersState?.indexedInDOAJ?.length > 0}
        header={FilterAccordionHeader}
        id="indexed-in-doaj-filter-accordion"
        label={<FormattedMessage id="ui-oa.journal.inDOAJ" />}
        onClearFilter={() => {
          filterHandlers.clearGroup('indexedInDOAJ');
        }}
        separator={false}
      >
        <CheckboxFilter
          dataOptions={indexedInDOAJ}
          name="indexedInDOAJ"
          onChange={onChangeHandler}
          selectedValues={activeFiltersState?.indexedInDOAJ || []}
        />
      </Accordion>
    );
  };

  return (
    <>
      <AccordionSet>
        <Headline faded margin="none" size="large">
          <FormattedMessage id="ui-oa.searchAndFilter.journalFilters" />
        </Headline>
        {renderOAStatusFilter()}
        {renderInDOAJFilter()}
      </AccordionSet>
    </>
  );
};

JournalsFilters.propTypes = propTypes;

export default JournalsFilters;
