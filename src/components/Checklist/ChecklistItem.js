import {
  Col,
  Row,
  InfoPopover,
  KeyValue,
  IconButton,
} from '@folio/stripes/components';
import { IconSelect } from '@k-int/stripes-kint-components';
import orderBy from 'lodash/orderBy';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import css from './ChecklistItem.css';
import ChecklistMeta from './ChecklistMeta';

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
      icon: 'question-mark',
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
      {/* // Removed for future use
        // const renderMenu = ({ onToggle }) => {
        //   return (
        //     <DropdownMenu>
        //       <Button
        //         buttonStyle="dropdownItem"
        //         onClick={() => {
        //           handleSubmit({ status: 'required' }, item);
        //           onToggle();
        //         }}
        //       >
        //         <Icon icon="eye-open">
        //           <FormattedMessage id="ui-oa.checklist.required" />
        //         </Icon>
        //       </Button>
        //       <Button
        //         buttonStyle="dropdownItem"
        //         onClick={() => {
        //           handleSubmit({ status: 'not_required' }, item);
        //           onToggle();
        //         }}
        //       >
        //         <Icon icon="eye-closed">
        //           <FormattedMessage id="ui-oa.checklist.notRequired" />
        //         </Icon>
        //       </Button>
        //     </DropdownMenu>
        //   );
        // }; */}
      <div key={item?.id} className={css.container}>
        <Row>
          <Col xs={10}>
            <KeyValue
              label={
                <>
                  {item.definition.label}
                  {/* Removed for future use potentially */}
                  {/* <Dropdown
                        hasPadding
                        renderMenu={renderMenu}
                        renderTrigger={({
                          open,
                          onToggle,
                          triggerRef,
                          keyHandler,
                          getTriggerProps,
                        }) => (
                          <IconButton
                            ref={triggerRef}
                            icon={open ? 'caret-up' : 'caret-down'}
                            marginBottom0
                            onClick={onToggle}
                            onKeyDown={keyHandler}
                            type="button"
                            {...getTriggerProps()}
                          />
                        )}
                      /> */}
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
          <Col xs={2}>
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
          </Col>
        </Row>
      </div>
    </>
  );
};

ChecklistItem.propTypes = propTypes;
export default ChecklistItem;
