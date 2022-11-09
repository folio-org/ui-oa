import PropTypes from 'prop-types';
import { useState } from 'react';
import { Accordion, FilterAccordionHeader } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import useChecklistItemDefinitions from '../../../hooks/useChecklistItemDefinitions';

import ChecklistFilterForm from './ChecklistFilterForm';

const ChecklistFilter = ({ activeFilters, filterHandlers }) => {
  const checklistItems = useChecklistItemDefinitions();
  const [editingFilters, setEditingFilters] = useState(false);
  const openEditModal = () => setEditingFilters(true);
  const closeEditModal = () => setEditingFilters(false);

  const parseQueryString = (string) => {
    const filters = [];
    const splitFilters = string
      ?.split(')&&(')
      ?.map((e) => e.replace(/[()]/g, ''));
    splitFilters?.forEach((filter) => {
      const [checklistItemString, rulesString] = filter
        ?.replace(/checklist.definition.|checklist.|.value/g, '')
        ?.split(/&&/);
      const rules = [];
      rulesString?.split('||')?.forEach((rule) => {
        const [attribute, operator, value] = rule?.split(/(==|!=)/);
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
      header={FilterAccordionHeader}
      id="clickable-checklist-filter"
      label={<FormattedMessage id="ui-oa.checklistFilter.checklistItems" />}
      separator={false}
    >
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