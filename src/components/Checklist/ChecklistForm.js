import { useEffect, useState } from 'react';
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
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ChecklistNotesModal from './ChecklistNotesModal';
import useChecklistItemDefinitions from '../../hooks/useChecklistItemDefinitions';

import css from './ChecklistForm.css';
import ChecklistMeta from './ChecklistMeta';

const propTypes = {
  checklist: PropTypes.object,
  handleSubmit: PropTypes.func,
  ownerId: PropTypes.string,
};
const ChecklistForm = ({ ownerId, checklist, handleSubmit }) => {
  const itemDefinitions = useChecklistItemDefinitions();
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);

  useEffect(() => {
    const itemList = itemDefinitions.map((definition) => ({ definition }));
    const output = [];
    itemList.forEach((item) => {
      const relevantItem = checklist.find(
        (ci) => ci.definition.name === item.definition.name
      );
      if (relevantItem) {
        output.push(relevantItem);
      } else {
        output.push(item);
      }
    });
    if (
      differenceWith(checklistItems, output, isEqual)?.length === 0 &&
      !isEqual(checklistItems, output)
    ) {
      setChecklistItems(output);
    }
  }, [checklist, itemDefinitions, checklistItems]);

  const buttonOptions = [
    {
      icon: 'check-circle',
      value: 'met',
      label: 'Met',
    },
    {
      icon: 'times-circle-solid',
      value: 'not_met',
      label: 'Not met',
    },
    {
      icon: 'question-mark',
      value: 'other',
      label: 'Other',
    },
  ];

  return (
    <>
      {checklistItems.map((item) => {
        const sortedNotes = orderBy(item.notes, 'dateCreated', 'desc');

        const renderMenu = ({ onToggle }) => {
          return (
            <DropdownMenu>
              <Button
                buttonStyle="dropdownItem"
                onClick={() => {
                  handleSubmit({ status: 'required' }, item);
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
                  handleSubmit({ status: 'not_required' }, item);
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
                      {item.definition.label}
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
                      label={
                        <FormattedMessage id="ui-oa.checklist.latestNote" />
                      }
                      value={
                        sortedNotes[0]?.note?.length < 50
                          ? sortedNotes[0]?.note
                          : sortedNotes[0]?.note?.substring(0, 75) + '...'
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
                  onClick={() => setShowNotesModal(item?.definition?.label)}
                />
              </Col>
            </Row>
            <ChecklistNotesModal
              item={item}
              ownerId={ownerId}
              setShowModal={setShowNotesModal}
              showModal={showNotesModal === item?.definition?.label}
            />
          </div>
        );
      })}
    </>
  );
};

ChecklistForm.propTypes = propTypes;
export default ChecklistForm;
