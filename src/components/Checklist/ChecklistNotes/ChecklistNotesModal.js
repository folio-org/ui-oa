import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import orderBy from 'lodash/orderBy';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useNamespace, useOkapiKy } from '@folio/stripes/core';
import { Button, Modal, Loading } from '@folio/stripes/components';
import ChecklistNotes from './ChecklistNotes';

const propTypes = {
  setSelectedNotesItem: PropTypes.func,
  item: PropTypes.object,
  ownerId: PropTypes.string,
  resourceEndpoint: PropTypes.func,
};

const ChecklistNotesModal = ({
  ownerId,
  setSelectedNotesItem,
  item,
  resourceEndpoint,
}) => {
  const queryClient = useQueryClient();
  const ky = useOkapiKy();
  const [namespace] = useNamespace();
  const { data: resource, isLoading } = useQuery(
    [namespace, 'notes', 'checklistNotesModal', ownerId],
    () => ky(resourceEndpoint(ownerId)).json()
  );

  const notes = orderBy(
    resource?.checklist?.find((element) => element?.id === item?.id)?.notes,
    'dateCreated',
    'desc'
  );

  const { mutateAsync: putNotes } = useMutation(
    ['ChecklistNotesModal', 'putNotes'],
    (data) => {
      ky.put(resourceEndpoint(ownerId), { json: data }).then(() => {
        queryClient.invalidateQueries([
          namespace,
          'notes',
          'checklistNotesModal',
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
    queryClient.invalidateQueries([namespace, 'data', 'view', ownerId]);
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
      {!isLoading ? (
        <ChecklistNotes
          handleDelete={handleDelete}
          notes={notes || []}
          submitNotes={submitNotes}
        />
      ) : (
        <Loading />
      )}
    </Modal>
  );
};

ChecklistNotesModal.propTypes = propTypes;

export default ChecklistNotesModal;
