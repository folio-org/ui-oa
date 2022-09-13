import PropTypes from 'prop-types';
import { Button } from '@folio/stripes/components';
import arrayMutators from 'final-form-arrays';
import { FormModal } from '@k-int/stripes-kint-components';
import { FormattedMessage } from 'react-intl';
import ChecklistFilterFieldArray from './ChecklistFilterFieldArray';

const ChecklistFilterForm = ({
  editingFilters,
  checklistItems,
  handlers: { openEditModal, closeEditModal },
  onSubmit,
}) => {
  return (
    <>
      <Button onClick={openEditModal}>
        <FormattedMessage id="ui-oa.checklistFilter.editChecklistFilters" />
      </Button>
      <FormModal
        modalProps={{
          dismissible: true,
          enforceFocus: false,
          label: <FormattedMessage id="ui-oa.checklistFilter.filterBuilder" />,
          onClose: closeEditModal,
          open: editingFilters,
          size: 'medium',
        }}
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
      >
        <ChecklistFilterFieldArray checklistItems={checklistItems} />
      </FormModal>
    </>
  );
};

ChecklistFilterForm.propTypes = {
  editingFilters: PropTypes.bool,
  checklistItems: PropTypes.arrayOf(PropTypes.object),
  handlers: PropTypes.shape({
    closeEditModal: PropTypes.func.isRequired,
    openEditModal: PropTypes.func.isRequired,
  }),
  onSubmit: PropTypes.func,
};
export default ChecklistFilterForm;
