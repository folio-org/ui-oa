import { useState } from 'react';
import {
  Col,
  Row,
  InfoPopover,
  KeyValue,
  IconButton,
} from '@folio/stripes/components';
import { IconSelect } from '@k-int/stripes-kint-components';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import ChecklistNotesModal from './ChecklistNotesModal';
import StatusSelect from './StatusSelect';

import css from './ChecklistForm.css';
import ChecklistMeta from './ChecklistMeta';

const propTypes = {
  checklist: PropTypes.arrayOf(PropTypes.object),
};
const ChecklistForm = ({ checklist }) => {
  const [showNotesModal, setShowNotesModal] = useState(false);

  const outcomeOptions = [
    {
      icon: 'check-circle',
      value: 'done',
      label: 'Done',
    },
    {
      icon: 'times-circle-solid',
      value: 'not_done',
      label: 'Not done',
    },
    {
      icon: 'question-mark',
      value: 'other',
      label: 'Other',
    },
  ];

  const statusOptions = [
    {
      icon: 'eye-open',
      value: 'required',
      label: 'Required',
    },
    {
      icon: 'eye-closed',
      value: 'not_required',
      label: 'Not required',
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
              <Col xs={12}>
                <strong>{item.label}</strong>
                <Field
                  component={StatusSelect}
                  name={`items[${name}].status`}
                  options={statusOptions}
                />
                <InfoPopover content={item?.description} />
              </Col>
            </Row>
            <Row>
              <Col xs={10}>
                <ChecklistMeta
                  dateCreated={item?.dateCreated}
                  lastUpdated={item?.lastUpdated}
                />
              </Col>
              <Col xs={2}>
                <Field
                  component={IconSelect}
                  name={`items[${name}].outcome`}
                  options={outcomeOptions}
                />
              </Col>
            </Row>
            {item?.notes?.length > 0 && (
              <>
                <Row>
                  <Col xs={12}>
                    <KeyValue
                      label={
                        <FormattedMessage id="ui-oa.checklist.latestNote" />
                      }
                      value={
                        sortedNotes[0].note.length < 50
                          ? sortedNotes[0].note
                          : sortedNotes[0].note.substring(0, 75) + '...'
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <ChecklistMeta
                      dateCreated={sortedNotes[0].dateCreated}
                      lastUpdated={sortedNotes[0].lastUpdated}
                    />
                  </Col>
                </Row>
                <br />
              </>
            )}
            <Row>
              <Col xs={12}>
                <IconButton
                  badgeCount={item?.notes?.length || 0}
                  icon="document"
                  onClick={() => setShowNotesModal(item?.label)}
                />
              </Col>
            </Row>
            <ChecklistNotesModal
              item={item}
              setShowModal={setShowNotesModal}
              showModal={showNotesModal === item?.label}
            />
          </div>
        );
      })}
    </>
  );
};

ChecklistForm.propTypes = propTypes;
export default ChecklistForm;
