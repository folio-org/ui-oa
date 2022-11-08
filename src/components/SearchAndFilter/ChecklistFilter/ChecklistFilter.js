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
    // Example output
    // (checklist.definition.name==new&&(checklist.outcome.value==yes||checklist.status.value==required))&&(checklist.definition.name==test&&(checklist.outcome.value==no))
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
