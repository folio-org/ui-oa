import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import arrayMutators from 'final-form-arrays';

import {
  ConfirmationModal,
  Pane,
  Button,
  PaneMenu,
} from '@folio/stripes/components';
import { useCallout } from '@folio/stripes/core';

import { ActionList, FormModal } from '@k-int/stripes-kint-components';

import ChecklistItemDefinitionForm from './ChecklistItemDefinitionForm';
import useChecklistItemDefinitions from '../../../hooks/useChecklistItemDefinitions';
import useMutateChecklistItemDefinitions from '../../../hooks/useMutateChecklistItemDefinitions';

const ChecklistItemDefinitions = () => {
  const history = useHistory();

  const { data: checklistItemDefinitions = [] } = useChecklistItemDefinitions({
    returnQueryObject: true,
  });

  const callout = useCallout();
  const intl = useIntl();

  const [deleteModal, setDeleteModal] = useState({
    visible: false,
    definition: null,
  });

  const [editModal, setEditModal] = useState({
    visible: false,
    definition: null,
  });

  // Edit and Create will use the same PUT mutation
  const {
    delete: deleteChecklistItemDefinition,
    post: createChecklistItemDefinition,
    put: editChecklistItemDefinition,
  } = useMutateChecklistItemDefinitions({
    catchQueryCalls: {
      // Default delete behaviour is to fire a callout, either with kint-components default message
      // or one provided in labelOverrides, which is passed the error message and refdata in question
      delete: async (err) => {
        const errorResp = await err.response.json();
        callout.sendCallout({
          message: (
            <FormattedMessage
              id="ui-oa.settings.checklistItemDefinitions.deleteDefinition.errorMessage"
              values={{
                label: deleteModal?.refdata?.label,
                error: errorResp?.message,
              }}
            />
          ),
          type: 'error',
        });
      },
    },
  });

  const handleSumbit = async (values, form) => {
    if (editModal?.definition?.id) {
      await editChecklistItemDefinition(values);
    } else {
      await createChecklistItemDefinition(values);
    }
    setEditModal({ visible: false, definition: null });
    form.restart();
  };

  // This is the function which will take a row in the table and assign the relevant actions to it
  const actionAssigner = () => {
    return [
      {
        name: 'editItem',
        label: <FormattedMessage id="ui-oa.edit" />,
        icon: 'edit',
        callback: (data) => setEditModal({ visible: true, definition: data }),
        ariaLabel: (data) => intl.formatMessage(
            { id: 'ui-oa.settings.checklistItemDefinitions.editAriaLabel' },
            { label: data?.label }
          ),
      },
      {
        name: 'delete',
        label: <FormattedMessage id="ui-oa.edit" />,
        icon: 'trash',
        callback: (data) => setDeleteModal({ visible: true, definition: data }),
        ariaLabel: (data) => intl.formatMessage(
            { id: 'ui-oa.settings.checklistItemDefinitions.deleteAriaLabel' },
            { label: data?.label }
          ),
      },
    ];
  };

  const renderLastPaneMenu = (
    <PaneMenu>
      <FormattedMessage id="ui-oa.new">
        {(ariaLabel) => (
          <Button
            aria-label={ariaLabel}
            buttonStyle="primary"
            id="new-checklist-item-definition"
            marginBottom0
            onClick={() => setEditModal({ visible: true, definition: null })}
          >
            <FormattedMessage id="ui-oa.new" />
          </Button>
        )}
      </FormattedMessage>
    </PaneMenu>
  );

  return (
    <Pane
      defaultWidth="fill"
      dismissible
      id="edit-checklist-item-definitions"
      lastMenu={renderLastPaneMenu}
      onClose={() => history.push('/settings/oa')}
      paneTitle={
        <FormattedMessage id="ui-oa.settings.checklistItemDefinitions" />
      }
    >
      <ActionList
        actionAssigner={actionAssigner}
        columnMapping={{
          name: (
            <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.name" />
          ),
          label: (
            <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.label" />
          ),
          description: (
            <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.description" />
          ),
          weight: (
            <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.weight" />
          ),
        }}
        contentData={checklistItemDefinitions}
        hideCreateButton
        label={
          <FormattedMessage id="ui-oa.settings.checklistItemDefinitions" />
        }
        visibleFields={['label', 'name', 'description', 'weight']}
      />
      <ConfirmationModal
        confirmLabel={<FormattedMessage id="ui-oa.delete" />}
        heading={
          <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.deleteHeading" />
        }
        message={
          <FormattedMessage
            id="ui-oa.settings.checklistItemDefinitions.deleteDefinition.confirmMessage"
            values={{ label: deleteModal?.definition?.label }}
          />
        }
        onCancel={() => setDeleteModal({ visible: false, definition: null })}
        onConfirm={() => {
          deleteChecklistItemDefinition(deleteModal?.definition?.id);
          setDeleteModal({ visible: false, definition: null });
        }}
        open={deleteModal?.visible}
      />
      <FormModal
        initialValues={{
          id: editModal?.definition?.id || null,
          label: editModal?.definition?.label,
          weight: editModal?.definition?.weight || 0,
          description: editModal?.definition?.description,
        }}
        modalProps={{
          dismissible: true,
          onClose: () => setEditModal({ visible: false, definition: null }),
          open: editModal?.visible,
          label: (
            <FormattedMessage
              id={`ui-oa.settings.checklistItemDefinitions.${
                editModal?.definition?.id ? 'edit' : 'new'
              }ChecklistItem`}
            />
          ),
        }}
        mutators={arrayMutators}
        onSubmit={handleSumbit}
      >
        <ChecklistItemDefinitionForm definition={editModal?.definition} />
      </FormModal>
    </Pane>
  );
};

export default ChecklistItemDefinitions;
