import { Col, Row, InfoPopover } from '@folio/stripes/components';
import { IconSelect } from '@k-int/stripes-kint-components';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import css from './WorkflowForm.css';

const propTypes = {
  checklist: PropTypes.arrayOf(PropTypes.object),
};
const WorkflowForm = ({ checklist }) => {
  const buttonOptions = [
    {
      icon: 'default',
      value: 'done',
      label: 'Done',
    },
    {
      icon: 'times',
      value: 'not_done',
      label: 'Not done',
    },
    {
      icon: 'question-mark',
      value: 'other',
      label: 'Other',
    },
  ];

  const checklistItemNames = Object.keys(checklist?.items);

  return (
    <>
      {checklistItemNames.map((name) => {
        const item = checklist?.items[name];
        const sortedNotes = orderBy(item.notes, 'dateCreated', 'desc');
        return (
          <div className={css.container}>
            <Row>
              <Col xs={10}>
                <strong>{item.label}</strong>
                <InfoPopover content={item?.description} />
              </Col>
              <Col xs={2}>
                <Field
                  component={IconSelect}
                  name={`items[${name}].outcome`}
                  options={buttonOptions}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                {sortedNotes[0].note.length < 50
                  ? sortedNotes[0].note
                  : sortedNotes[0].note.substring(0, 75) + '...'}
              </Col>
            </Row>
            <br />
          </div>
        );
      })}
    </>
  );
};

WorkflowForm.propTypes = propTypes;
export default WorkflowForm;
