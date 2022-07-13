import { useState } from 'react';
import {
  Col,
  Row,
  InfoPopover,
  KeyValue,
  IconButton,
  Dropdown,
  DropdownMenu,
  Button,
  Icon,
} from '@folio/stripes/components';
import { IconSelect } from '@k-int/stripes-kint-components';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { Field, useForm } from 'react-final-form';
import { FormattedMessage } from 'react-intl';
import ChecklistNotesModal from './ChecklistNotesModal';

import css from './ChecklistForm.css';
import ChecklistMeta from './ChecklistMeta';

const propTypes = {
  checklist: PropTypes.object,
};
const ChecklistForm = ({ checklist }) => {
  const { change } = useForm();
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

        const renderMenu = ({ onToggle }) => {
          return (
            <DropdownMenu>
              <Button
                buttonStyle="dropdownItem"
                onClick={() => {
                  change(`items[${name}].status`, 'required');
                  onToggle();
                }}
              >
                <Icon icon="eye-open">
                  <FormattedMessage id="ui-oa.checklist.required" />
                </Icon>
              </Button>
              <Button
                buttonStyle="dropdownItem"
                onClick={() => {
                  change(`items[${name}].status`, 'not_required');
                  onToggle();
                }}
              >
                <Icon icon="eye-closed">
                  <FormattedMessage id="ui-oa.checklist.notRequired" />
                </Icon>
              </Button>
            </DropdownMenu>
          );
        };
        return (
          <div key={item?.id} className={css.container}>
            <Row>
              <Col xs={10}>
                <KeyValue
                  label={
                    <>
                      {item.label}
                      <Dropdown
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
                      />
                      <InfoPopover content={item?.description} />
                    </>
                  }
                  value={
                    <ChecklistMeta
                      dateCreated={item?.dateCreated}
                      lastUpdated={item?.lastUpdated}
                    />
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
