import PropTypes from 'prop-types';
import { Button, Col, Row } from '@folio/stripes/components';
import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';
import css from './CheckListNotesFieldArray.css';

const ChecklistNotesField = ({ fields: { name } }) => {
  const { items, onAddField } = useKiwtFieldArray(name);
  return (
    <>
      {items.map((note) => {
        return (
          <>
            <div className={css.container}>
              <Row>
                <Col xs={11}>{note.note}</Col>
              </Row>
              <br />
              <Row>
                <Col xs={12}>
                  {note.dateCreated === note.lastUpdated ? (
                    <FormattedMessage
                      className={css.meta}
                      id="ui-oa.checklist.created"
                      values={{
                        date: <FormattedDate value={note.dateCreated} />,
                        time: <FormattedTime value={note.dateCreated} />,
                      }}
                    >
                      {(txt) => <span className={css.meta}>{txt}</span>}
                    </FormattedMessage>
                  ) : (
                    <FormattedMessage
                      className={css.meta}
                      id="ui-oa.checklist.updated"
                      values={{
                        date: <FormattedDate value={note.lastUpdated} />,
                        time: <FormattedTime value={note.lastUpdated} />,
                      }}
                    >
                      {(txt) => <span className={css.meta}>{txt}</span>}
                    </FormattedMessage>
                  )}
                </Col>
              </Row>
            </div>
            <hr />
          </>
        );
      })}
      <br />
      <Button onClick={() => onAddField({})}>
        <FormattedMessage id="ui-oa.checklist.addNote" />
      </Button>
    </>
  );
};

ChecklistNotesField.propTypes = {
  fields: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const ChecklistNotesFieldArray = () => {
  return (
    <>
      <FieldArray component={ChecklistNotesField} name="notes" />
    </>
  );
};

export default ChecklistNotesFieldArray;
