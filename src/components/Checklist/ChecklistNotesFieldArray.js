import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, useFormState } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Col,
  IconButton,
  Row,
  TextArea,
} from '@folio/stripes/components';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';

import css from './CheckListNotesFieldArray.css';
import ChecklistMeta from './ChecklistMeta';

const ChecklistNotesField = ({ fields: { name }, handleSubmit }) => {
  const { initialValues, values } = useFormState();
  const { items, onAddField, onDeleteField } = useKiwtFieldArray(name);
  const [editing, setEditing] = useState(() => {
    if (initialValues?.notes[0]?.id) {
      return false;
    } else {
      return 'NEW_NOTE';
    }
  });

  const renderNoteActions = (note, index) => {
    if (note.id === editing || (!note.id && editing === 'NEW_NOTE')) {
      return (
        <div>
          <Button
            key={`save[${note.label}]`}
            buttonStyle="primary"
            disabled={
              !note?.note || initialValues?.notes[index]?.note === note?.note
            }
            marginBottom0
            onClick={() => {
              handleSubmit(values);
              setEditing(null);
            }}
            type="submit"
          >
            <FormattedMessage id="ui-oa.checklist.save" />
          </Button>
          {(items.length > 1 || note?.id) && (
            <Button
              key={`cancel[${note.label}]`}
              data-type-button="cancel"
              marginBottom0
              onClick={() => {
                if (!note.id && editing === 'NEW_NOTE') {
                  onDeleteField(index, note);
                  setEditing(null);
                } else {
                  setEditing(null);
                }
              }}
            >
              <FormattedMessage id="ui-oa.checklist.cancel" />
            </Button>
          )}
        </div>
      );
    }
    return (
      <>
        <IconButton
          disabled={editing}
          icon="edit"
          onClick={() => setEditing(note.id)}
        />
        <IconButton
          disabled={editing}
          icon="trash"
          onClick={() => onDeleteField(index, note)}
        />
      </>
    );
  };

  return (
    <>
      {items.map((note, index) => {
        if (note.id === editing || (!note.id && editing === 'NEW_NOTE')) {
          return (
            <>
              <div className={css.container}>
                <Row middle="xs">
                  <Col xs={9}>
                    <Field
                      component={TextArea}
                      fullWidth
                      name={`${name}[${index}].note`}
                      // TODO Place styling in external css
                      style={{ height: '150px' }}
                    />
                  </Col>
                  <Col xs={3}> {renderNoteActions(note, index)}</Col>
                </Row>
              </div>
              <hr />
            </>
          );
        }
        return (
          <>
            <div className={css.container}>
              <Row middle="xs">
                <Col xs={10}>{note.note}</Col>
                <Col xs={2}> {renderNoteActions(note, index)}</Col>
              </Row>
              <br />
              <Row>
                <Col xs={12}>
                  <ChecklistMeta
                    dateCreated={note?.dateCreated}
                    lastUpdated={note?.lastUpdated}
                  />
                </Col>
              </Row>
            </div>
            <hr />
          </>
        );
      })}
      <br />
      <div className={css.button}>
        <Button
          disabled={editing}
          onClick={() => {
            setEditing('NEW_NOTE');
            onAddField({});
          }}
        >
          <FormattedMessage id="ui-oa.checklist.addNote" />
        </Button>
      </div>
    </>
  );
};

ChecklistNotesField.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
  handleSubmit: PropTypes.func,
};

const ChecklistNotesFieldArray = ({ handleSubmit }) => {
  return (
    <>
      <FieldArray
        component={ChecklistNotesField}
        handleSubmit={handleSubmit}
        name="notes"
      />
    </>
  );
};

ChecklistNotesFieldArray.propTypes = {
  handleSubmit: PropTypes.func,
};

export default ChecklistNotesFieldArray;
