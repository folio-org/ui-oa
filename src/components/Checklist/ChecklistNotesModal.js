import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQueryClient } from 'react-query';
import { useNamespace, useOkapiKy } from '@folio/stripes-core';
import { Button, Modal } from '@folio/stripes/components';
import ChecklistNotesForm from './ChecklistNotesForm';
import { PUBLICATION_REQUEST_ENDPOINT } from '../../constants/endpoints';

const propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  item: PropTypes.object,
  ownerId: PropTypes.string,
};

const ChecklistNotesModal = ({ ownerId, showModal, setShowModal, item }) => {
  const queryClient = useQueryClient();
  const ky = useOkapiKy();
  const [namespace] = useNamespace();

  const { mutateAsync: putNotes } = useMutation(
    ['ChecklistNotesModal', 'putNotes'],
    (data) => {
      ky.put(PUBLICATION_REQUEST_ENDPOINT(ownerId), { json: data }).then(() => {
        queryClient.invalidateQueries([namespace, 'data', 'view', ownerId]);
      });
    }
  );

  const handleClose = () => {
    if (!item.notes.slice(-1)[0].id) {
      item.notes.pop();
    }
    setShowModal(false);
  };

  const submitNotes = async (values) => {
    const submitValues = { checklist: [{ ...item, notes: [values] }] };
    await putNotes(submitValues);
  };

  const handleDelete = async (values) => {
    const submitValues = {
      checklist: [{ ...item, notes: [{ ...values, _delete: true }] }],
    };
    await putNotes(submitValues);
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

  return (
    <Modal
      dismissible
      footer={renderFooter()}
      label={
        <FormattedMessage
          id="ui-oa.checklist.notesForItem"
          values={{ item: item?.definition?.label }}
        />
      }
      onClose={handleClose}
      open={showModal}
    >
      <ChecklistNotesForm
        handleDelete={handleDelete}
        notes={item.notes}
        submitNotes={submitNotes}
      />
    </Modal>
  );
};

ChecklistNotesModal.propTypes = propTypes;

export default ChecklistNotesModal;
