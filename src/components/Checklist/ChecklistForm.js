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
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import ChecklistNotesModal from './ChecklistNotesModal';

import css from './ChecklistForm.css';

const propTypes = {
  checklist: PropTypes.arrayOf(PropTypes.object),
};
const ChecklistForm = ({ checklist }) => {
  const [showNotesModal, setShowNotesModal] = useState(false);

  const buttonOptions = [
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
                <KeyValue
                  label={
                    <>
                      {item.label} <InfoPopover content={item?.description} />
                    </>
                  }
                  value={
                    item.dateCreated === item.lastUpdated ? (
                      <FormattedMessage
                        id="ui-oa.checklist.created"
                        values={{
                          date: <FormattedDate value={item.dateCreated} />,
                          time: <FormattedTime value={item.dateCreated} />,
                        }}
                      >
                        {(txt) => <span className={css.meta}>{txt}</span>}
                      </FormattedMessage>
                    ) : (
                      <FormattedMessage
                        className={css.meta}
                        id="ui-oa.checklist.updated"
                        values={{
                          date: <FormattedDate value={item.lastUpdated} />,
                          time: <FormattedTime value={item.lastUpdated} />,
                        }}
                      >
                        {(txt) => <span className={css.meta}>{txt}</span>}
                      </FormattedMessage>
                    )
                  }
                />
              </Col>
              <Col xs={2}>
                <Field
                  component={IconSelect}
                  name={`items[${name}].outcome`}
                  options={buttonOptions}
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
                    {sortedNotes[0].dateCreated ===
                    sortedNotes[0].lastUpdated ? (
                      <FormattedMessage
                        className={css.meta}
                        id="ui-oa.checklist.created"
                        values={{
                          date: (
                            <FormattedDate value={sortedNotes[0].dateCreated} />
                          ),
                          time: (
                            <FormattedTime value={sortedNotes[0].dateCreated} />
                          ),
                        }}
                      >
                        {(txt) => <span className={css.meta}>{txt}</span>}
                      </FormattedMessage>
                    ) : (
                      <FormattedMessage
                        className={css.meta}
                        id="ui-oa.checklist.updated"
                        values={{
                          date: (
                            <FormattedDate value={sortedNotes[0].lastUpdated} />
                          ),
                          time: (
                            <FormattedTime value={sortedNotes[0].lastUpdated} />
                          ),
                        }}
                      >
                        {(txt) => <span className={css.meta}>{txt}</span>}
                      </FormattedMessage>
                    )}
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
