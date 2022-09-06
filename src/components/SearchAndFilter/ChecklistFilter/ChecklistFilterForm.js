import PropTypes from 'prop-types';
import { Button } from '@folio/stripes/components';
import { FormModal } from '@k-int/stripes-kint-components';
import { FormattedMessage } from 'react-intl';

const ChecklistFilterForm = ({
  editingFilters,
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
        onSubmit={onSubmit}
      />
    </>
  );
};

ChecklistFilterForm.propTypes = {
  editingFilters: PropTypes.bool,
  handlers: PropTypes.shape({
    closeEditModal: PropTypes.func.isRequired,
    openEditModal: PropTypes.func.isRequired,
  }),
  onSubmit: PropTypes.func,
};
export default ChecklistFilterForm;
