import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  InfoPopover,
  KeyValue,
  IconButton,
} from '@folio/stripes/components';
import { IconSelect } from '@k-int/stripes-kint-components';

import orderBy from 'lodash/orderBy';

import css from '../Checklist.css';
import ChecklistMeta from '../ChecklistMeta';

const propTypes = {
  item: PropTypes.object,
  handleSubmit: PropTypes.func,
  setSelectedNotesItem: PropTypes.func,
};
const ChecklistItem = ({ item, handleSubmit, setSelectedNotesItem }) => {
  const sortedNotes = orderBy(item.notes, 'dateCreated', 'desc');

  const buttonOptions = [
    {
      icon: 'check-circle',
      value: 'met',
      label: 'Met',
      buttonProps: { className: css.met },
      iconProps: {
        iconClassName: css.met,
      },
    },
    {
      icon: 'times-circle-solid',
      value: 'not_met',
      label: 'Not met',
      buttonProps: { className: css.notMet },
      iconProps: {
        iconClassName: css.notMet,
      },
    },
    {
      icon: 'exclamation-circle',
      value: 'other',
      label: 'Other',
      buttonProps: { className: css.other },
      iconProps: {
        iconClassName: css.other,
      },
    },
  ];

  return (
    <>
      <div key={item?.id} className={css.checklistContainer}>
        <Row>
          <Col xs={11}>
            <KeyValue
              label={
                <>
                  {item.definition.label}
                  <InfoPopover content={item?.definition?.description} />
                </>
              }
              value={
                <ChecklistMeta
                  dateCreated={
                    item?.dateCreated || item?.definition.dateCreated
                  }
                  lastUpdated={
                    item?.lastUpdated || item?.definition.lastUpdated
                  }
                />
              }
            />
          </Col>
          <Col xs={1}>
            <IconSelect
              onChange={(_e, value) => {
                handleSubmit({ outcome: value }, item);
              }}
              options={buttonOptions}
              value={item?.outcome?.value || null}
            />
          </Col>
        </Row>
        {item?.notes?.length > 0 && (
          <>
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={<FormattedMessage id="ui-oa.checklist.latestNote" />}
                  value={
                    sortedNotes[0]?.note?.length < 100
                      ? sortedNotes[0]?.note
                      : sortedNotes[0]?.note?.substring(0, 100) + '...'
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <ChecklistMeta
                  dateCreated={sortedNotes[0]?.dateCreated}
                  lastUpdated={sortedNotes[0]?.lastUpdated}
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
              onClick={() => setSelectedNotesItem(item)}
            />
            <IconButton
              icon={
                item?.status?.value === 'not_required'
                  ? 'eye-open'
                  : 'eye-closed'
              }
              onClick={() => {
                if (item?.status?.value === 'not_required') {
                  handleSubmit({ status: 'required' }, item);
                } else {
                  handleSubmit({ status: 'not_required' }, item);
                }
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

ChecklistItem.propTypes = propTypes;
export default ChecklistItem;
