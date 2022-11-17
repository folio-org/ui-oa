import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Accordion, LoadingPane, Badge, Pane, Row, Col } from '@folio/stripes/components';
import { AppIcon, useOkapiKy, useNamespace } from '@folio/stripes/core';

import isEqual from 'lodash/isEqual';

import ChecklistItem from './ChecklistItem';
import { ChecklistNotesModal } from './ChecklistNotes';
import HiddenHeader from './HiddenHeader/HiddenHeader';
import useChecklistItemDefinitions from '../../hooks/useChecklistItemDefinitions';
import { PANE_DEFAULT_WIDTH } from '../../constants/config';
import urls from '../../util/urls';

const propTypes = {
  onToggle: PropTypes.func,
  ownerId: PropTypes.string,
  resourceEndpoint: PropTypes.func,
};

const Checklist = ({ onToggle, ownerId, resourceEndpoint }) => {
  const itemDefinitions = useChecklistItemDefinitions();
  const queryClient = useQueryClient();
  const ky = useOkapiKy();
  const [namespace] = useNamespace();

  const [selectedNotesItem, setSelectedNotesItem] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);

  const { data: resource = {}, isLoading } = useQuery(
    [namespace, 'resource', 'Checklist', ownerId],
    () => ky(resourceEndpoint(ownerId)).json()
  );

  const { mutateAsync: putChecklist } = useMutation(
    ['Checklist', 'putChecklist'],
    (data) => {
      ky.put(resourceEndpoint(ownerId), { json: data }).then(() => {
        queryClient.invalidateQueries([
          namespace,
          'resource',
          'Checklist',
          ownerId,
        ]);
      });
    }
  );

  useEffect(() => {
    // Assign each item the name of 'definition'
    const itemList = itemDefinitions.map((definition) => ({ definition }));
    const output = [];
    // Check each item that is already stored alongside the publication request to see if the defintion already exists
    itemList.forEach((item) => {
      const relevantItem = resource?.checklist?.find(
        (ci) => ci.definition.name === item.definition.name
      );
      // If the definition already exists, add it to the output, otherwise add the standard defintion
      if (relevantItem) {
        output.push(relevantItem);
      } else {
        output.push(item);
      }
    });
    if (
      // If output is not equal to the current checklistItems stat, update it
      !isEqual(checklistItems, output)
    ) {
      setChecklistItems(output);
    }
  }, [resource, itemDefinitions, checklistItems]);

  const handleSubmit = async (values, item) => {
    const submitValues = { checklist: [{ ...item, ...values }] };
    await putChecklist(submitValues);
  };

  const visibleItems = checklistItems.filter(
    (e) => e?.status?.value !== 'hidden'
  );

  const hiddenItems = checklistItems.filter(
    (e) => e?.status?.value === 'visible'
  );

  const renderBadge = () => {
    return <Badge>{hiddenItems?.length}</Badge>;
  };

  if (isLoading) {
    return (
      <LoadingPane
        defaultWidth={PANE_DEFAULT_WIDTH}
        dismissible
        onClose={onToggle}
      />
    );
  }

  return (
    <Pane
      appIcon={<AppIcon app="oa" size="small" />}
      defaultWidth="20%"
      dismissible
      onClose={onToggle}
      padContent={checklistItems.length < 1}
      paneTitle={<FormattedMessage id="ui-oa.checklist" />}
    >
      {/* TODO This section for the empty message section may require some refactoring, was done in a bit of a rush */}
      {checklistItems.length < 1 && (
        <>
          <Row>
            <Col style={{ marginBottom: '1rem' }} xs={12}>
              <FormattedMessage id="ui-oa.checklist.emptyMessage" />
            </Col>
            <Col xs={12}>
              <FormattedMessage
                id="ui-oa.checklist.emptyMessageLink"
                values={{
                  link: (
                    <Link to={urls.settingsChecklistItems}>
                      <FormattedMessage id="ui-oa.checklist.emptyMessageSettingsLink" />
                    </Link>
                  ),
                }}
              />
            </Col>
          </Row>
        </>
      )}
      {visibleItems.map((item) => {
        return (
          <div key={item?.id}>
            <ChecklistItem
              handleSubmit={handleSubmit}
              item={item}
              resource={resource}
              setSelectedNotesItem={setSelectedNotesItem}
            />
          </div>
        );
      })}
      {hiddenItems?.length > 0 && (
        <Accordion
          closedByDefault
          displayWhenClosed={renderBadge()}
          displayWhenOpen={renderBadge()}
          header={HiddenHeader}
          label={<FormattedMessage id="ui-oa.checklist.hidden" />}
          separator={false}
        >
          {hiddenItems.map((item) => {
            return (
              <div key={item?.id}>
                <ChecklistItem
                  handleSubmit={handleSubmit}
                  item={item}
                  resource={resource}
                  setSelectedNotesItem={setSelectedNotesItem}
                />
              </div>
            );
          })}
        </Accordion>
      )}
      <ChecklistNotesModal
        item={selectedNotesItem}
        ownerId={ownerId}
        resource={resource}
        resourceEndpoint={resourceEndpoint}
        setSelectedNotesItem={setSelectedNotesItem}
      />
    </Pane>
  );
};

Checklist.propTypes = propTypes;

export default Checklist;
