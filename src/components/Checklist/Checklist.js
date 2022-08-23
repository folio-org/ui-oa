import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Accordion, Badge, Pane, Row, Col } from '@folio/stripes/components';
import { AppIcon, useNamespace, useOkapiKy } from '@folio/stripes/core';

import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith';

import ChecklistItem from './ChecklistItem';
import NotRequiredHeader from './NotRequiredHeader/NotRequiredHeader';
import { ChecklistNotesModal } from './ChecklistNotes';
import useChecklistItemDefinitions from '../../hooks/useChecklistItemDefinitions';
import urls from '../../util/urls';

const propTypes = {
  onToggle: PropTypes.func,
  resource: PropTypes.object,
  resourceEndpoint: PropTypes.func,
};

const Checklist = ({ onToggle, resource, resourceEndpoint }) => {
  const itemDefinitions = useChecklistItemDefinitions();
  const queryClient = useQueryClient();
  const ky = useOkapiKy();
  const [namespace] = useNamespace();

  const [selectedNotesItem, setSelectedNotesItem] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);

  useEffect(() => {
    // Assign each item the name of 'definition'
    const itemList = itemDefinitions.map((definition) => ({ definition }));
    const output = [];
    // Check each item that is already stored alongside the publication request to see if the defintion already exists
    itemList.forEach((item) => {
      const relevantItem = resource.checklist.find(
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
      differenceWith(checklistItems, output, isEqual)?.length === 0 &&
      !isEqual(checklistItems, output)
    ) {
      setChecklistItems(output);
    }
  }, [resource, itemDefinitions, checklistItems]);

  const { mutateAsync: putChecklist } = useMutation(
    ['Checklist', 'putChecklist'],
    (data) => {
      ky.put(resourceEndpoint(resource.id), { json: data }).then(() => {
        queryClient.invalidateQueries([
          namespace,
          'data',
          'view',
          resource?.id,
        ]);
      });
    }
  );

  const handleSubmit = async (values, item) => {
    const submitValues = { checklist: [{ ...item, ...values }] };
    await putChecklist(submitValues);
  };

  const requiredItems = checklistItems.filter(
    (e) => e?.status?.value !== 'not_required'
  );

  const notRequiredItems = checklistItems.filter(
    (e) => e?.status?.value === 'not_required'
  );

  const renderBadge = () => {
    return <Badge>{notRequiredItems?.length}</Badge>;
  };

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
      {requiredItems.map((item) => {
        return (
          <ChecklistItem
            handleSubmit={handleSubmit}
            item={item}
            resource={resource}
            setSelectedNotesItem={setSelectedNotesItem}
          />
        );
      })}
      {notRequiredItems?.length > 0 && (
        <Accordion
          closedByDefault
          displayWhenClosed={renderBadge()}
          displayWhenOpen={renderBadge()}
          header={NotRequiredHeader}
          label={<FormattedMessage id="ui-oa.checklist.hidden" />}
          separator={false}
        >
          {notRequiredItems.map((item) => {
            return (
              <ChecklistItem
                handleSubmit={handleSubmit}
                item={item}
                resource={resource}
                setSelectedNotesItem={setSelectedNotesItem}
              />
            );
          })}
        </Accordion>
      )}
      <ChecklistNotesModal
        item={selectedNotesItem}
        ownerId={resource.id}
        resourceEndpoint={resourceEndpoint}
        setSelectedNotesItem={setSelectedNotesItem}
      />
    </Pane>
  );
};

Checklist.propTypes = propTypes;

export default Checklist;
