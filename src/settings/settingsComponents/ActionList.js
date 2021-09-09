import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';

import ActionListFieldArray from './ActionListFieldArray';

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
  visibleFields: PropTypes.arrayOf(PropTypes.string)
};

const ActionList = ({
  actionAssigner,
  actionCalls = {},
  contentData,
  editableFields = {},
  visibleFields
}) => {
  return (
    <Form
      enableReinitialize
      initialValues={{ contentData }}
      mutators={arrayMutators}
      onSubmit={actionCalls.edit}
      subscription={{ contentData: true }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray
            actionAssigner={actionAssigner}
            actionCalls={actionCalls}
            component={ActionListFieldArray}
            editableFields={editableFields}
            name="contentData"
            visibleFields={visibleFields}
          />
        </form>
      )}
    </Form>
  );
};

ActionList.propTypes = propTypes;

export default ActionList;
