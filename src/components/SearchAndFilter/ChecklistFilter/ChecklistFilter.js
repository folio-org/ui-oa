import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Accordion,
  FilterAccordionHeader,
  Layout,
} from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import useChecklistItemDefinitions from '../../../hooks/useChecklistItemDefinitions';

import ChecklistFilterForm from './ChecklistFilterForm';

const ChecklistFilter = ({ activeFilters, filterHandlers }) => {
  const checklistItems = useChecklistItemDefinitions();
  const [editingFilters, setEditingFilters] = useState(false);
  const openEditModal = () => setEditingFilters(true);
  const closeEditModal = () => setEditingFilters(false);

  // Due to how filters are handled within SearchAndSortQuery the filter string needs to be parsed back into a usual object
  const parseQueryString = (string) => {
    const filters = [];
    const splitFilters = string
      ?.split(')&&(')
      // Seperate filter string into indiviual filters
      ?.map((e) => e.replace(/[()]/g, ''));
    // Remove brackets from filter string
    splitFilters?.forEach((filter) => {
      const [checklistItemString, rulesString] = filter
        ?.replace(/checklist.definition.|checklist.|.value/g, '')
        // For each filter remove additional property values
        ?.split(/&&/);
      // Split filter into checklistItem and rules
      const rules = [];
      rulesString?.split('||')?.forEach((rule) => {
        const [attribute, operator, value] = rule?.split(/(==|!=)/);
        // Split all rules into attribute, operator and value
        rules?.push({ attribute, operator, value });
      });
      filters?.push({
        checklistItem: checklistItemString?.replace('name==', ''),
        rules,
      });
    });
    return filters;
  };

  const parsedFilterData = parseQueryString(
    activeFilters?.checklistItems ? activeFilters?.checklistItems[0] : null
  );

  const handleSubmit = (values) => {
    const filterStrings = values.filters.map((e) => {
      const rulesString = e.rules.map((r) => {
        return `checklist.${r.attribute}.value${r.operator + r.value}`;
      });
      if (values?.filters.length > 1) {
        return `(checklist.definition.name==${
          e?.checklistItem
        }&&(${rulesString.join('||')}))`;
      } else {
        return `checklist.definition.name==${
          e?.checklistItem
        }&&(${rulesString.join('||')})`;
      }
    });

    filterHandlers.state({
      ...activeFilters,
      checklistItems: [filterStrings.join('&&')],
    });
    setEditingFilters(false);
  };

  return (
    <Accordion
      displayClearButton={parsedFilterData?.length}
      header={FilterAccordionHeader}
      id="clickable-checklist-filter"
      label={<FormattedMessage id="ui-oa.checklistFilter.checklistItems" />}
      onClearFilter={() => filterHandlers.state({ ...activeFilters, checklistItems: [] })
      }
      separator={false}
    >
      {!!parsedFilterData?.length && (
        <Layout className="padding-bottom-gutter">
          <FormattedMessage
            id="ui-oa.checklistFilter.filtersApplied"
            values={{ filtersLength: parsedFilterData?.length }}
          />
        </Layout>
      )}
      <ChecklistFilterForm
        checklistItems={checklistItems}
        editingFilters={editingFilters}
        filters={parsedFilterData}
        handlers={{
          closeEditModal,
          openEditModal,
        }}
        onSubmit={handleSubmit}
      />
    </Accordion>
  );
};

ChecklistFilter.propTypes = {
  activeFilters: PropTypes.object,
  filterHandlers: PropTypes.object,
};

export default ChecklistFilter;
