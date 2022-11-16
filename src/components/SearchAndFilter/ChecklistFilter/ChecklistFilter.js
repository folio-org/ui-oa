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

  // Example query for searching if an outcome != no, not set or if the checklist item hasnt been touched
  // (checklist.definition.name==test&&checklist.outcome isNull)||(checklist.definition.name==test&&checklist.outcome.value!=no)||!(checklist.definition.name==test)

  // TODO Refactor handleSubmit and ParseQueryString

  // Due to how filters are handled within SearchAndSortQuery the filter string needs to be parsed back into a usual object
  const parseQueryString = (filterArray) => {
    const filters = [];
    // Remove isNull, isNotNull and !checklist.definition.name querys
    const removedIsNull = filterArray?.map((filter) => {
      return filter.split(/(\)\|\|\(|\)\|\|!)/g).pop();
    });
    const splitFilters = removedIsNull?.map((e) => e.replace(/[()]/g, ''));
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
    activeFilters?.checklistItems || null
  );

  const handleSubmit = (values) => {
    const generateIsNullString = (checklistItem, attribute) => {
      return `(checklist.definition.name==${checklistItem}&&checklist.${attribute} isNull)||!(checklist.definition.name==${checklistItem})||`;
    };

    const generateIsNotNullString = (checklistItem) => {
      return `(checklist.definition.name==${checklistItem}&&checklist.outcome isNotNull)||`;
    };
    const filterStrings = values.filters.map((e) => {
      let statusIsNull = '';
      let outcomeIsNull = '';
      let outcomeIsNotNull = '';

      const rulesString = e.rules.map((r) => {
        if (
          r.attribute === 'status' &&
          ((r.operator === '==' && r.value === 'required') ||
            (r.operator === '!=' && r.value === 'not_required'))
        ) {
          statusIsNull = generateIsNullString(e.checklistItem, r.attribute);
          return `checklist.${r.attribute}.value${r.operator + r.value}`;
        }

        if (
          r.attribute === 'outcome' &&
          r.operator === '!=' &&
          r.value !== 'notSet'
        ) {
          outcomeIsNull = generateIsNullString(e.checklistItem, r.attribute);
          return `checklist.${r.attribute}.value${r.operator + r.value}`;
        }

        if (r.operator === '==' && r.value === 'notSet') {
          outcomeIsNull = generateIsNullString(e.checklistItem, r.attribute);
        }
        if (r.operator === '!=' && r.value === 'notSet') {
          outcomeIsNotNull = generateIsNotNullString(e.checklistItem);
        }
        return `checklist.${r.attribute}.value${r.operator + r.value}`;
      });
      const isString = `${statusIsNull}${outcomeIsNull}${outcomeIsNotNull}`;
      if (isString) {
        return `${isString}(checklist.definition.name==${
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
      checklistItems: [...filterStrings],
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
