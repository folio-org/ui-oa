import { Col, Row, InfoPopover, KeyValue } from '@folio/stripes/components';
import { IconSelect } from '@k-int/stripes-kint-components';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';

import css from './ChecklistForm.css';

const propTypes = {
  checklist: PropTypes.arrayOf(PropTypes.object),
};
const ChecklistForm = ({ checklist }) => {
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
            <Row marginBottom0>
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
                      />
                    ) : (
                      <FormattedMessage
                        id="ui-oa.checklist.updated"
                        values={{
                          date: <FormattedDate value={item.lastUpdated} />,
                          time: <FormattedTime value={item.lastUpdated} />,
                        }}
                      />
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
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={<FormattedMessage id="ui-oa.checklist.latestNote" />}
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
                {sortedNotes[0].dateCreated === sortedNotes[0].lastUpdated ? (
                  <FormattedMessage
                    id="ui-oa.checklist.created"
                    values={{
                      date: (
                        <FormattedDate value={sortedNotes[0].dateCreated} />
                      ),
                      time: (
                        <FormattedTime value={sortedNotes[0].dateCreated} />
                      ),
                    }}
                  />
                ) : (
                  <FormattedMessage
                    id="ui-oa.checklist.updated"
                    values={{
                      date: (
                        <FormattedDate value={sortedNotes[0].lastUpdated} />
                      ),
                      time: (
                        <FormattedTime value={sortedNotes[0].lastUpdated} />
                      ),
                    }}
                  />
                )}
              </Col>
            </Row>
          </div>
        );
      })}
    </>
  );
};

ChecklistForm.propTypes = propTypes;
export default ChecklistForm;
