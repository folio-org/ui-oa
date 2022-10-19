import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import orderBy from 'lodash/orderBy';
import { useMutation, useQueryClient } from 'react-query';
import { useNamespace, useOkapiKy } from '@folio/stripes/core';
import { Button, Modal } from '@folio/stripes/components';
import ChecklistNotes from './ChecklistNotes';

const propTypes = {
  setSelectedNotesItem: PropTypes.func,
  item: PropTypes.object,
  ownerId: PropTypes.string,
  resource: PropTypes.object,
  resourceEndpoint: PropTypes.func,
};

const ChecklistNotesModal = ({
  ownerId,
  setSelectedNotesItem,
  item,
  resource,
  resourceEndpoint,
}) => {
  const queryClient = useQueryClient();
  const ky = useOkapiKy();
  const [namespace] = useNamespace();

  const notes =
    orderBy(
      resource?.checklist?.find((element) => element?.id === item?.id)?.notes,
      'dateCreated',
      'desc'
    ) || [];

  const { mutateAsync: putNotes } = useMutation(
    ['ChecklistNotesModal', 'putNotes'],
    (data) => {
      ky.put(resourceEndpoint(ownerId), { json: data })
        .json()
        .then((res) => {
          // If a checklist item hasnt been changed it will note have an associated ID
          // This check ensures that when a put is made, the selected item is updated with the new ID
          if (!item?.id) {
            setSelectedNotesItem(
              res?.checklist?.find(
                (e) => e?.definition?.id === item?.definition?.id
              )
            );
          }
          queryClient.invalidateQueries([
            namespace,
            'resource',
            'Checklist',
            ownerId,
          ]);
        });
    }
  );

  const handleClose = () => {
    if (!item?.notes?.slice(-1)[0]?.id && item.notes) {
      item.notes.shift();
    }
    setSelectedNotesItem(null);
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
      open={item}
    >
      <ChecklistNotes
        handleDelete={handleDelete}
        notes={notes}
        submitNotes={submitNotes}
      />
    </Modal>
  );
};

ChecklistNotesModal.propTypes = propTypes;

export default ChecklistNotesModal;
