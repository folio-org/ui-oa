import PropTypes from 'prop-types';
import { Button, Col, Row } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { useKiwtFieldArray } from '@k-int/stripes-kint-components';
import css from './CheckListNotesFieldArray.css';
import ChecklistMeta from './ChecklistMeta';

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
                  <ChecklistMeta
                    dateCreated={note?.dateCreated}
                    lastUpdate={note?.lastUpdated}
                  />
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
