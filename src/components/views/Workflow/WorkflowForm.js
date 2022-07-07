import {
  Col,
  Headline,
  Row,
  InfoPopover,
} from '@folio/stripes/components';
import { IconSelect } from '@k-int/stripes-kint-components';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const propTypes = {
  checklist: PropTypes.arrayOf(PropTypes.object),
};
const WorkflowForm = ({ checklist }) => {
  const buttonOptions = [
    {
      icon: 'trash',
      value: 'trash',
      label: 'Trash',
    },
    {
      icon: 'comment',
      value: 'comment',
      label: 'Comment',
    },
  ];

  const checklistItemNames = Object.keys(checklist?.items);

  return (
    <>
      {checklistItemNames.map((name) => {
        const item = checklist?.items[name];
        const sortedNotes = orderBy(item.notes, 'dateCreated', 'desc');
        return (
          <>
            <Row>
              <Col xs={10}>
                <Headline>
                  {item.label}
                  <InfoPopover content={item?.description} />
                </Headline>
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
                  : sortedNotes[0].note.substring(0, 100) + '...'}
              </Col>
            </Row>
            <br />
          </>
        );
      })}
    </>
  );
};

WorkflowForm.propTypes = propTypes;
export default WorkflowForm;
