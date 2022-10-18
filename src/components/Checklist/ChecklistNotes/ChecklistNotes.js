import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, Form } from 'react-final-form';

import {
  Button,
  Col,
  IconButton,
  Row,
  TextArea,
  Layout,
} from '@folio/stripes/components';

import css from '../Checklist.css';
import ChecklistMeta from '../ChecklistMeta';

const ChecklistNotes = ({ notes, submitNotes, handleDelete }) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (notes?.length < 1) {
      setEditing('NEW_NOTE');
      notes.unshift({});
    } else {
      setEditing(null);
    }
  }, [notes]);

  return (
    <>
      <div className={css.notesButton}>
        <Button
          disabled={editing}
          onClick={() => {
            setEditing('NEW_NOTE');
            notes.unshift({});
          }}
        >
          <FormattedMessage id="ui-oa.checklist.addNote" />
        </Button>
      </div>
      {notes.map((note, index) => {
        if (note.id === editing || (!note.id && editing === 'NEW_NOTE')) {
          return (
            <div key={note?.id || index}>
              <hr />
              <Form initialValues={note} onSubmit={submitNotes}>
                {({ handleSubmit, pristine, submitting, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={css.notesContainer}>
                      <Row middle="xs">
                        <Col xs={10}>
                          <Field
                            autoFocus
                            component={TextArea}
                            fullWidth
                            maxLength={255}
                            name="note"
                            style={{ height: '110px', width: '90%' }}
                          />
                        </Col>
                        <Col xs={2}>
                          <div>
                            <Layout className="flex right">
                              <Button
                                key={`save[${note.label}]`}
                                buttonStyle="primary"
                                disabled={pristine || submitting}
                                onClick={() => {
                                  notes[index] = values;
                                  handleSubmit();
                                  setEditing(null);
                                }}
                                type="submit"
                              >
                                <FormattedMessage id="ui-oa.checklist.save" />
                              </Button>
                              <Button
                                key={`cancel[${note.label}]`}
                                data-type-button="cancel"
                                disabled={notes?.length <= 1}
                                onClick={() => {
                                  if (note?.id) {
                                    setEditing(false);
                                  } else {
                                    notes.shift();
                                    setEditing(false);
                                  }
                                }}
                              >
                                <FormattedMessage id="ui-oa.checklist.cancel" />
                              </Button>
                            </Layout>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </form>
                )}
              </Form>
            </div>
          );
        }
        return (
          <>
            <hr />
            <div className={css.notesContainer}>
              <Row middle="xs">
                <Col xs={10}>
                  <>{note.note}</>
                </Col>
                <Col xs={2}>
                  <div>
                    <Layout className="flex right">
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
                    </Layout>
                  </div>
                </Col>
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
          </>
        );
      })}
      <br />
    </>
  );
};

ChecklistNotes.propTypes = {
  submitNotes: PropTypes.func,
  handleDelete: PropTypes.func,
  notes: PropTypes.arrayOf(PropTypes.object),
};

export default ChecklistNotes;
