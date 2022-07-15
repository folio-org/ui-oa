import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { Field } from 'react-final-form';

import { ConfirmationModal, Pane, TextArea, TextField } from '@folio/stripes/components';
import { useCallout } from '@folio/stripes-core';

import { ActionList, required } from '@k-int/stripes-kint-components';

import useChecklistItemDefinitions from '../../hooks/useChecklistItemDefinitions';
import useMutateChecklistItemDefinitions from '../../hooks/useMutateChecklistItemDefinitions';

const ChecklistItemDefinitions = () => {
  const history = useHistory();

  const { data: checklistItemDefinitions = [] } = useChecklistItemDefinitions({
    returnQueryObject: true
  });

  const callout = useCallout();
  const intl = useIntl();

  const [deleteModal, setDeleteModal] = useState({
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
          message:  <FormattedMessage
            id="ui-oa.settings.checklistItemDefinitions.deleteDefinition.errorMessage"
            values={{
              label: deleteModal?.refdata?.label,
              error: errorResp?.message
            }}
          />,
          type: 'error',
        });
      }
    },
  });

  // This is the function which will take a row in the table and assign the relevant actions to it
  const actionAssigner = () => {
    return [
      {
        name: 'edit',
        label: <FormattedMessage id="ui-oa.edit" />,
        icon: 'edit',
        callback: (data) => editChecklistItemDefinition(data),
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
      }
    ];
  };

  const fieldComponents = {
    // eslint-disable-next-line react/prop-types
    description: ({ ...fieldProps }) => {
      return (
        <Field
          {...fieldProps}
          component={TextArea}
          fullWidth
          marginBottom0
          parse={v => v}
          required
          rows="4"
        />
      );
    },
    weight: ({ ...fieldProps }) => {
      return (
        <Field
          {...fieldProps}
          component={TextField}
          fullWidth
          id="textArea"
          marginBottom0
          parse={v => v}
          type="number"
        />
      );
    }
  };

  return (
    <Pane
      defaultWidth="fill"
      dismissible
      id="edit-checklist-item-definitions"
      onClose={() => history.push('/settings/oa')}
      paneTitle={
        <FormattedMessage id="ui-oa.settings.checklistItemDefinitions" />
      }
    >
      <ActionList
        actionAssigner={actionAssigner}
        columnMapping={{
          name: <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.name" />,
          label: <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.label" />,
          description: <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.description" />,
          weight: <FormattedMessage id="ui-oa.settings.checklistItemDefinitions.weight" />
        }}
        contentData={checklistItemDefinitions}
        creatableFields={{
          name: () => false
        }}
        createCallback={(data) => createChecklistItemDefinition(data)}
        defaultNewObject={{ weight: 0 }}
        editableFields={{
          name: () => false
        }}
        fieldComponents={fieldComponents}
        label={<FormattedMessage id="ui-oa.settings.checklistItemDefinitions" />}
        validateFields={{
          label: () => required
        }}
        visibleFields={['label', 'name', 'description', 'weight']}
      />
      <ConfirmationModal
        confirmLabel={
          <FormattedMessage id="ui-oa.delete" />
        }
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
    </Pane>
  );
};

export default ChecklistItemDefinitions;
