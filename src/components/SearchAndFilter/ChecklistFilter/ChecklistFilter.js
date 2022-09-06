import PropTypes from 'prop-types';
import { useState } from 'react';
import { Accordion, FilterAccordionHeader } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';

import ChecklistFilterForm from './ChecklistFilterForm';

const ChecklistFilter = ({
  activeFilters,
  filterHandlers,
  checklistItemDefinitionsEndpoint,
}) => {
  const [editingFilters, setEditingFilters] = useState(false);
  const openEditModal = () => setEditingFilters(true);
  const closeEditModal = () => setEditingFilters(false);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Accordion
      closedByDefault
      header={FilterAccordionHeader}
      id="clickable-checklist-filter"
      label={<FormattedMessage id="ui-oa.checklistFilter.checklistItems" />}
      separator={false}
    >
      <ChecklistFilterForm
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
  checklistItemDefinitionsEndpoint: PropTypes.string,
  filterHandlers: PropTypes.object,
};

export default ChecklistFilter;
