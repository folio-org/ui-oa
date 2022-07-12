import PropTypes from 'prop-types';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { Button } from '@folio/stripes/components';
import { FormModal } from '@k-int/stripes-kint-components';
import ChecklistNotesFieldArray from './ChecklistNotesFieldArray';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  item: PropTypes.object,
};

const ChecklistNotesModal = ({ showModal, setShowModal, item }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  const renderFooter = () => {
    return (
      <>
        <Button marginBottom0 onClick={() => handleClose()}>
          <FormattedMessage id="ui-oa.checklist.close" />
        </Button>
      </>
    );
  };

  const submitNotes = (_values) => {};

  const getInitialValues = () => {
    if (!item.notes) {
      return { ...item, notes: [{ note: '' }] };
    }
    return item;
  };

  return (
    <FormModal
      initialValues={getInitialValues()}
      modalProps={{
        dismissible: true,
        footer: renderFooter,
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
      <ChecklistNotesFieldArray handleSubmit={submitNotes} />
    </FormModal>
  );
};

ChecklistNotesModal.propTypes = propTypes;

export default ChecklistNotesModal;
