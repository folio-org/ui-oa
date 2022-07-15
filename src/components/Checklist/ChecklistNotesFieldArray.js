import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, Form } from 'react-final-form';

import {
  Button,
  Col,
  IconButton,
  Row,
  TextArea,
} from '@folio/stripes/components';

import css from './CheckListNotesFieldArray.css';
import ChecklistMeta from './ChecklistMeta';

const ChecklistNotesField = ({ notes, submitNotes, handleDelete }) => {
  const [editing, setEditing] = useState(false);

  const renderNoteActions = (note, handleSubmit) => {
    if (note.id === editing || (!note.id && editing === 'NEW_NOTE')) {
      return (
        <div>
          <Button
            key={`save[${note.label}]`}
            buttonStyle="primary"
            onClick={() => {
              handleSubmit(note?.id);
              setEditing(null);
            }}
            type="submit"
          >
            <FormattedMessage id="ui-oa.checklist.save" />
          </Button>
          {(notes?.length > 1 || note?.id) && (
            <Button
              key={`cancel[${note.label}]`}
              data-type-button="cancel"
              onClick={() => {
                setEditing(null);
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
          onClick={() => handleDelete(note)}
        />
      </>
    );
  };

  return (
    <>
      {notes.map((note, index) => {
        if (note.id === editing || (!note.id && editing === 'NEW_NOTE')) {
          return (
            <>
              <Form initialValues={note} onSubmit={submitNotes}>
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={css.container}>
                      <Row middle="xs">
                        <Col xs={9}>
                          <Field
                            component={TextArea}
                            fullWidth
                            name="note"
                            // TODO Place styling in external css
                            style={{ height: '150px' }}
                          />
                        </Col>
                        <Col xs={3}>
                          {renderNoteActions(note, handleSubmit)}
                        </Col>
                      </Row>
                    </div>
                  </form>
                )}
              </Form>
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
            notes.push({});
          }}
        >
          <FormattedMessage id="ui-oa.checklist.addNote" />
        </Button>
      </div>
    </>
  );
};

ChecklistNotesField.propTypes = {
  submitNotes: PropTypes.func,
  handleDelete: PropTypes.func,
  notes: PropTypes.arrayOf(PropTypes.object),
};

export default ChecklistNotesField;
