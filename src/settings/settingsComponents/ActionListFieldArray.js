import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { Field, useForm, useFormState } from 'react-final-form';
import { Button, IconButton, MultiColumnList, TextField } from '@folio/stripes/components';

const EDITING_ACTIONS_WIDTH = 25;
const NON_EDITING_ACTIONS_WIDTH = 20;
const TOTAL_WIDTH = 100;

const propTypes = {
  actionAssigner: PropTypes.func,
  actionCalls: PropTypes.object,
  contentData: PropTypes.shape({
    actions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.oneOf(
        PropTypes.node,
        PropTypes.string
      )
    })),
    map: PropTypes.func,
  }),
  editableFields: PropTypes.object,
  fields: PropTypes.object,
  visibleFields: PropTypes.arrayOf(PropTypes.string)
};

const ActionListFieldArray = ({
  actionAssigner,
  actionCalls,
  editableFields,
  fields,
  visibleFields
}) => {
  // Grab finalForm functions/values from form hooks
  const { change } = useForm();
  const { initialValues, pristine, submitting, values } = useFormState();

  /*
    Keep track of which field we are editing.
    null for no field, string id if we are editing an existing field and
    'NEW_ROW' for a new row
  */
  const [editing, setEditing] = useState(null);

  const toggleEditing = (id) => {
    if (editing) {
      setEditing(null);
    } else {
      setEditing(id);
    }
  };


  const handleSave = (index) => {
    const rowData = fields.value[index];
    actionCalls.edit(rowData);
  };

  const handleCreate = (index) => {
    const rowData = fields.value[index];
    actionCalls.create(rowData);
  };

 const getColumnWidths = () => {
    const widthNotInUseByActions = editing ?
      TOTAL_WIDTH - EDITING_ACTIONS_WIDTH :
      TOTAL_WIDTH - NON_EDITING_ACTIONS_WIDTH;

    const staticWidth = (widthNotInUseByActions / (visibleFields.length));
    const widthsObject = {};
    visibleFields.forEach((f) => {
      if (f !== 'actions') {
        widthsObject[f] = `${staticWidth}%`;
      }
    });

    widthsObject.actions = editing ?
      `${EDITING_ACTIONS_WIDTH}%` :
      `${NON_EDITING_ACTIONS_WIDTH}%`;

    return widthsObject;
  };

  const renderActionButtons = (data) => {
    const fieldName = `contentData[${data.rowIndex}]`;
    const { actionListActions: actions, ...rest } = data;

    if (data.id === editing || (!data.id && editing === 'NEW_ROW')) {
      // Render the save/cancel buttons
      return (
        <div>
          <Button
            disabled={submitting || pristine}
            onClick={() => {
              if (!data.id && editing === 'NEW_ROW') {
                handleCreate(data.rowIndex);
              } else {
                handleSave(data.rowIndex);
              }
              toggleEditing(data.id);
            }}
          >
            SAVE
          </Button>
          <Button
            data-type-button="cancel"
            onClick={() => {
              change(fieldName, get(initialValues, fieldName));
              toggleEditing(data.id);
            }}
          >
            CANCEL
          </Button>
        </div>
      );
    }

    return (
      <div>
        {actions?.map(action => {
          switch (action.name) {
            case 'edit':
              return (
                <IconButton
                  disabled={editing}
                  icon="edit"
                  onClick={() => toggleEditing(data.id)}
                />
              );
            case 'delete':
              return (
                <IconButton
                  disabled={editing}
                  icon="trash"
                  onClick={() => actionCalls.delete(rest)}
                />
              );
            default:
              return (
                <Button
                  disabled={editing}
                  onClick={() => actionCalls[action.name](data)}
                >
                  {action.label ?? action.name}
                </Button>
              );
          }
        })}
      </div>
    );
  };

  const formatContent = () => {
    return (
      fields.map(fieldName => {
        // Fetch the content from the field Values
        const cd = get(values, fieldName);
        cd.actionListActions = actionAssigner(cd);

        // Row is being edited if it has no id, or its id is in the editing string
        const editingRow = cd.id === editing || !cd.id;
        const returnObj = { ...cd };

        // If editing, replace values with fields
        if (editingRow) {
          /*
            Check if the property is a visible field.
            If it is not then we don't allow editing in this component.
          */
          for (const key of visibleFields) {
            const editFunction = editableFields[key] ?? (() => true);
            /*
              Next check if this is a new row, if so we should edit it in a Field
              If it does, then we check if the property has an editableField function,
              if it does we run it with the data. If not then we just return the Field
            */
            if (
                !cd.id ||
                (editFunction(cd))
            ) {
              returnObj[key] =
                <Field
                  component={TextField}
                  name={`${fieldName}.${key}`}
                />;
            }
          }
        }
        return returnObj;
      })
    );
  };

  return (
    <>
      <Button
        disabled={!actionCalls.create}
        onClick={() => {
          toggleEditing('NEW_ROW');
          fields.push({});
        }}
      >
        CREATE NEW
      </Button>
      <MultiColumnList
        columnMapping={{
          actionListActions: "ACTIONS"
        }}
        columnWidths={getColumnWidths()}
        contentData={formatContent()}
        formatter={{
          actionListActions: renderActionButtons
        }}
        interactive={false}
        visibleColumns={[...visibleFields, 'actionListActions']}
      />
    </>
  );
};

ActionListFieldArray.propTypes = propTypes;

export default ActionListFieldArray;
