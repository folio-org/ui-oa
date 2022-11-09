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
      rulesString.split('||')?.forEach((rule) => {
        const [attribute, operator, value] = rule.split(/(==|!=)/);
        rules?.push({ attribute, operator, value });
      });
      filters.push({
        checklistItem: checklistItemString?.replace('name==', ''),
        rules,
      });
    });
    console.log('Output: %o', filters);
    return filters;
  };

  const parsedFilterData = parseQueryString(activeFilters?.checklistItems[0]);
  console.log(parsedFilterData);
  // Example Input
  //   {
  //     "filters": [
  //         {
  //             "rules": [
  //                 {
  //                     "attribute": "outcome",
  //                     "operator": "==",
  //                     "value": "no"
  //                 },
  //                 {
  //                     "attribute": "status",
  //                     "operator": "!=",
  //                     "value": "required"
  //                 }
  //             ],
  //             "checklistItem": "test"
  //         },
  //         {
  //             "rules": [
  //                 {
  //                     "attribute": "status",
  //                     "operator": "!=",
  //                     "value": "not_required"
  //                 }
  //             ],
  //             "checklistItem": "test"
  //         }
  //     ]
  // }

  const handleSubmit = (values) => {
    console.log('Input: %o', values);
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

    // Example output
    // (checklist.definition.name==new&&(checklist.outcome.value==yes||checklist.status.value==required))&&(checklist.definition.name==test&&(checklist.outcome.value==no))

    setEditingFilters(false);

    // parseQueryString(filterStrings.join('&&'));
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
