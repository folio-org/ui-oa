import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  InfoPopover,
  IconButton,
  Headline,
} from '@folio/stripes/components';
import { IconSelect } from '@k-int/stripes-kint-components';

import orderBy from 'lodash/orderBy';

import css from '../Checklist.css';
import ChecklistMeta from '../ChecklistMeta';

const propTypes = {
  resource: PropTypes.object,
  item: PropTypes.object,
  handleSubmit: PropTypes.func,
  setSelectedNotesItem: PropTypes.func,
};
const ChecklistItem = ({
  resource,
  item,
  handleSubmit,
  setSelectedNotesItem,
}) => {
  const sortedNotes = orderBy(item.notes, 'dateCreated', 'desc');

  const buttonOptions = [
    {
      icon: 'check-circle',
      value: 'yes',
      label: 'Yes',
      buttonProps: { className: css.met },
      iconProps: {
        iconClassName: css.met,
      },
    },
    {
      icon: 'times-circle-solid',
      value: 'no',
      label: 'No',
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
            <Headline margin="none" size="large" tag="h3">
              {item.definition.label}
              <InfoPopover content={item?.definition?.description} />
            </Headline>
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
        <Row>
          <Col xs={12}>
            <ChecklistMeta
              dateCreated={resource?.dateCreated}
              lastUpdated={item?.lastUpdated || resource?.dateCreated}
            />
          </Col>
        </Row>
        <br />
        {item?.notes?.length > 0 && (
          <>
            <Row>
              <Col style={{ lineHeight: 1.5 }} xs={12}>
                {sortedNotes[0]?.note?.length < 100
                  ? sortedNotes[0]?.note
                  : sortedNotes[0]?.note?.substring(0, 100) + '...'}
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
            <FormattedMessage
              id="ui-oa.checklist.notesForItem"
              values={{ item: item.definition.label }}
            >
              {(ariaLabel) => (
                <IconButton
                  ariaLabel={ariaLabel}
                  badgeCount={item?.notes?.length || 0}
                  icon="document"
                  onClick={() => setSelectedNotesItem(item)}
                />
              )}
            </FormattedMessage>
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
