import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { FormModal } from '@k-int/stripes-kint-components';
import ChecklistNotesFieldArray from './ChecklistNotesFieldArray';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  item: PropTypes.object,
};

const ChecklistNotesModal = ({ showModal, setShowModal, item }) => {
  const labelOverrides = {
    save: <FormattedMessage id="ui-oa.checklist.close" />,
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const submitNotes = (_values) => {};

  return (
    <FormModal
      initialValues={item}
      labelOverrides={labelOverrides}
      modalProps={{
        dismissible: 'dismissible',
        onClose: handleClose,
        open: showModal,
        label: (
          <FormattedMessage
            id="ui-oa.checklist.notesForItem"
            values={{ item: item?.label }}
          />
        ),
      }}
      mutators={arrayMutators}
      onSubmit={submitNotes}
    >
      <ChecklistNotesFieldArray />
    </FormModal>
  );
};

ChecklistNotesModal.propTypes = propTypes;

export default ChecklistNotesModal;
