import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Badge, Pane } from '@folio/stripes/components';
import { useMutation, useQueryClient } from 'react-query';
import { AppIcon, useNamespace, useOkapiKy } from '@folio/stripes-core';
import { FormattedMessage } from 'react-intl';
import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith';
import ChecklistItem from './ChecklistItem';
import ChecklistNotesModal from './ChecklistNotesModal';
import useChecklistItemDefinitions from '../../hooks/useChecklistItemDefinitions';

const propTypes = {
  onToggle: PropTypes.func,
  resource: PropTypes.object,
  resourceEndpoint: PropTypes.func,
};

const Checklist = ({ onToggle, resource, resourceEndpoint }) => {
  const itemDefinitions = useChecklistItemDefinitions();
  const [namespace] = useNamespace();
  const queryClient = useQueryClient();
  const ky = useOkapiKy();

  const [selectedNotesItem, setSelectedNotesItem] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);

  useEffect(() => {
    const itemList = itemDefinitions.map((definition) => ({ definition }));
    const output = [];
    itemList.forEach((item) => {
      const relevantItem = resource.checklist.find(
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
      paneTitle={<FormattedMessage id="ui-oa.checklist" />}
    >
      {requiredItems.map((item) => {
        return (
          <ChecklistItem
            handleSubmit={handleSubmit}
            item={item}
            setSelectedNotesItem={setSelectedNotesItem}
          />
        );
      })}
      {notRequiredItems?.length > 0 && (
        <Accordion
          displayWhenClosed={renderBadge()}
          displayWhenOpen={renderBadge()}
          label={<FormattedMessage id="ui-oa.checklist.hidden" />}
          separator={false}
        >
          {notRequiredItems.map((item) => {
            return (
              <ChecklistItem
                handleSubmit={handleSubmit}
                item={item}
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
